
# Step 1: Setting Up the HTML and CSS

Before we write any game logic, we need to create the basic structure and style for our game page.

## The HTML (`index.html`)

The HTML file provides the skeleton of our application. It needs three key things:

1.  A `<canvas>` element: This is a special HTML tag that we can draw graphics onto using JavaScript. This will be our game board.
2.  UI Elements: We need places to display the score and a button to start the game.
3.  Links to our CSS and JavaScript files.

Here's the basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pure JS Snake Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Classic Snake</h1>
        <p>Tutorial by Valentino.</p> <!-- A small byline for the tutorial creator -->
        <div class="game-header">
            <span>Score: <span id="score">0</span></span>
        </div>
        <div class="canvas-container">
            <canvas id="gameCanvas" width="400" height="400"></canvas>
            <div id="gameOverScreen" class="game-overlay">
                <!-- Game over content will go here -->
            </div>
        </div>
        <button id="startBtn">Start Game</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```
**Key points:**
- The `<canvas>` has an `id` of `gameCanvas` so we can easily select it in JavaScript.
- We've given `id`s to the score span and button as well.
- The `<script>` tag is placed at the end of the `<body>` to ensure the HTML elements are loaded before the script tries to access them.

## The CSS (`style.css`)

The CSS file makes our game look presentable. We'll use it to center the game on the page and give the canvas a border and background.

```css
body {
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #333;
    color: #eee;
}

.container {
    text-align: center;
}

canvas {
    background-color: #111;
    border: 2px solid #888;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
}
```
**Key points:**
- We use flexbox on the `body` to easily center the main `container`.
- The `canvas` gets a dark background and a border to make it look like a distinct game area.

With this setup, we have a static webpage ready for us to bring to life with JavaScript.

**Next Step:** [Step 2: Drawing on the Canvas](./step2-drawing.md)