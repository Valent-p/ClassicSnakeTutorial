
# Step 3: Making the Snake Move

A static snake isn't much of a game. To create movement, we need two key concepts: a **game loop** and a way to **update the snake's position**.

## The Game Loop

A game loop is a function that runs repeatedly, typically many times per second. In each "tick" of the loop, the game updates its state (like moving the snake) and redraws the screen. We can create a simple loop using `setInterval`.

```javascript
// --- Game State ---
let direction = 'RIGHT';
let gameInterval; // To hold our setInterval reference

/**
 * The main game loop, responsible for updating and drawing the game.
 */
function gameLoop() {
    moveSnake();
    drawEverything(); // We'll create this next
}

// To start the game:
gameInterval = setInterval(gameLoop, 100); // Run gameLoop every 100ms
```

The `drawEverything` function simply clears the canvas and then calls our individual drawing functions. This prevents the "smearing" effect of drawing over old frames.

```javascript
/**
 * Clears the canvas and redraws all game elements.
 */
function drawEverything() {
    // Clear the entire canvas
    ctx.fillStyle = '#111'; // Match the canvas background color
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawSnake();
    // drawFood() will be called here later
}
```

## Movement Logic

How do we move the snake? It's like a caterpillar. We add a new head in the direction of movement and remove the last segment of the tail.

1.  Create a new head object based on the current head's position and the `direction`.
2.  Add this new head to the *beginning* of the `snake` array using `unshift()`.
3.  Remove the last element from the `snake` array using `pop()`.

```javascript
/**
 * Updates the snake's position based on the current direction.
 */
function moveSnake() {
    // Create a new head by copying the current head's position
    const head = { x: snake[0].x, y: snake[0].y };

    // Update the new head's coordinates based on the direction
    switch (direction) {
        case 'UP':
            head.y -= GRID_SIZE;
            break;
        case 'DOWN':
            head.y += GRID_SIZE;
            break;
        case 'LEFT':
            head.x -= GRID_SIZE;
            break;
        case 'RIGHT':
            head.x += GRID_SIZE;
            break;
    }

    // Add the new head to the front of the snake array
    snake.unshift(head);

    // Remove the tail segment
    snake.pop();
}
```
With these pieces in place, your snake will now glide across the screen to the right! It will move off the canvas because we haven't added collision detection yet, but we have motion.

**Next Step:** [Step 4: Adding Player Controls](./step4-controls.md)
