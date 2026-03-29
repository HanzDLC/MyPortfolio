"""
Vector Database Setup with Qdrant
Stores portfolio knowledge base for efficient retrieval without heavy token usage
"""

import os
import json
from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer

class PortfolioVectorDB:
    def __init__(self, collection_name="portfolio_kb", model_name="all-MiniLM-L6-v2"):
        """
        Initialize Qdrant client and embedding model

        Args:
            collection_name: Name of the Qdrant collection
            model_name: Sentence transformer model for embeddings
        """
        self.collection_name = collection_name
        self.vector_size = 384  # all-MiniLM-L6-v2 produces 384-dimensional vectors

        # Use in-memory Qdrant for development (no external server needed)
        self.client = QdrantClient(":memory:")
        self.model = SentenceTransformer(model_name)

        self._init_collection()

    def _init_collection(self):
        """Initialize Qdrant collection if it doesn't exist"""
        collections = self.client.get_collections().collections
        collection_names = [c.name for c in collections]

        if self.collection_name not in collection_names:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=self.vector_size,
                    distance=Distance.COSINE
                )
            )

    def add_knowledge_from_markdown(self, md_path):
        """
        Load and vectorize knowledge base from markdown file

        Args:
            md_path: Path to PORTFOLIO_KB.md file
        """
        if not os.path.exists(md_path):
            raise FileNotFoundError(f"Knowledge base file not found: {md_path}")

        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split by sections for better chunking
        sections = self._chunk_content(content)
        points = []

        for idx, section in enumerate(sections):
            embedding = self.model.encode(section)
            point = PointStruct(
                id=idx,
                vector=embedding.tolist(),
                payload={"text": section, "source": "PORTFOLIO_KB.md"}
            )
            points.append(point)

        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )

        print(f"[OK] Loaded {len(points)} knowledge chunks into vector database")

    def _chunk_content(self, content, chunk_size=500):
        """
        Split content into meaningful chunks

        Args:
            content: Full markdown content
            chunk_size: Approximate chunk size in characters
        """
        lines = content.split('\n')
        chunks = []
        current_chunk = []
        current_size = 0

        for line in lines:
            current_chunk.append(line)
            current_size += len(line)

            if current_size > chunk_size and (line.startswith('#') or line.startswith('- ')):
                chunks.append('\n'.join(current_chunk))
                current_chunk = []
                current_size = 0

        if current_chunk:
            chunks.append('\n'.join(current_chunk))

        return [c.strip() for c in chunks if c.strip()]

    def search(self, query, limit=3):
        """
        Search the knowledge base

        Args:
            query: Search query string
            limit: Number of results to return

        Returns:
            List of (text, score) tuples
        """
        query_embedding = self.model.encode(query)

        results = self.client.query_points(
            collection_name=self.collection_name,
            query=query_embedding.tolist(),
            limit=limit,
            with_payload=True
        ).points

        return [(r.payload["text"], r.score) for r in results]

    def get_context_for_query(self, query, limit=3):
        """
        Get context string for a query (ready to use in LLM prompts)

        Args:
            query: Search query
            limit: Number of relevant chunks to retrieve

        Returns:
            Formatted context string
        """
        results = self.search(query, limit)

        if not results:
            return "No relevant portfolio information found."

        context = "## Relevant Portfolio Information\n\n"
        for i, (text, score) in enumerate(results, 1):
            context += f"[Match {i} - Confidence: {score:.2f}]\n{text}\n\n"

        return context

# Global instance
_db_instance = None

def init_vector_db(portfolio_dir="."):
    """Initialize the global vector database instance"""
    global _db_instance
    if _db_instance is None:
        _db_instance = PortfolioVectorDB()
        kb_path = os.path.join(portfolio_dir, "PORTFOLIO_KB.md")
        _db_instance.add_knowledge_from_markdown(kb_path)
    return _db_instance

def get_vector_db():
    """Get the global vector database instance"""
    global _db_instance
    if _db_instance is None:
        raise RuntimeError("Vector DB not initialized. Call init_vector_db() first.")
    return _db_instance

if __name__ == "__main__":
    # Test the vector database
    import sys
    portfolio_dir = os.path.dirname(os.path.abspath(__file__))

    print("Initializing Vector Database...")
    db = init_vector_db(portfolio_dir)

    # Test queries
    test_queries = [
        "What experience do you have with web development?",
        "Tell me about your machine learning projects",
        "What automation tools do you use?",
        "Describe your CarBnb project"
    ]

    print("\n" + "="*60)
    print("VECTOR DB TEST QUERIES")
    print("="*60)

    for query in test_queries:
        print(f"\n[QUERY] {query}")
        print(f"{get_vector_db().get_context_for_query(query)}")
        print("-"*60)
