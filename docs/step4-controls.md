
# Step 4: Adding Player Controls

Our snake can move, but we need to let the player control it. We'll add support for both keyboard and on-screen touch controls.

## Part A: Keyboard Controls

First, let's handle input from a physical keyboard.

### The Event Listener

JavaScript makes it easy to listen for events on the webpage. We'll add a `keydown` event listener to the `document`. This will fire a function every time a key is pressed.

```javascript
// Add this at the top level of your script, outside any function
document.addEventListener('keydown', handleKeyPress);
```

### The Direction Logic

To avoid repeating code, we'll create a single function, `setDirection`, that handles the logic for changing direction. This function will prevent the snake from reversing on itself and can be called by both our keyboard and touch handlers.

```javascript
// Add to your game state variables
let changingDirection = false;

/**
 * Sets the snake's direction, preventing 180-degree turns.
 * @param newDirection The desired new direction.
 */
function setDirection(newDirection) {
    if (changingDirection) return; // Prevent multiple inputs per tick

    const goingUp = direction === 'UP';
    const goingDown = direction === 'DOWN';
    const goingLeft = direction === 'LEFT';
    const goingRight = direction === 'RIGHT';

    if (newDirection === 'UP' && !goingDown) {
        direction = 'UP';
        changingDirection = true;
    } else if (newDirection === 'DOWN' && !goingUp) {
        direction = 'DOWN';
        changingDirection = true;
    } else if (newDirection === 'LEFT' && !goingRight) {
        direction = 'LEFT';
        changingDirection = true;
    } else if (newDirection === 'RIGHT' && !goingLeft) {
        direction = 'RIGHT';
        changingDirection = true;
    }
}
```

This ensures only one valid direction change is processed per game tick. Remember to reset the flag in your game loop:
```javascript
function gameLoop() {
    // ...
    changingDirection = false; // Allow a new direction change on this tick
    // ...
}
```

### The Keyboard Handler

Now the `handleKeyPress` function is very simple. It just determines which key was pressed and calls `setDirection`.

```javascript
function handleKeyPress(event) {
    const keyPressed = event.key;
    if (keyPressed === 'ArrowUp' || keyPressed.toLowerCase() === 'w') {
        setDirection('UP');
    } else if (keyPressed === 'ArrowDown' || keyPressed.toLowerCase() === 's') {
        setDirection('DOWN');
    } else if (keyPressed === 'ArrowLeft' || keyPressed.toLowerCase() === 'a') {
        setDirection('LEFT');
    } else if (keyPressed === 'ArrowRight' || keyPressed.toLowerCase() === 'd') {
        setDirection('RIGHT');
    }
}
```

## Part B: Touch Controls

To support mobile devices, we'll add on-screen buttons.

### The HTML

In `index.html`, add a container for the buttons. A D-pad layout is intuitive for this kind of game.

```html
<div class="touch-controls">
    <button id="upBtn" aria-label="Move Up">▲</button>
    <button id="leftBtn" aria-label="Move Left">◀</button>
    <button id="rightBtn" aria-label="Move Right">▶</button>
    <button id="downBtn" aria-label="Move Down">▼</button>
</div>
```

### The CSS

Use CSS Grid to easily arrange the buttons into a D-pad shape.

```css
.touch-controls {
    margin-top: 20px;
    display: grid;
    grid-template-areas:
        ". up ."
        "left . right"
        ". down .";
    gap: 10px;
    width: 180px;
    margin-left: auto;
    margin-right: auto;
}

.touch-controls button {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    /* ... other styling ... */
}

#upBtn { grid-area: up; }
#downBtn { grid-area: down; }
#leftBtn { grid-area: left; }
#rightBtn { grid-area: right; }
```

### The JavaScript Event Listeners

Finally, in your script, get references to these buttons and add `click` event listeners. The `click` event works for both mouse and touch. Since we already created our `setDirection` function, this part is easy!

```javascript
// Get button elements
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Add listeners
upBtn.addEventListener('click', () => setDirection('UP'));
downBtn.addEventListener('click', () => setDirection('DOWN'));
leftBtn.addEventListener('click', () => setDirection('LEFT'));
rightBtn.addEventListener('click', () => setDirection('RIGHT'));
```
Now you have a fully responsive control system for both desktop and mobile!

**Next Step:** [Step 5: Adding Food](./step5-food.md)
