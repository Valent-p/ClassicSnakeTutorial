
# Step 7: Collision Detection (Game Over)

A game needs a challenge. For Snake, the game ends if the snake crashes into the walls or into its own body. We need to check for these conditions on every game tick.

Let's create a `checkCollision` function that will be called inside our `gameLoop`.

```javascript
// Add a gameOver flag to the game state
let gameOver = false;

/**
 * Checks for game-ending collisions (walls or self).
 */
function checkCollision() {
    const head = snake[0];

    // 1. Wall Collision
    // Check if the head has gone outside the canvas boundaries
    const hitLeftWall = head.x < 0;
    const hitRightWall = head.x >= CANVAS_WIDTH;
    const hitTopWall = head.y < 0;
    const hitBottomWall = head.y >= CANVAS_HEIGHT;

    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
        gameOver = true;
        return; // No need to check for self-collision if we hit a wall
    }

    // 2. Self Collision
    // Check if the head's position matches any other segment in its body
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            return;
        }
    }
}
```
**Explanation:**
- **Wall Collision:** We check if the head's `x` or `y` coordinates are less than 0 or greater than or equal to the canvas dimensions.
- **Self Collision:** We loop through the snake's body, starting from the *second* segment (`i = 1`). We don't check the head against itself (`i = 0`). If the head's coordinates match any other segment's coordinates, it's a game over.

## Updating the Game Loop

Now, we need to call this function and handle the `gameOver` state in our `gameLoop`.

```javascript
function gameLoop() {
    if (gameOver) {
        // If the game is over, stop the loop
        clearInterval(gameInterval);
        // We can also show a "Game Over" message here
        console.log("GAME OVER"); 
        return;
    }

    changingDirection = false;
    moveSnake();
    checkCollision(); // Call the new function here
    drawEverything();
}
```

Now, if you run the game and hit a wall or run into the snake's tail, the game will stop, and you'll see "GAME OVER" in your browser's developer console.

**Next Step:** [Step 8: Scoring and UI](./step8-scoring.md)
