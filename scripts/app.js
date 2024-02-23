
let score = 0;
let lives = 3; 
let heartEmoji = String.fromCodePoint(0x2764);
const gameBoard = document.getElementById('game-board');
const cellSize = 20;
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.createElement('div');
livesDisplay.id = 'lives-display'; 
gameBoard.parentNode.insertBefore(livesDisplay, gameBoard.nextSibling); 
livesDisplay.innerText = `Lives: ${heartEmoji.repeat(lives)}`;


//Pac-Man maze layout
const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function updateLives() {
    lives -= 1;
    livesDisplay.innerText = `Lives: ${heartEmoji.repeat(lives)}`;
    if (lives <= 0) {
        alert("Game Over");
        // Reset game or redirect to a game-over page
    } else {
        // Reset Pac-Man and ghost to starting positions
        resetGamePositions();
    }
}

function resetGamePositions() {
    // Reset positions of Pac-Man and the ghost
    pacMan.style.top = '50px';
    pacMan.style.left = '50px';
    ghost.style.top = '100px';
    ghost.style.left = '100px';
    // You might want to reset other elements or states as needed
}


// Function to check if a position is a wall
function isWall(x, y) {
    const rowIndex = Math.floor(y / cellSize);
    const colIndex = Math.floor(x / cellSize);
    return mazeLayout[rowIndex] && mazeLayout[rowIndex][colIndex] === 1;
}

// Function to draw maze and dots
function drawMaze() {
    for (let i = 0; i < mazeLayout.length; i++) {
        for (let j = 0; j < mazeLayout[i].length; j++) {
            let cell = document.createElement('div');
            cell.style.position = 'absolute';
            cell.style.top = `${i * cellSize}px`;
            cell.style.left = `${j * cellSize}px`;
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            if (mazeLayout[i][j] === 1) {
                cell.classList.add('wall');
            } else {
                let dot = document.createElement('div');
                dot.classList.add('dot');
                cell.appendChild(dot);
            }
            gameBoard.appendChild(cell);
        }
    }
}

drawMaze();

// Create Pac-Man
const pacMan = document.createElement('div');
pacMan.style.position = 'absolute'; 
pacMan.style.top = '50px';
pacMan.style.left = '50px';
pacMan.classList.add('pac-man');
gameBoard.appendChild(pacMan);

// Create Ghost
const ghost = document.createElement('div');
ghost.style.position = 'absolute';
ghost.style.top = '100px'; // Starting position
ghost.style.left = '100px'; // Starting position
ghost.classList.add('ghost');
gameBoard.appendChild(ghost);


function moveGhostChase() {
    let pacTop = parseInt(pacMan.style.top);
    let pacLeft = parseInt(pacMan.style.left);
    let ghostTop = parseInt(ghost.style.top);
    let ghostLeft = parseInt(ghost.style.left);

    let verticalMovement = pacTop > ghostTop ? cellSize : -cellSize;
    let horizontalMovement = pacLeft > ghostLeft ? cellSize : -cellSize;

    // Decide whether to move vertically or horizontally based on which direction is closer
    if (Math.abs(pacTop - ghostTop) > Math.abs(pacLeft - ghostLeft)) {
        if (!isWall(ghostLeft, ghostTop + verticalMovement)) {
            ghost.style.top = `${ghostTop + verticalMovement}px`;
        } else if (!isWall(ghostLeft + horizontalMovement, ghostTop)) {
            ghost.style.left = `${ghostLeft + horizontalMovement}px`;
        }
    } else {
        if (!isWall(ghostLeft + horizontalMovement, ghostTop)) {
            ghost.style.left = `${ghostLeft + horizontalMovement}px`;
        } else if (!isWall(ghostLeft, ghostTop + verticalMovement)) {
            ghost.style.top = `${ghostTop + verticalMovement}px`;
        }
    }

    // Check for collision with Pac-Man after moving
    checkCollisionWithPacMan();
}

//This line declares a function named checkCollisionWithPacMan. This function will be used to check if Pac-Man and the ghost have collided in the game.
function checkCollisionWithPacMan() {
    const pacRect = pacMan.getBoundingClientRect();
    const ghostRect = ghost.getBoundingClientRect();
    if (pacRect.x < ghostRect.x + ghostRect.width &&
        pacRect.x + pacRect.width > ghostRect.x &&
        pacRect.y < ghostRect.y + ghostRect.height &&
        pacRect.y + pacRect.height > ghostRect.y) {
        updateLives(); // Pac-Man loses a life
    }
}

// Move the ghost at regular intervals
setInterval(moveGhostChase, 500);


// Create food
for (let i = 0; i < 10; i++) {
    let food = document.createElement('div');
    let x, y;
    do {
        x = Math.floor(Math.random() * 28);
        y = Math.floor(Math.random() * 28);
    } while (mazeLayout[y][x] === 1); // Repeat until an empty cell is found
    food.style.top = `${y * cellSize}px`;
    food.style.left = `${x * cellSize}px`;
    food.classList.add('food');
    gameBoard.appendChild(food);
}



// Check for collision with food and dots
function checkCollisionWithFood(top, left) {
    // Check for collision with special food
    document.querySelectorAll('.food').forEach(function(food) {
        let foodTop = parseInt(food.style.top);
        let foodLeft = parseInt(food.style.left);
        if (Math.abs(top - foodTop) < cellSize && Math.abs(left - foodLeft) < cellSize) {
            food.parentNode.removeChild(food);
            score += 10; // Special food gives 10 points
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    });

    // Check for collision with dots
    document.querySelectorAll('.dot').forEach(function(dot) {
        let dotTop = parseInt(dot.parentNode.style.top);
        let dotLeft = parseInt(dot.parentNode.style.left);
        if (Math.abs(top - dotTop) < cellSize && Math.abs(left - dotLeft) < cellSize) {
            dot.parentNode.removeChild(dot);
            score += 1; // Each dot gives 1 point
            document.getElementById('score').innerText = `Score: ${score}`;
        }
    });
}


// Move Pac-Man on arrow key press
document.addEventListener('keydown', function(event) {
    let top = parseInt(pacMan.style.top);
    let left = parseInt(pacMan.style.left);

    // Calculate row and column based on current position
    const rowIndex = Math.floor(top / cellSize);
    const colIndex = Math.floor(left / cellSize);

    // Determine new row and column based on key press
    let newRowIndex = rowIndex;
    let newColIndex = colIndex;
    switch (event.key) {
        case 'ArrowUp':
            newRowIndex--;
            break;
        case 'ArrowDown':
            newRowIndex++;
            break;
        case 'ArrowLeft':
            newColIndex--;
            break;
        case 'ArrowRight':
            newColIndex++;
            break;
    }



    // Check if new position is within maze boundaries
    if (newRowIndex < 0 || newRowIndex >= mazeLayout.length ||
        newColIndex < 0 || newColIndex >= mazeLayout[0].length) {
        return; // Prevent out-of-bounds movement
    }

    // Check if new position is a wall
    if (mazeLayout[newRowIndex][newColIndex] === 1) {
        return; // Prevent movement into a wall
    }

    // Move Pac-Man to the new position
    pacMan.style.top = `${newRowIndex * cellSize}px`;
    pacMan.style.left = `${newColIndex * cellSize}px`;

    // Check for collision with food
    checkCollisionWithFood(top, left);
});



