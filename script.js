const gameBoard = document.querySelector("#game-board")
const gameOverDiv = document.querySelector("#game-over")
const controllerDiv = document.querySelector("#controller")
const play = document.querySelector("#game-over button")
const scoreText = document.querySelector("#game-dets #score")
const highScoreText = document.querySelector("#game-dets #high-score")


let clutter = ``;
let score = 0;
let foodPosX, foodPosY;
let snakePosX = 4, snakePosY = 5;
let snakeMoveX = 0, snakeMoveY = 0;
let snakeBody = [];
let flag = 1;
let interval;



let highscore = localStorage.getItem('high-score') || 0;
highScoreText.innerHTML = highscore

document.querySelector("#main>button").addEventListener("click",function(){
    highscore=0
    localStorage.setItem("high-score", highscore);
    highScoreText.innerHTML = highscore
})


function gameOver() {
    clearInterval(interval);
    gameBoard.style.display = 'none'
    controllerDiv.style.display = 'none'
    gameOverDiv.style.display = 'flex'
    play.addEventListener("click", () => {
        location.reload()
    })
}


function changeFoodPos() {
    foodPosY = Math.floor(Math.random() * 20 + 1)
    foodPosX = Math.floor(Math.random() * 30 + 1)
}


function displayFoodAndSnake() {
    if (flag === 0) {
        return gameOver();
    }


    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        snakeBody.push([foodPosY, foodPosX]);
        changeFoodPos();
        score++;
        scoreText.innerHTML = score
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score", highscore);
        highScoreText.innerHTML = highscore

    }
   
    clutter = `<div id="food" style="grid-area:${foodPosY}/${foodPosX};" class="bg-yellow-300 rounded-full"></div>`
   
    snakePosX += snakeMoveX;
    snakePosY += snakeMoveY;


    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakePosY, snakePosX]

    if (snakePosY <= 0 || snakePosY > 20 || snakePosX <= 0 || snakePosX > 30) {
        flag = 0;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        clutter += `<div id="head" style="grid-area:${snakeBody[i][0]}/${snakeBody[i][1]};" class="${i === 0 ? "bg-red-400 rounded-full" : "bg-blue-500 rounded-lg border-2 border-zinc-300"}"></div>`
        if (i > 1 && (snakeBody[0][0] === snakeBody[i][0]) && (snakeBody[0][1] === snakeBody[i][1])) {
            flag = 0;
        }
    }

    gameBoard.innerHTML = clutter
   
}

changeFoodPos()


interval=setInterval(displayFoodAndSnake, 125)


document.addEventListener("keydown", dets => {
    if (dets.key === "ArrowUp" && snakeMoveY != 1) {
        snakeMoveX = 0;
        snakeMoveY = -1;
    }
    else if (dets.key === "ArrowDown" && snakeMoveY != -1) {
        snakeMoveX = 0;
        snakeMoveY = 1;
    }
    else if (dets.key === "ArrowLeft" && snakeMoveX != 1) {
        snakeMoveX = -1;
        snakeMoveY = 0;
    }
    else if (dets.key === "ArrowRight" && snakeMoveX != -1) {
        snakeMoveX = 1;
        snakeMoveY = 0;
    }

})
document.querySelectorAll("#controller i").forEach(e=>{
    e.addEventListener("click",dets=>{
        if (dets.target.id === "ArrowUp" && snakeMoveY != 1) {
            snakeMoveX = 0;
            snakeMoveY = -1;
        }
        else if (dets.target.id === "ArrowDown" && snakeMoveY != -1) {
            snakeMoveX = 0;
            snakeMoveY = 1;
        }
        else if (dets.target.id === "ArrowLeft" && snakeMoveX != 1) {
            snakeMoveX = -1;
            snakeMoveY = 0;
        }
        else if (dets.target.id === "ArrowRight" && snakeMoveX != -1) {
            snakeMoveX = 1;
            snakeMoveY = 0;
        }
    })
})

