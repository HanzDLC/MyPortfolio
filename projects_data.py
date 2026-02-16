
def get_projects():
    return [
        {
            "category": "n8n Workflow Automation",
            "icon_svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>""",
            "projects": [
                {
                    "id": "n8n-modal-1",
                    "category_id": "n8n-base44",
                    "title": "Chat Trigger → AI Agent to Base44",
                    "card_description": "End-to-end automation leveraging n8n, DeepSeek AI, and Base44 API to streamline bug reporting from chat interfaces directly to internal systems.",
                    "modal_description": "An end-to-end n8n automation where a chat trigger initiates an AI agent that processes prompts and pushes structured data directly into a Base44 chatbox application.",
                    "tags": ["n8n", "DeepSeek", "API Integration", "Automation"],
                    "image": "images/Automation/Chat Prompt to Base 44 Workflow.png",
                    "has_modal": True,
                    "gallery": [
                        {"path": "images/Automation/Chat Prompt to Base 44 Workflow.png", "alt": "Chat Prompt to Base 44 Workflow"},
                        {"path": "images/Automation/AI Agent Output.png", "alt": "AI Agent Output"},
                        {"path": "images/Automation/Posted Prompt from AI Agent to Base44.png", "alt": "Posted Prompt from AI Agent to Base44"}
                    ],
                    "problem": """<p>As QA testers performing manual testing, our workflow involved multiple manual handoffs that created bottlenecks. After identifying bugs during testing, we would:</p><ul><li>Write an issue description</li><li>Use a custom GPT in ChatGPT to get a formatted output</li><li>Send the formatted output via Messenger to our supervisor</li><li>Wait for the supervisor to manually post it to Base44</li></ul><p>This multi-step process delayed system changes after bug reporting and created unnecessary dependencies on supervisor availability.</p>""",
                    "tools": ["n8n Workflow Automation", "DeepSeek v3.2 AI Model", "OpenRouter API", "Base44 Internal API", "Chat Trigger", "HTTP Requests", "Session Management"],
                    "workflow": [
                        {"number": 1, "text": "QA tester submits bug description via chat trigger interface"},
                        {"number": 2, "text": "AI Agent (DeepSeek v3.2) processes the raw input using custom prompt engineering to format the bug report into structured developer-ready documentation"},
                        {"number": 3, "text": "System extracts formatted output and prepares Base44 session identifiers"},
                        {"number": 4, "text": "Validates Google authentication session with Base44 API to ensure access is still active"},
                        {"number": 5, "text": "If session is valid, builds HTTP payload with formatted message content"},
                        {"number": 6, "text": "Posts formatted bug report directly to Base44 chatbox, bypassing the manual Messenger handoff"}
                    ],
                    "features_title": "Error Handling",
                    "features": [
                        {"title": "Google Session Validation", "text": "Checks authentication status before attempting to post to Base44 to prevent failed submissions"},
                        {"title": "Conditional Logic Flow", "text": "IF node ensures workflow only proceeds when session validation returns a valid user identity"},
                        {"title": "Payload Construction Safeguards", "text": "Code node builds structured JSON payload with proper headers and authentication tokens before API call"},
                        {"title": "Fallback Message Extraction", "text": "Multiple fallback paths in code to extract AI output from different possible response structures"}
                    ],
                    "impact": [
                        {"value": "--", "label": "Time Saved", "icon_type": "time"},
                        {"value": "--", "label": "Efficiency Gain", "icon_type": "trend"},
                        {"value": "--", "label": "Response Time", "icon_type": "lightning"}
                    ]
                },
                {
                    "id": "n8n-modal-2",
                    "category_id": "n8n-gsheets",
                    "title": "Custom GPT → AI Agent to Google Sheets",
                    "card_description": "Integration of Custom GPT and n8n to parse unstructured text and automatically populate Google Sheets with structured QA data.",
                    "modal_description": "A custom GPT routes formatted QA bug reports through an n8n AI agent, which parses and appends structured rows directly into Google Sheets for streamlined bug tracking.",
                    "tags": ["n8n", "DeepSeek", "Google Sheets API", "Webhooks"],
                    "image": "images/Automation/GPT to Google Sheets Automation.png",
                    "has_modal": True,
                    "gallery": [
                        {"path": "images/Automation/GPT to Google Sheets Automation.png", "alt": "GPT to Google Sheets Automation Workflow"},
                        {"path": "images/Automation/ngrok.png", "alt": "ngrok Tunnel Configuration"},
                        {"path": "images/Automation/Test Entries for Google Sheets.png", "alt": "Test Entries for Google Sheets"}
                    ],
                    "problem": """<p>As QA testers for a Management Information System (MIS), we needed to log bug reports and issues into structured Excel sheets with specific formatting requirements. Our manual workflow involved:</p><ul><li>Identifying bugs during QA testing</li><li>Writing issue descriptions</li><li>Sending each prompt to ChatGPT to format according to our Excel template</li><li>Copying the ChatGPT output</li><li>Manually pasting formatted data into Excel/Google Sheets</li></ul><p>This repetitive manual process was time-consuming and created bottlenecks in our bug reporting workflow, delaying issue tracking and resolution.</p>""",
                    "tools": ["n8n Workflow Automation", "Custom GPT (ChatGPT)", "DeepSeek v3.2 AI Model", "Google Sheets API", "OpenRouter API", "JSON Data Processing", "OAuth 2.0 Authentication"],
                    "workflow": [
                        {"number": 1, "text": "QA tester submits raw bug description to Custom GPT via ChatGPT interface"},
                        {"number": 2, "text": "Custom GPT formats the bug report according to predefined Excel/Google Sheets template structure"},
                        {"number": 3, "text": "Formatted JSON output is sent via POST request to an <strong>ngrok</strong> tunnel, securely exposing the local n8n AI agent webhook to the internet"},
                        {"number": 4, "text": "n8n AI Agent (DeepSeek v3.2) validates and structures the data into individual fields (Issue ID, Description, Severity, Status, etc.)"},
                        {"number": 5, "text": "Structured data is mapped to Google Sheets columns and authenticated via OAuth 2.0"},
                        {"number": 6, "text": "Data is appended as a new row to the MIS bug tracking Google Sheet, eliminating manual copy-paste"}
                    ],
                    "features_title": "Error Handling",
                    "features": [
                        {"title": "Schema Validation", "text": "AI Agent verifies all required fields are present before attempting Google Sheets insertion"},
                        {"title": "OAuth Token Refresh", "text": "Automatic token renewal for Google Sheets API to prevent authentication failures"},
                        {"title": "Data Type Enforcement", "text": "Ensures numeric fields, dates, and categorical values match Google Sheets column formats"},
                        {"title": "Retry Logic", "text": "Automatically retries failed Google Sheets API calls with exponential backoff for rate limiting"}
                    ],
                    "impact": [
                        {"value": "--", "label": "Time Saved Per Report", "icon_type": "time"},
                        {"value": "--", "label": "Accuracy Improvement", "icon_type": "trend"},
                        {"value": "--", "label": "Reports Processed", "icon_type": "check"}
                    ]
                }
            ]
        },
        {
            "category": "Data Visualization",
            "icon_svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>""",
            "projects": [
                {
                    "id": "dv-modal-proj",
                    "category_id": "data-viz-proj",
                    "title": "Client Thesis Data Visualization",
                    "card_description": "Commissioned biological research visualization project involving rigorous statistical analysis and data visualization for NH3 and NO2 concentrations using Python.",
                    "modal_description": "Commissioned for a thesis utilizing empirical data, this project entailed rigorous statistical analysis and data visualization to interpret the results of a complex biological experiment.",
                    "tags": ["Python", "Matplotlib", "Seaborn"],
                    "image": "images/Visualization Images/NH3 Media.png",
                    "has_modal": True,
                    "gallery": [
                        {"path": "images/Visualization Images/NH3 Media.png", "alt": "NH3 Media Analysis"},
                        {"path": "images/Visualization Images/NH3 Shrimp.png", "alt": "NH3 Shrimp Analysis"},
                        {"path": "images/Visualization Images/NH3 WW.png", "alt": "NH3 WW Analysis"},
                        {"path": "images/Visualization Images/NH3 in Vitro.png", "alt": "NH3 in Vitro Analysis"},
                        {"path": "images/Visualization Images/NO2 Media.png", "alt": "NO2 Media Analysis"},
                        {"path": "images/Visualization Images/NO2 Shrimp.png", "alt": "NO2 Shrimp Analysis"},
                        {"path": "images/Visualization Images/NO2 WW.png", "alt": "NO2 WW Analysis"},
                        {"path": "images/Visualization Images/NO2 in Vitro.png", "alt": "NO2 in Vitro Analysis"}
                    ],
                    "problem": """<p>The client was manually analyzing complex biological data for her thesis, causing significant delays and potential for error. The challenge was to automate the statistical analysis of numerous Excel files, determining the appropriate tests (parametric vs. non-parametric) and generating publication-ready visualizations.</p>""",
                    "tools": ["Python", "Matplotlib", "Seaborn", "Pandas", "NumPy", "Statistical Analysis", "Prompt Engineering"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Data Pre-processing:</strong> Automated the ingestion of Excel files, first identifying whether the dataset required parametric or non-parametric analysis based on distribution characteristics."},
                        {"number": 2, "text": "<strong>Custom Statistical Function:</strong> Determined that ART (Aligned Rank Transform) ANOVA was the optimal statistical test. Since no direct Python implementation existed, I utilized <strong>Prompt Engineering</strong> to generate a custom ART ANOVA function via an LLM."},
                        {"number": 3, "text": "<strong>Automated Analysis & Output:</strong> The script executed the ART ANOVA and post-hoc analysis for each file, automatically generating comprehensive results tables and corresponding visualizations."}
                    ],
                    "features_title": "Analysis Methods",
                    "features": [
                        {"title": "Assumption Testing", "text": "Automated Shapiro-Wilk and Levene's tests to determine if data met parametric assumptions, dynamically selecting the appropriate statistical method."},
                        {"title": "ART ANOVA Application", "text": "Applied Aligned Rank Transform (ART) ANOVA for non-parametric factorial analysis, enabling robust interaction effect assessment on skewed biological data."},
                        {"title": "Post-hoc Analysis & Viz", "text": "Generated pairwise comparison tables (Tukey's HSD / Games-Howell) and automated the creation of publication-ready boxplots and interaction plots."}
                    ],
                    "impact": [
                        {"value": "50+", "label": "Charts Created", "icon_type": "image"},
                        {"value": "15k+", "label": "Data Points Analyzed", "icon_type": "trend"},
                        {"value": "100%", "label": "Client Satisfaction", "icon_type": "check"}
                    ]
                }
            ]
        },
        {
            "category": "Machine Learning",
            "icon_svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>""",
            "projects": [
                {
                    "id": "proj-matrix-match",
                    "title": "MatrixMatch",
                    "card_description": "A machine learning project that compares software system features and creates detailed comparison matrices based on user input.",
                    "tags": ["Python", "Machine Learning", "Flask"],
                    "image": None,
                    "placeholder_icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v10h14V7H5zm2 2h2v2H7V9zm0 4h2v2H7v-2zm4-4h6v2h-6V9zm0 4h6v2h-6v-2z" /></svg>""",
                    "has_modal": False,
                    "link": "https://github.com/HanzDLC"
                },
                {
                    "id": "ml-reddit",
                    "title": "Reddit Scraping (PRAW)",
                    "card_description": "Automated data collection from Reddit using the PRAW API to gather community insights and sentiment data.",
                    "tags": ["Python", "PRAW", "Data Scraping"],
                    "image": "images/Machine Learning/Reddit PRAW.png",
                    "placeholder_icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>""",
                    "has_modal": True,
                    "modal_description": "Automated data collection from Reddit using the PRAW API to gather community insights and sentiment data.",
                    "notebook_link": "https://colab.research.google.com/drive/1yZxknpAbuI1djAGUyNtsXpZd2tLAHxbn?usp=sharing",
                    "problem": """<p>Gathering large-scale community sentiment data manually is time-consuming and inefficient. This project automates the extraction of Reddit data to analyze public opinion and trends effectively.</p>""",
                    "tools": ["Python", "PRAW", "Pandas", "Matplotlib", "Seaborn"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Data Extraction:</strong> Utilized PRAW to scrape subreddit posts and comments based on keywords and timeframes."},
                        {"number": 2, "text": "<strong>Data Cleaning:</strong> Processed raw text data to remove noise, handle missing values, and standardize formats."},
                        {"number": 3, "text": "<strong>Sentiment Analysis:</strong> Applied NLP techniques to classify sentiment and visualize community trends."}
                    ],
                    "features_title": "Key Features",
                    "features": [
                        {"title": "Automated Scraping", "text": "<strong>PRAW API</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Efficiently handles API rate limits and pagination.</span>"},
                        {"title": "Data Visualization", "text": "<strong>Matplotlib/Seaborn</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Generates insightful charts to represent sentiment distribution.</span>"}
                    ],
                    "gallery": []
                },
                {
                    "id": "ml-eval",
                    "title": "ML Model Evaluation",
                    "card_description": "Comprehensive analysis and evaluation of machine learning models to determine optimal algorithms for specific datasets.",
                    "tags": ["Python", "Scikit-learn", "Model Analysis"],
                    "image": "images/Machine Learning/ML Model Evaluation.png",
                    "placeholder_icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>""",
                    "has_modal": True,
                    "modal_description": "Comprehensive analysis and evaluation of machine learning models to determine optimal algorithms for specific datasets.",
                    "notebook_link": "https://colab.research.google.com/drive/1SAKjZ0P1YuQ7oliU7AXvKfwwF5pw1zmZ?usp=sharing",
                    "problem": """<p>Choosing the right machine learning model for a specific dataset is challenging. This project provides a framework for evaluating multiple models to identify the best performer based on accuracy and other metrics.</p>""",
                    "tools": ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Data Preprocessing:</strong> Handled missing data, encoded categorical variables, and scaled features for optimal model performance."},
                        {"number": 2, "text": "<strong>Model Training:</strong> Trained various algorithms including Logistic Regression, Decision Trees, and Random Forests."},
                        {"number": 3, "text": "<strong>Evaluation:</strong> Compared models using metrics like Accuracy, Precision, Recall, and F1-Score."}
                    ],
                    "features_title": "Key Features",
                    "features": [
                        {"title": "Comparative Analysis", "text": "<strong>Model Selection</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Systematic comparison of multiple algorithms.</span>"},
                        {"title": "Performance Metrics", "text": "<strong>Scikit-learn Metrics</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Detailed classification reports and confusion matrices.</span>"}
                    ],
                    "gallery": []
                },
                {
                    "id": "ml-segment",
                    "title": "Customer Segmentation",
                    "card_description": "Unsupervised learning project using K-Means clustering to identify distinct customer segments based on behavioral data.",
                    "tags": ["Python", "K-Means", "Clustering"],
                    "image": "images/Machine Learning/KNN Clustering.png",
                    "placeholder_icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>""",
                    "has_modal": True,
                    "modal_description": "Unsupervised learning project using K-Means clustering to identify distinct customer segments based on behavioral data.",
                    "notebook_link": "https://colab.research.google.com/drive/1QwFY_uxqNcCzrk34NncbaI488VwBy9nt?usp=sharing",
                    "problem": """<p>Understanding customer behavior is crucial for targeted marketing. This project uses unsupervised learning to group customers into distinct segments based on their purchasing habits.</p>""",
                    "tools": ["Python", "Scikit-learn", "K-Means", "Pandas", "Seaborn"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Feature Engineering:</strong> Selected relevant features such as Annual Income and Spending Score."},
                        {"number": 2, "text": "<strong>Optimal Clusters:</strong> Used the Elbow Method to determine the optimal number of clusters (K)."},
                        {"number": 3, "text": "<strong>Clustering:</strong> Applied K-Means algorithm to segment customers and visualized the results."}
                    ],
                    "features_title": "Key Features",
                    "features": [
                        {"title": "Unsupervised Learning", "text": "<strong>K-Means Clustering</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Identifies natural groupings in unlabelled data.</span>"},
                        {"title": "Elbow Method", "text": "<strong>Optimization</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Data-driven approach to select the best K value.</span>"}
                    ],
                    "gallery": []
                }
            ]
        },
        {
            "category": "Google Sheets Mastery",
            "icon_svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>""",
            "projects": [
                {
                    "id": "gsheets-modal",
                    "category_id": "gsheets-mastery",
                    "title": "VLOOKUP and QUERY",
                    "card_description": "Advanced Google Sheets system leveraging VLOOKUP, QUERY functions, and complex formulas for efficient data management, analysis, and automated reporting workflows.",
                    "modal_description": "Comprehensive data management and analytics system leveraging advanced Google Sheets functions, Apps Script automation, and custom formulas for real-time business intelligence and reporting.",
                    "tags": ["Google Sheets", "Apps Script", "Data Analysis", "Automation"],
                    "image": "images/Spreadsheet/LookUp.png",
                    "has_modal": True,
                    "gallery": [
                        {"path": "images/Spreadsheet/Query.png", "alt": "VLOOKUP and QUERY Dashboard"},
                        {"path": "images/Spreadsheet/LookUp.png", "alt": "VLOOKUP Lookup View"}
                    ],
                    "problem": """<p>Managing large datasets of student records manually was inefficient and prone to errors. The challenge was to create a dynamic system that allows for instant retrieval of individual student details by ID and automated generation of filtered class lists without manual copy-pasting.</p>""",
                    "tools": ["Google Sheets", "Apps Script (JavaScript)", "Google Workspace API", "Advanced Formulas", "Pivot Tables", "Conditional Formatting", "Data Validation"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Dynamic Lookup System:</strong> Implemented <code>VLOOKUP</code> with absolute references to search a master <code>studentList</code> named range, instantly returning specific details (Result, Degree) based on a unique Student ID input."},
                        {"number": 2, "text": "<strong>Automated Reporting:</strong> Utilized the <code>QUERY</code> function to extract specific columns (Name, Postcode, Result, Degree) from the master dataset, creating auto-updating class performance lists."},
                        {"number": 3, "text": "<strong>Data Structuring:</strong> Established Named Ranges for scalable data management, ensuring formulas remain robust even as new student records are added to the database."}
                    ],
                    "features_title": "Key Functions & Formulas",
                    "features": [
                        {"title": "VLOOKUP Formula", "text": "<code>=VLOOKUP($B$2,studentList,12,FALSE)</code><br><span style='font-size: 0.85em; opacity: 0.8;'>Retrieves specific record details based on unique ID lookup.</span>"},
                        {"title": "QUERY Formula", "text": "<code>=QUERY(studentList,\"select B,C,G,L,M\",1)</code><br><span style='font-size: 0.85em; opacity: 0.8;'>Dynamically selects and displays specific columns for reporting.</span>"},
                        {"title": "Named Ranges", "text": "<strong>Named Ranges</strong><br><span style='font-size: 0.85em; opacity: 0.8;'>Utilized 'studentList' range for cleaner, more maintainable formulas.</span>"}
                    ],
                    "sheet_link": "https://docs.google.com/spreadsheets/d/1nHLe3EgyBqxjKtO1FdYFaQbFSzSxvnpsF4z1tDfYr_w/edit?usp=sharing"
                },
                {
                    "id": "excel-modal-2",
                    "category_id": "excel-mastery-2",
                    "title": "QA Bug Logs Structure",
                    "card_description": "Structured Excel-based QA bug tracking system with automated logging, categorization, and reporting features for efficient issue management and quality assurance workflows.",
                    "modal_description": "Advanced Excel-based data analytics and reporting system featuring complex formulas, VBA macros, Power Query automation, and dynamic dashboards for comprehensive business metrics tracking and visualization.",
                    "tags": ["Microsoft Excel", "VBA", "Power Query", "Pivot Tables"],
                    "image": "images/Spreadsheet/QA Log Structure.png",
                    "has_modal": True,
                    "gallery": [
                        {"path": "images/Spreadsheet/QA Log Structure.png", "alt": "QA Bug Logs Structure"}
                    ],
                    "problem": """<p><em>[Placeholder: Describe the business challenge or data management problem this Excel system solves]</em></p>""",
                    "tools": ["Google Sheets", "Pivot Tables & Charts", "Advanced Formulas", "Data Validation", "Conditional Formatting"],
                    "workflow": [
                        {"number": 1, "text": "<strong>Dynamic Lookup System:</strong> Implemented <code>VLOOKUP</code> with absolute references to search a master <code>studentList</code> named range, instantly returning specific details (Result, Degree) based on a unique Student ID input."},
                        {"number": 2, "text": "<strong>Automated Reporting:</strong> Utilized the <code>QUERY</code> function to extract specific columns (Name, Postcode, Result, Degree) from the master dataset, creating auto-updating class performance lists."},
                        {"number": 3, "text": "<strong>Data Structuring:</strong> Established Named Ranges for scalable data management, ensuring formulas remain robust even as new student records are added to the database."}
                    ],
                    "features_title": "Features & Implementation",
                    "features": [],
                    "sheet_link": "https://docs.google.com/spreadsheets/d/1dzfcWt7wnZmojssD76lOyCIr3W2dlEuwhAfNmpGFTRk/edit?usp=sharing"
                }
            ]
        },
        {
            "category": "Other Projects",
            "icon_svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>""",
            "projects": [
                # Matrix Match moved to Machine Learning

                {
                    "id": "proj-portfolio",
                    "title": "Portfolio Website",
                    "card_description": "This responsive Flask-based portfolio website featuring modern design, smooth animations, and horizontal scroll certifications.",
                    "tags": ["Flask", "CSS", "JavaScript"],
                    "image": None,
                    "placeholder_icon": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>""",
                    "has_modal": False,
                    "link": "https://github.com/HanzDLC"
                }
            ]
        }
    ]
