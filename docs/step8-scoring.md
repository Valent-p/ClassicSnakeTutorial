
# Step 8: Finalizing Scoring and UI

We have the core game mechanics, but the user experience can be improved. Let's create a proper "Game Over" screen and make sure our scoring is clearly displayed.

## The Game Over Screen

In `index.html`, we already created a hidden overlay `div`:
```html
<div id="gameOverScreen" class="game-overlay">
    <h2>Game Over</h2>
    <p>Your final score is <span id="finalScore">0</span>.</p>
</div>
```

Now, let's style it in `style.css` to be an overlay that appears on top of the canvas.

```css
.canvas-container {
    position: relative; /* This is crucial for positioning the overlay */
}

.game-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: hidden; /* Hide it by default */
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.game-overlay.visible {
    visibility: visible;
    opacity: 1;
}
```
We use `visibility` and `opacity` to create a nice fade-in effect.

## Displaying the Final Score

In `script.js`, we need a function to show this screen when the game ends.

```javascript
// Get references to the new elements
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');

/**
 * Displays the game over screen.
 */
function showGameOver() {
    finalScoreElement.textContent = score; // Set the final score text
    gameOverScreen.classList.add('visible'); // Make the screen visible
}

// Now, update the gameLoop to call this function
function gameLoop() {
    if (gameOver) {
        clearInterval(gameInterval);
        showGameOver(); // Call our new function
        return;
    }
    // ... rest of the loop
}
```

Now, when the game ends, a "Game Over" screen will fade in, displaying the player's final score. This is much more user-friendly than a simple console message.

**Next Step:** [Step 9: Refinements and Reset](./step9-refinements.md)
