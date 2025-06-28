
# Step 9: Refinements and Reset

We have a complete game! The final step is to add some polish. The most important feature is the ability to start a new game after a game over.

## The Start/Reset Button

Our HTML already has a button. We just need to make it work for both starting and restarting the game.

First, let's organize our initialization code into a `setupGame` function. This will reset all the game variables to their starting values.

```javascript
function setupGame() {
    snake = [
        { x: 10 * GRID_SIZE, y: 10 * GRID_SIZE },
        { x: 9 * GRID_SIZE, y: 10 * GRID_SIZE },
        { x: 8 * GRID_SIZE, y: 10 * GRID_SIZE }
    ];
    direction = 'RIGHT';
    score = 0;
    gameOver = false;
    
    // Reset UI elements
    scoreElement.textContent = '0';
    gameOverScreen.classList.remove('visible');
    startBtn.textContent = 'Start Game';
    
    generateFood();
    drawEverything();
}
```

Now, we can create a `startGame` function that clears any existing game loop and calls our setup function.

```javascript
function startGame() {
    // Clear any previous game loop
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    // Set up the game state
    setupGame();
    // Start the new game loop
    gameInterval = setInterval(gameLoop, 100); // 100ms = 10 frames per second
}
```

Finally, we just need to hook this up to our button and update the button's text when the game ends.

```javascript
// Add event listener to the button
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

// In the showGameOver() function, change the button text
function showGameOver() {
    finalScoreElement.textContent = score;
    gameOverScreen.classList.add('visible');
    startBtn.textContent = 'Play Again'; // Update button text
}
```

## Initial Load

To make the game board appear when the page first loads (before the user clicks start), we can call `setupGame()` one time when the script initially runs.

```javascript
// --- Initial Setup ---
// At the very end of your script, call setupGame() once.
setupGame();
```

## Congratulations!

You have now built a complete Snake game from scratch using only HTML, CSS, and pure JavaScript. You've learned about:
- The HTML Canvas
- Game loops
- State management
- User input
- Collision detection
- And polishing a game for a better user experience.

From here, you can try to add new features like increasing speed, different food types, or even power-ups!
