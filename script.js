const container = document.querySelector('#gameContainer');
const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');
const restartButton = document.querySelector('#restartButton');
const snake = document.createElement('div');
var snakePosition = { x: 7, y: 7 };
snake.id = 'snake';
snake.style.backgroundColor = 'green';
snake.style.width = '40px';
snake.style.height = '40px';
const food = document.createElement('div');
var foodPosition = { x: 0, y: 0 };
food.id = 'food';
food.style.backgroundColor = 'red';
food.style.width = '40px';
food.style.height = '40px';


for (let i = 0; i < 15; i++) {
    const column = document.createElement('div');
    column.textContent = '';
    column.className = 'column';
    column.id = `col${i}`;
    container.appendChild(column);
    for (let j = 0; j < 15; j++) {
        const row = document.createElement('div');
        row.textContent = '';
        row.className = 'row';
        row.id = `col${i}row${j}`;
        column.appendChild(row);
    } 
}

document.querySelector(`#col${snakePosition.x}row${snakePosition.y}`).appendChild(snake);

function moveUp() {
    if (snakePosition.y === 0) {
        snakePosition.y = 15;
    };
    snakePosition.y--;
    renderSnake();
    checkFood();
}

function moveDown() {
    if (snakePosition.y === 14) {
        snakePosition.y = -1;
    };
    snakePosition.y++;
    renderSnake();
    checkFood();
}

function moveLeft() {
    if (snakePosition.x === 0) {
        snakePosition.x = 15;
    };
    snakePosition.x--;
    renderSnake();
    checkFood();
}

function moveRight() {
    if (snakePosition.x === 14) {
        snakePosition.x = -1;
    };
    snakePosition.x++;
    renderSnake();
    checkFood();
}

function spawnFood() {
    foodPosition.x = Math.floor(Math.random() * 15);
    foodPosition.y = Math.floor(Math.random() * 15);
    food.remove();
    document.querySelector(`#col${foodPosition.x}row${foodPosition.y}`).appendChild(food);
}

function checkFood() {
    if (snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
        spawnFood();
    }
}

function renderSnake() {
    snake.remove();
    document.querySelector(`#col${snakePosition.x}row${snakePosition.y}`).appendChild(snake);
}

function gameLoop() {
    switch (direction) {
        case 'up': moveUp(); break;
        case 'down': moveDown(); break;
        case 'left': moveLeft(); break;
        case 'right': moveRight(); break;
    }
}

let started = false;
let currentInterval;
let foodEaten = false;

document.addEventListener('keydown', function(event) {
    if (!started) {
        started = true;
        currentInterval = setInterval(gameLoop, 400);
        renderSnake();
        spawnFood();
    }

    switch(event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
});