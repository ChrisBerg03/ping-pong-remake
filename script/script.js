let gameState = "start";
let paddle1 = document.querySelector(".paddle1");
let paddle2 = document.querySelector(".paddle2");
let board = document.querySelector(".board");
let initialBall = document.querySelector(".ball");
let ball = document.querySelector(".ball");
let score1 = document.querySelector(".player1Score");
let score2 = document.querySelector(".player2Score");
let message = document.querySelector(".message");
let paddle1Coord = paddle1.getBoundingClientRect();
let paddle2Coord = paddle2.getBoundingClientRect();
let initialBallCoord = ball.getBoundingClientRect();
let ballCoord = initialBallCoord;
let boardCoord = board.getBoundingClientRect();
let paddleCommon = document.querySelector(".paddle").getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        gameState = gameState == "start" ? "play" : "start";
        if (gameState == "play") {
            message.innerHTML = "Game Started";
            message.style.left = 42 + "vw";
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
                dxd = Math.floor(Math.random() * 2);
                dyd = Math.floor(Math.random() * 2);
                moveBall(dx, dy, dxd, dyd);
            });
        }
    }
    if (gameState == "play") {
        if (e.key == "w") {
            paddle1.style.top =
                Math.max(
                    boardCoord.top,
                    paddle1Coord.top - window.innerHeight * 0.06
                ) + "px";
            paddle1Coord = paddle1.getBoundingClientRect();
        }
        if (e.key == "s") {
            paddle1.style.top =
                Math.min(
                    boardCoord.bottom - paddleCommon.height,
                    paddle1Coord.top + window.innerHeight * 0.06
                ) + "px";
            paddle1Coord = paddle1.getBoundingClientRect();
        }

        if (e.key == "ArrowUp") {
            paddle2.style.top =
                Math.max(
                    boardCoord.top,
                    paddle2Coord.top - window.innerHeight * 0.1
                ) + "px";
            paddle2Coord = paddle2.getBoundingClientRect();
        }
        if (e.key == "ArrowDown") {
            paddle2.style.top =
                Math.min(
                    boardCoord.bottom - paddleCommon.height,
                    paddle2Coord.top + window.innerHeight * 0.1
                ) + "px";
            paddle2Coord = paddle2.getBoundingClientRect();
        }
    }
});

function moveBall(dx, dy, dxd, dyd) {
    if (ballCoord.top <= boardCoord.top) {
        dyd = 1;
    }
    if (ballCoord.bottom >= boardCoord.bottom) {
        dyd = 0;
    }
    if (
        ballCoord.left <= paddle1Coord.right &&
        ballCoord.top >= paddle1Coord.top &&
        ballCoord.bottom <= paddle1Coord.bottom
    ) {
        dxd = 1;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ballCoord.right >= paddle2Coord.left &&
        ballCoord.top >= paddle2Coord.top &&
        ballCoord.bottom <= paddle2Coord.bottom
    ) {
        dxd = 0;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    }
    if (
        ballCoord.left <= boardCoord.left ||
        ballCoord.right >= boardCoord.right
    ) {
        if (ballCoord.left <= boardCoord.left) {
            score2.innerHTML = +score2.innerHTML + 1;
        } else {
            score1.innerHTML = +score1.innerHTML + 1;
        }
        gameState = "start";

        ballCoord = initialBallCoord;
        ball.style = initialBall.style;
        message.innerHTML = "Press Enter to Play Pong";
        message.style.left = 38 + "vw";
        return;
    }
    ball.style.top = ballCoord.top + dy * (dyd == 0 ? -1 : 1) + "px";
    ball.style.left = ballCoord.left + dx * (dxd == 0 ? -1 : 1) + "px";
    ballCoord = ball.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBall(dx, dy, dxd, dyd);
    });
}
