
/**
 * @file A simple Snake game implementation in pure JavaScript.
 */

// --- DOM Elements ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// --- Game Constants ---
const GRID_SIZE = 20; // Size of each square in the grid
const CANVAS_WIDTH = canvas ? canvas.width : 400;
const CANVAS_HEIGHT = canvas ? canvas.height : 400;

// --- Game State ---
let snake;
let food;
let direction;
let score;
let gameOver;
let gameInterval;
let changingDirection; // Prevents rapid 180-degree turns

/**
 * Initializes or resets the game state to its default values.
 */
function setupGame() {
    snake = [
        { x: 10 * GRID_SIZE, y: 10 * GRID_SIZE }, // Head
        { x: 9 * GRID_SIZE, y: 10 * GRID_SIZE },
        { x: 8 * GRID_SIZE, y: 10 * GRID_SIZE }
    ];
    direction = 'RIGHT';
    score = 0;
    gameOver = false;
    changingDirection = false;
    
    if (scoreElement) scoreElement.textContent = '0';
    if (gameOverScreen) gameOverScreen.classList.remove('visible');
    if (startBtn) startBtn.textContent = 'Start Game';
    
    generateFood();
    drawEverything();
}

/**
 * The main game loop, responsible for updating and drawing the game.
 */
function gameLoop() {
    if (gameOver) {
        clearInterval(gameInterval);
        showGameOver();
        return;
    }

    changingDirection = false; // Allow next direction change
    moveSnake();
    checkCollision();
    drawEverything();
}

/**
 * Clears the canvas and redraws all game elements (snake and food).
 */
function drawEverything() {
    if (!ctx) return;
    // Clear canvas
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawSnake();
    drawFood();
}

/**
 * Renders the snake on the canvas.
 */
function drawSnake() {
    if (!ctx || !snake) return;
    snake.forEach((segment, index) => {
        // Head is green, body is a lighter green
        ctx.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
        ctx.strokeStyle = '#2c3e50';
        ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
        ctx.strokeRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
    });
}

/**
 * Renders the food on the canvas.
 */
function drawFood() {
    if (!ctx || !food) return;
    ctx.fillStyle = '#e74c3c'; // Red color for food
    ctx.strokeStyle = '#c0392b';
    ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
    ctx.strokeRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
}

/**
 * Updates the snake's position based on the current direction.
 */
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'UP': head.y -= GRID_SIZE; break;
        case 'DOWN': head.y += GRID_SIZE; break;
        case 'LEFT': head.x -= GRID_SIZE; break;
        case 'RIGHT': head.x += GRID_SIZE; break;
    }

    snake.unshift(head);

    // Check if snake ate food
    if (food && head.x === food.x && head.y === food.y) {
        score += 10;
        if(scoreElement) scoreElement.textContent = score.toString();
        generateFood();
    } else {
        snake.pop();
    }
}

/**
 * Generates a new piece of food at a random location on the grid.
 * Ensures the food does not spawn on top of the snake.
 */
function generateFood() {
    let foodX, foodY;
    // This loop continues until it finds a valid spot for the food.
    while (true) {
        foodX = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE;
        foodY = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE;
        
        let onSnake = snake.some(segment => segment.x === foodX && segment.y === foodY);
        if (!onSnake) {
            break; // Exit loop if the spot is not on the snake
        }
    }
    food = { x: foodX, y: foodY };
}

/**
 * Checks for game-ending collisions (walls or self).
 */
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT) {
        gameOver = true;
        return;
    }

    // Self collision (check if head collides with any part of the body)
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            return;
        }
    }
}

/**
 * Displays the game over screen and updates the final score.
 */
function showGameOver() {
    if (finalScoreElement) finalScoreElement.textContent = score.toString();
    if (gameOverScreen) gameOverScreen.classList.add('visible');
    if (startBtn) startBtn.textContent = 'Play Again';
}

/**
 * Sets the snake's direction, preventing 180-degree turns.
 * @param {string} newDirection The desired new direction ('UP', 'DOWN', 'LEFT', 'RIGHT').
 */
function setDirection(newDirection) {
    if (changingDirection) return;

    const goingUp = direction === 'UP';
    const goingDown = direction === 'DOWN';
    const goingLeft = direction === 'LEFT';
    const goingRight = direction === 'RIGHT';

    // Prevent the snake from reversing direction
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

/**
 * Handles keyboard input to change the snake's direction.
 * @param {KeyboardEvent} event The keyboard event object.
 */
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

/**
 * Starts or resets the game.
 */
function startGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    setupGame();
    gameInterval = setInterval(gameLoop, 100); // Game speed (lower is faster)
}

// --- Event Listeners ---
// These are attached only if the elements exist
if (startBtn) startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);
if (upBtn) upBtn.addEventListener('click', () => setDirection('UP'));
if (downBtn) downBtn.addEventListener('click', () => setDirection('DOWN'));
if (leftBtn) leftBtn.addEventListener('click', () => setDirection('LEFT'));
if (rightBtn) rightBtn.addEventListener('click', () => setDirection('RIGHT'));


// --- Initial Setup ---
// Check if all essential elements are loaded before setting up the game
if (canvas && ctx && scoreElement && startBtn && gameOverScreen && finalScoreElement && upBtn && downBtn && leftBtn && rightBtn) {
    setupGame();
} else {
    console.error('Failed to initialize game: one or more DOM elements not found.');
}
