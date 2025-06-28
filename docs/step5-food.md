
# Step 5: Adding Food

A snake needs something to eat! Let's add food to our game. The food will be a single square that appears at a random location on the board.

## Representing and Drawing Food

Just like a snake segment, the food can be an object with `x` and `y` coordinates.

```javascript
// Add to your game state variables
let food;

/**
 * Renders the food on the canvas.
 */
function drawFood() {
    ctx.fillStyle = '#e74c3c'; // A nice red color
    ctx.strokeStyle = '#c0392b'; // A darker red for the border
    ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
    ctx.strokeRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
}

// Don't forget to call this function inside drawEverything()
function drawEverything() {
    // ... clear canvas ...
    drawSnake();
    drawFood(); // Add this line
}
```

## Generating Food at a Random Position

We need a function that places the food randomly on our game grid. The key is to generate an `x` and `y` position that aligns with our grid. We can do this using `Math.random()`.

We also need to make sure the food doesn't accidentally spawn *on top of* the snake.

```javascript
/**
 * Generates a new piece of food at a random location on the grid.
 * Ensures the food does not spawn on top of the snake.
 */
function generateFood() {
    let foodX, foodY;
    while (true) {
        // Generate a random x and y coordinate on the grid
        foodX = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE;
        foodY = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE;
        
        // Check if the generated location is on any part of the snake
        let onSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
        
        // If it's not on the snake, we've found a valid location
        if (!onSnake) {
            break;
        }
    }
    food = { x: foodX, y: foodY };
}
```
**Explanation:**
- `Math.random()` gives a number between 0 and 1. We multiply it by the number of grid spots (`CANVAS_WIDTH / GRID_SIZE`) and use `Math.floor` to get a random grid index (e.g., 0, 1, 2...).
- We then multiply by `GRID_SIZE` to convert the grid index back to canvas coordinates.
- The `while(true)` loop with the `onSnake` check is important. It keeps generating new coordinates until it finds one that is not occupied by the snake.
- `Array.prototype.some()` is a handy method that checks if at least one element in an array passes a test.

Finally, call `generateFood()` once at the beginning of your game (e.g., in a `setupGame` function or just before starting the loop) to place the first piece of food.

**Next Step:** [Step 6: Growing the Snake](./step6-growing.md)
