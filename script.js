const container = document.querySelector('#gameContainer');

const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');

const restartButton = document.querySelector('#restartButton');

const head = document.createElement('div');
const snakeBody = [];
let snakePosition = { x: 7, y: 7 };
head.className = 'snake';
head.style.backgroundColor = 'green';
head.style.width = '40px';
head.style.height = '40px';

const food = document.createElement('div');
let foodPosition = { x: 0, y: 0 };
food.id = 'food';
food.style.backgroundColor = 'red';
food.style.width = '40px';
food.style.height = '40px';

let started = false;
let currentInterval;
let foodEaten = false;
let direction = null;

let score = 0;
let highScore = localStorage.getItem('highScore');

if (highScore === null) {
    highScore = 0;
} else {
    highScore = Number(highScore);
}

highScoreDisplay.textContent = 'High score: ' + highScore;


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

document.querySelector(`#col${snakePosition.x}row${snakePosition.y}`).appendChild(head);

function renderSnake() {

    head.remove();
    
    document.querySelectorAll('.bodyPart').forEach(part => part.remove());

    document.querySelector(`#col${snakePosition.x}row${snakePosition.y}`).appendChild(head);

    for (let part of snakeBody) {
        const bodyPart = document.createElement('div');
        bodyPart.className = 'bodyPart';
        bodyPart.style.width = '40px';
        bodyPart.style.height = '40px';
        bodyPart.style.backgroundColor = 'lightgreen';

        document.querySelector(`#col${part.x}row${part.y}`).appendChild(bodyPart);
    }
}

function spawnFood() {
    foodPosition.x = Math.floor(Math.random() * 15);
    foodPosition.y = Math.floor(Math.random() * 15);

    if (foodPosition === snakePosition || snakeBody.some(part => part.x === foodPosition.x && part.y === foodPosition.y)) {
        spawnFood();
        return;
    }

    food.remove();
    document.querySelector(`#col${foodPosition.x}row${foodPosition.y}`).appendChild(food);
}

function checkFood() {
    if (snakePosition.x === foodPosition.x && snakePosition.y === foodPosition.y) {
        foodEaten = true;
        score += 1;
        scoreDisplay.textContent = 'Score: ' + score;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = 'High score: ' + highScore;
        }
        spawnFood();
    }
}

function move(dx, dy) {
    snakeBody.unshift({ x: snakePosition.x, y: snakePosition.y });
    snakePosition.x += dx;
    snakePosition.y += dy;

    if (snakePosition.x < 0) snakePosition.x = 14;
    if (snakePosition.x > 14) snakePosition.x = 0;
    if (snakePosition.y < 0) snakePosition.y = 14;
    if (snakePosition.y > 14) snakePosition.y = 0;

    checkFood();

    if (!foodEaten) {
        snakeBody.pop();
    } else {
        foodEaten = false;
    }

    if (snakeBody.some(part => part.x === snakePosition.x && part.y === snakePosition.y)) {
        clearInterval(currentInterval);
        highScore = Math.max(highScore, score);
        localStorage.setItem('highScore', highScore);

        alert('Game Over! Your score: ' + score);
        location.reload();

    }
    renderSnake();
}

function gameLoop() {
    switch (direction) {
        case 'up': move(0, -1); break;
        case 'down': move(0, 1); break;
        case 'left': move(-1, 0); break;
        case 'right': move(1, 0); break;
    }
}



document.addEventListener('keydown', function(event) {
    if (!started) {
        started = true;
        spawnFood();
        renderSnake();
        currentInterval = setInterval(gameLoop, 200);

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