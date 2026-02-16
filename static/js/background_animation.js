document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('background-container');
    const imagePath = container.getAttribute('data-image-path');
    const numberOfImages = 8; // Keep count as requested

    // Grid Configuration for Even Distribution
    const cols = 4;
    const rows = 2;
    const colSize = 100 / cols; // Width of each cell in %
    const rowSize = 100 / rows; // Height of each cell in %

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (container.children.length >= numberOfImages) break;

            const img = document.createElement('img');
            img.src = imagePath;
            img.classList.add('scattered-cube');

            // Random Size between 80px and 150px (slightly smaller variance for consistency)
            const size = Math.random() * (150 - 80) + 80;

            // Calculate Grid Cell Bounds
            const minX = c * colSize;
            const maxX = (c + 1) * colSize;
            const minY = r * rowSize;
            const maxY = (r + 1) * rowSize;

            // Random Position WITHIN the cell (with padding to avoid edge clipping)
            // Padding of 5% inside the cell
            const padding = 5;
            const availWidth = colSize - padding * 2;
            const availHeight = rowSize - padding * 2;

            const x = minX + padding + (Math.random() * availWidth);
            const y = minY + padding + (Math.random() * availHeight);

            img.style.left = `${x}%`;
            img.style.top = `${y}%`;
            img.style.width = `${size}px`;

            // Random Rotation
            const rotation = Math.random() * 360;
            img.style.transform = `rotate(${rotation}deg)`;

            // Random Animation Delay
            const delay = Math.random() * 5;
            img.style.animationDelay = `${delay}s`;

            container.appendChild(img);
        }
    }

    // Global Spotlight Mouse Tracking
    const spotlight = document.getElementById('global-spotlight');
    if (spotlight) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            spotlight.style.setProperty('--mouse-x', `${x}%`);
            spotlight.style.setProperty('--mouse-y', `${y}%`);
        });
    }
});
