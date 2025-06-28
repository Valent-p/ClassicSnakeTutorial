
# Step 2: Drawing on the Canvas

Now that we have our HTML structure, it's time to learn how to draw on the `<canvas>` element using JavaScript. The canvas provides a "2D rendering context" which is an object with methods for drawing shapes, text, and images.

## Getting Started (`script.js`)

First, we need to get a reference to our canvas and its 2D context in our JavaScript file. We also define some constants that will be useful throughout our code.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // --- Game Constants ---
    const GRID_SIZE = 20; // The size of each square in our game grid
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;

    // ... game state will go here ...
});
```
**Key points:**
- We wrap our code in a `DOMContentLoaded` event listener. This is good practice and ensures our code only runs after the entire HTML document has been loaded.
- `canvas.getContext('2d')` is the crucial line. It gives us the `ctx` object, which is our tool for drawing.
- `GRID_SIZE` defines the size of our snake segments and food. A 400x400 canvas with a 20px grid size gives us a 20x20 grid to play on.

## Representing the Snake

Our snake is a series of connected squares. The easiest way to represent this in code is with an array of objects, where each object has an `x` and `y` coordinate.

```javascript
// --- Game State ---
let snake = [
    { x: 10 * GRID_SIZE, y: 10 * GRID_SIZE }, // Head (in the middle of the board)
    { x: 9 * GRID_SIZE, y: 10 * GRID_SIZE },
    { x: 8 * GRID_SIZE, y: 10 * GRID_SIZE }
];
```

## The Drawing Function

Let's create a function that can draw a single segment of the snake. We can then loop through our `snake` array and call this function for each segment.

```javascript
/**
 * Renders the snake on the canvas.
 */
function drawSnake() {
    snake.forEach((segment, index) => {
        // Give the head a different color to distinguish it
        ctx.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
        // Draw a filled rectangle for the segment
        ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
        
        // Add a border to each segment to make them distinct
        ctx.strokeStyle = '#111';
        ctx.strokeRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
    });
}

// Call the function to see the result!
drawSnake();
```
If you add this code to `script.js` and refresh `index.html`, you should now see the initial three-segment snake drawn on the canvas!

**Next Step:** [Step 3: Making the Snake Move](./step3-movement.md)
