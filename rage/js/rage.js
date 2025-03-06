const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");

let speed = 10;

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth;

const interval = setInterval(draw, speed);

const ballRadius = canvas.width / 60;
const paddleHeight = canvas.height / 10;
const paddleWidth = canvas.width / 10;
const addMove = 2;

const num = canvas.height / 9;

const obsWidth = canvas.width / 10;
const obsHeight = canvas.height / 10;

const popUpHeight = canvas.height / 2;
const popUpWidth = canvas.width / 2;
let popUpX = (canvas.width - popUpWidth) / 2;
let popUpY = (canvas.height - popUpHeight) / 2;

const brickRowCount = 4;
const brickColumnCount = 10;
const brickWidth = canvas.width / 10;
const brickHeight = canvas.height / 23;
const brickPadding = 1;
const brickOffsetTop = canvas.height / 12;
const brickOffsetLeft = 0;

const bricks = [];
for ( let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x:0, y:0};
    }
}

let paddleY = (canvas.height - paddleHeight ) / 2;
let pos = 0;
let rightPressed = false;
let leftPressed = false;
let forePressed = false;
let backPressed = false;

let pauseState = false;
let winState = false;
let loseState = false;

let startGame = false;

let x = canvas.width + 20;
let y = canvas.height / 2;

let score = 0;
let lives = 3;
let health = 3;
let coin = 0;

let dx = -2;
let dy = 0;


document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

const rows = 5;
const obsCount = 1000;
const obs = [];
for ( let c = 0; c < obsCount; c++) {
    obs[c] = [];
    for (let r = 0; r < rows; r++) {
        const obVis = Math.floor(Math.random() * rows );
        obs[c][r] = { x:0, y:0, status: obVis};
    }
}


function drawObs() {
    for (let c = 0; c < obsCount; c++) {
      for (let r = 0; r < rows ; r++) {
        if (obs[c][r].status === 1) {
            const obX = c * (obsWidth + 139) + x;
            const obY = r  * num + (brickRowCount*(brickPadding + brickHeight) + brickOffsetTop );
            obs[c][r].x = obX;
            obs[c][r].y = obY;
            ctx.beginPath();
            ctx.rect(obX, obY, obsWidth, obsHeight);
            ctx.fillStyle = "#6e2343";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
}

function obsCollision() {
    for (let c= 0; c < obsCount; c++) {
        for (let r = 0; r < rows; r++) {
            const o = obs[c][r];
            if (o.status === 1){
                if (o.x < paddleWidth  && o.y > paddleY && o.y < paddleY + paddleHeight) {
                // if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                // if (o.x < paddleX  && o.x > paddleX + paddleWidth && o.y > paddleY && o.y < paddleY + paddleHeight) {
                    o.status = 0;
                    health--;
                    if (health === 0){
                        lives --;
                        health = 3;
                        if (lives === 0) {
                            pauseState = true;
                            loseState = true;
                            popUp();
                            gameText();
                            gameStatus();
                            clearInterval(interval);
                        } 
                    }
                }
                else if (o.x < 0) {
                    o.status = 0;
                }

            }
        }
    }
}

const livesCount = 1000;
const liveSet = [];
for ( let c = 0; c < livesCount; c++) {
    liveSet[c] = [];
    for (let r = 0; r < rows; r++) {
        const livesVis = Math.floor(Math.random() * (rows * 2) );
        liveSet[c][r] = { x:0, y:0, status: livesVis};
    }
}


function drawLives() {
    for (let c = 0; c < livesCount; c++) {
      for (let r = 1; r < rows; r++) {
        if (liveSet[c][r].status === 1) {
            const liveX = c * (ballRadius + 631) +  x;
            const liveY = r  * num + (brickRowCount*(brickPadding + brickHeight) + brickOffsetTop ) + (brickHeight/2);
            liveSet[c][r].x = liveX;
            liveSet[c][r].y = liveY;
            ctx.beginPath();
            ctx.arc(liveX, liveY, ballRadius, 0, Math.PI * 2);
            // ctx.moveTo(liveX, liveY);
            // ctx.lineTo(liveY, liveY);
            // ctx.lineTo(liveX, liveY);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
}

function livesCollision() {
    for (let c= 0; c < livesCount; c++) {
        for (let r = 1; r < rows; r++) {
            const l = liveSet[c][r];
            if (l.status === 1){
                if (l.x < paddleWidth  && l.y > paddleY && l.y < paddleY + paddleHeight) {
                    l.status = 0;
                    if (health < 3){
                        health++;
                        if (health === 4){
                            lives ++;
                            health = 1;
                        }
                    }
                }
                else if (l.x < 0) {
                    l.status = 0;
                }

            }
        }
    }
}

const coinCount = 1000;
const coins = [];
for ( let c = 0; c < coinCount; c++) {
    coins[c] = [];
    for (let r = 0; r < rows; r++) {
        const coinVis = Math.floor(Math.random() * rows  );
        coins[c][r] = { x:0, y:0, status: coinVis};
    }
}

function drawCoins() {
    for (let c = 0; c < coinCount; c++) {
      for (let r = 1; r < rows; r++) {
        if (coins[c][r].status === 1) {
            const coinX = c * (ballRadius + 601) +  x;
            const coinY = r  * num + (brickRowCount*(brickPadding + brickHeight) + brickOffsetTop ) + (brickHeight/2);
            coins[c][r].x = coinX;
            coins[c][r].y = coinY;
            ctx.beginPath();
            ctx.arc(coinX, coinY, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#fcba03";
            ctx.fill();
            ctx.closePath();
        }
      }
    }
}

function coinCollision() {
    for (let c= 0; c < coinCount; c++) {
        for (let r = 1; r < rows; r++) {
            const s = coins[c][r];
            if (s.status === 1){
                if (s.x < paddleWidth  && s.y > paddleY && s.y < paddleY + paddleHeight) {
                    s.status = 0;
                    coin++;
                }
                else if (s.x < 0) {
                    s.status = 0;
                }

            }
        }
    }
}


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
      for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#8c4c31";
            ctx.fill();
            ctx.closePath();
        }
      
    }
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          
              const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
              const brickY = r * (brickHeight + brickPadding) + (canvas.height - (brickRowCount * (brickHeight + brickPadding) ) );
              bricks[c][r].x = brickX;
              bricks[c][r].y = brickY;
              ctx.beginPath();
              ctx.rect(brickX, brickY, brickWidth, brickHeight);
              ctx.fillStyle = "#8c4c31";
              ctx.fill();
              ctx.closePath();
         
        }
      }
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(pos, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#1c305e";
    ctx.fill();
    ctx.closePath();
}

function drawRoad() {
    ctx.beginPath();
    const ry = brickRowCount*(brickPadding + brickHeight) + brickOffsetTop ;
    const road =canvas.height - ((brickRowCount*(brickPadding + brickHeight) + brickOffsetTop ) + (brickRowCount*(brickPadding + brickHeight) )) ;
    ctx.rect(0, ry, canvas.width, road);
    ctx.fillStyle = "#5b9dc9";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score.toFixed(0)}`, 50, brickOffsetTop / 2);
}
function drawCoin() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Coins: ${coin}`, canvas.width / 2, brickOffsetTop / 2);
}

function drawLiveTrack() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, brickOffsetTop / 2);
}

function gameStatus() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Your score is: ${Math.max((score * coin).toFixed(0),score.toFixed(0))}`, canvas.width / 2, popUpHeight);
    ctx.fillText(`You have ${lives} lives left`, canvas.width / 2, popUpHeight + 20);
}

function gameText() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    if (loseState === true){       
        ctx.fillText('Game Over!', canvas.width / 2, popUpHeight - 40);
    } else if (winState === true){
        ctx.fillText('You Win!', canvas.width / 2, popUpHeight - 40);
    }else if (pauseState === true && (winState === false || pauseState === false)){
        ctx.fillText('Game Paused!', canvas.width / 2, popUpHeight - 40);
    }
}

function startText() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText('Hit Enter', canvas.width / 2, popUpHeight);
    ctx.fillText('to Start', canvas.width / 2, popUpHeight + 50);
}


function topBar() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, brickOffsetTop);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function popUp() {
    ctx.beginPath();
    ctx.rect(popUpX, popUpY, popUpWidth, popUpHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPauseScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();
    ctx.closePath();

}

function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        rightPressed = true;
    }
    else if (e.key === "Down" || e.key === "ArrowDown") {
        leftPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        backPressed = true;
    } 
    if (e.key === "Right" || e.key === "ArrowRight") {
        forePressed = true;
    }
    else if (e.key === "Escape" ){
        pauseState = !pauseState;
    }
    else if (e.key === "Enter" ){
        startGame = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
        rightPressed = false;
    }
    else if (e.key === "Down" || e.key === "ArrowDown") {
        leftPressed = false;
    }
    if (e.key === "Right" || e.key === "ArrowRight") {
        forePressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        backPressed = false;
    } 
}

function movePaddle() {
    if (leftPressed && !pauseState) {
        paddleY = Math.min(paddleY + addMove, canvas.height - paddleHeight - (brickHeight * brickRowCount) - (brickPadding * brickRowCount));
    }
    else if (rightPressed && !pauseState) {
        paddleY = Math.max(paddleY - addMove, (brickHeight * brickRowCount) + (brickPadding * (brickRowCount - 1)) + brickOffsetTop);
    }
    else if (forePressed && !pauseState) {
        pos = canvas.width/20;
    }
    else if (backPressed && !pauseState) {
        pos = 0;
    }

}

function moveUp() {
    rightPressed = true;
}

function moveDown() {
    leftPressed = true;
}

function moveLeft() {
    backPressed = true;
}

function moveRight(){
    forePressed = true;
}

function clearMove() {
    rightPressed = false;
    leftPressed = false;
    forePressed = false;
    backPressed = false;
}

function start() {
    startGame = true;
}
function pause() {
    pauseState = true;
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    topBar();
    drawRoad();
    drawBricks();
    drawScore();
    drawCoin();
    drawObs();
    drawCoins();
    drawPaddle();
    movePaddle();
    obsCollision();
    livesCollision();
    coinCollision();
    drawLiveTrack();
    drawLives();

    if (startGame === true){

        if (!pauseState){
            x += dx;
            y += dy;
            score+=0.01;
            if (score >= 1000){
                pauseState = true;
                winState = true;
                popUp();
                gameText();
                gameStatus();
                clearInterval(interval);
            } 
        } else {
            // drawPauseScreen();
            popUp();
            gameText();
            gameStatus();
        }
    }
    else {
        popUp();
        startText();
    }
}



//   document.getElementById("runButton").addEventListener("click", function () {
//     draw();
//     this.disabled = true;
//   });
