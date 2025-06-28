
# Step 6: Growing the Snake

When the snake eats the food, two things should happen:
1.  The snake gets longer.
2.  A new piece of food appears somewhere else.

We're already generating new food, so let's focus on making the snake grow.

## The Logic of Growth

Our current `moveSnake` function works by always adding a new head and always removing the tail (`snake.pop()`). This keeps the snake the same length.

To make the snake grow, we simply need to *not* remove the tail segment when food is eaten.

Let's modify the `moveSnake` function.

```javascript
/**
 * Updates the snake's position based on the current direction.
 */
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    // ... (switch statement for direction remains the same) ...
    switch (direction) {
        case 'UP': head.y -= GRID_SIZE; break;
        case 'DOWN': head.y += GRID_SIZE; break;
        case 'LEFT': head.x -= GRID_SIZE; break;
        case 'RIGHT': head.x += GRID_SIZE; break;
    }

    snake.unshift(head);

    // --- This is the new part ---
    // Check if the snake's head is at the same position as the food
    const ateFood = head.x === food.x && head.y === food.y;

    if (ateFood) {
        // If food is eaten, generate new food
        generateFood();
        // And don't pop the tail, letting the snake grow
    } else {
        // If no food is eaten, remove the tail segment as usual
        snake.pop();
    }
}
```

By putting `snake.pop()` in an `else` block, we ensure it only runs when the snake *hasn't* eaten food. When it *has* eaten, we skip popping the tail, and the snake's length increases by one.

## Adding a Score

This is also the perfect place to update the player's score.

```javascript
// --- Game State ---
let score = 0;

// --- DOM Elements ---
const scoreElement = document.getElementById('score');

// Inside the `if (ateFood)` block in moveSnake:
if (ateFood) {
    score += 10;
    scoreElement.textContent = score; // Update the display
    generateFood();
} else {
    snake.pop();
}
```

Now your snake can eat, grow, and score points! We're getting very close to a complete game.

**Next Step:** [Step 7: Collision Detection (Game Over)](./step7-collision.md)
