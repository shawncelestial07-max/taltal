/* =========================================
   K-FLY GAME
   ========================================= */

(() => {

    "use strict";


    /* =====================================
       ELEMENTS
       ===================================== */

    const board =
        document.getElementById(
            "gameBoard"
        );

    const player =
        document.getElementById(
            "player"
        );

    const startScreen =
        document.getElementById(
            "startScreen"
        );

    const gameOver =
        document.getElementById(
            "gameOver"
        );

    const startButton =
        document.getElementById(
            "startButton"
        );

    const restartButton =
        document.getElementById(
            "restartButton"
        );

    const scoreElement =
        document.getElementById(
            "score"
        );

    const bestElement =
        document.getElementById(
            "best"
        );

    const finalScoreElement =
        document.getElementById(
            "finalScore"
        );


    /* =====================================
       GAME VARIABLES
       ===================================== */

    let running = false;

    let playerY = 0;

    let velocity = 0;

    let score = 0;

    let best =
        Number(
            localStorage.getItem(
                "kFlyBest"
            )
        ) || 0;

    let obstacles = [];

    let animationFrame = null;

    let obstacleTimer = null;


    /* =====================================
       GAME SETTINGS
       ===================================== */

    const GRAVITY = 0.42;

    const FLAP_POWER = -7.4;

    const OBSTACLE_SPEED = 3.2;

    const GAP_SIZE = 155;

    const MIN_HEIGHT = 55;


    bestElement.textContent =
        best;


    /* =====================================
       RESET PLAYER
       ===================================== */

    function resetPlayer() {

        playerY =
            board.clientHeight *
            0.43;

        velocity = 0;

        player.style.top =
            playerY + "px";

        player.style.transform =
            "rotate(0deg)";

    }


    /* =====================================
       CLEAR OBSTACLES
       ===================================== */

    function clearObstacles() {

        obstacles.forEach(
            obstacle => {

                obstacle.top.remove();

                obstacle.bottom.remove();

            }
        );

        obstacles = [];

    }


    /* =====================================
       START GAME
       ===================================== */

    function startGame() {

        startScreen.classList.add(
            "hidden"
        );

        gameOver.classList.add(
            "hidden"
        );


        clearObstacles();


        score = 0;

        scoreElement.textContent =
            "0";


        resetPlayer();


        running = true;


        createObstacle();


        clearInterval(
            obstacleTimer
        );


        obstacleTimer =
            setInterval(
                createObstacle,
                1600
            );


        cancelAnimationFrame(
            animationFrame
        );


        animationFrame =
            requestAnimationFrame(
                gameLoop
            );

    }


    /* =====================================
       FLAP
       ===================================== */

    function flap() {

        if (!running) return;

        velocity =
            FLAP_POWER;

    }


    /* =====================================
       CREATE OBSTACLE
       ===================================== */

    function createObstacle() {

        if (!running) return;


        const boardHeight =
            board.clientHeight;


        const maximumTop =
            boardHeight -
            GAP_SIZE -
            MIN_HEIGHT;


        const topHeight =
            MIN_HEIGHT +
            Math.random() *
            Math.max(
                1,
                maximumTop -
                MIN_HEIGHT
            );


        const bottomHeight =
            boardHeight -
            topHeight -
            GAP_SIZE;


        const top =
            document.createElement(
                "div"
            );


        const bottom =
            document.createElement(
                "div"
            );


        const colors = [
            "burgundy",
            "teal",
            "olive"
        ];


        const randomColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        top.className =
            "obstacle top " +
            randomColor;


        bottom.className =
            "obstacle bottom " +
            randomColor;


        top.style.height =
            topHeight + "px";


        bottom.style.height =
            bottomHeight + "px";


        const startingX =
            board.clientWidth;


        top.style.left =
            startingX + "px";


        bottom.style.left =
            startingX + "px";


        board.appendChild(top);

        board.appendChild(bottom);


        obstacles.push({

            top: top,

            bottom: bottom,

            x: startingX,

            scored: false

        });

    }


    /* =====================================
       COLLISION
       ===================================== */

    function collision(
        first,
        second
    ) {

        return (

            first.left <
            second.right &&

            first.right >
            second.left &&

            first.top <
            second.bottom &&

            first.bottom >
            second.top

        );

    }


    function checkCollision(
        obstacle
    ) {

        const playerRect =
            player.getBoundingClientRect();


        const topRect =
            obstacle.top
                .getBoundingClientRect();


        const bottomRect =
            obstacle.bottom
                .getBoundingClientRect();


        return (

            collision(
                playerRect,
                topRect
            )

            ||

            collision(
                playerRect,
                bottomRect
            )

        );

    }


    /* =====================================
       GAME LOOP
       ===================================== */

    function gameLoop() {

        if (!running) return;


        /* GRAVITY */

        velocity += GRAVITY;

        playerY += velocity;


        player.style.top =
            playerY + "px";


        /* PLAYER ROTATION */

        const rotation =
            Math.max(
                -20,
                Math.min(
                    75,
                    velocity * 3
                )
            );


        player.style.transform =
            `rotate(${rotation}deg)`;


        /* MOVE OBSTACLES */

        for (
            const obstacle of obstacles
        ) {

            obstacle.x -=
                OBSTACLE_SPEED;


            obstacle.top.style.left =
                obstacle.x + "px";


            obstacle.bottom.style.left =
                obstacle.x + "px";


            /* SCORE */

            if (

                !obstacle.scored &&

                obstacle.x +
                obstacle.top.offsetWidth
                <
                player.offsetLeft

            ) {

                obstacle.scored = true;

                score++;


                scoreElement.textContent =
                    score;

            }


            /* COLLISION */

            if (
                checkCollision(
                    obstacle
                )
            ) {

                endGame();

                return;

            }

        }


        /* REMOVE OLD OBSTACLES */

        obstacles =
            obstacles.filter(
                obstacle => {

                    if (

                        obstacle.x +
                        obstacle.top.offsetWidth
                        <
                        0

                    ) {

                        obstacle.top.remove();

                        obstacle.bottom.remove();

                        return false;

                    }


                    return true;

                }
            );


        /* TOP / BOTTOM COLLISION */

        if (

            playerY < 0 ||

            playerY +
            player.offsetHeight
            >
            board.clientHeight

        ) {

            endGame();

            return;

        }


        animationFrame =
            requestAnimationFrame(
                gameLoop
            );

    }


    /* =====================================
       END GAME
       ===================================== */

    function endGame() {

        if (!running) return;


        running = false;


        clearInterval(
            obstacleTimer
        );


        cancelAnimationFrame(
            animationFrame
        );


        finalScoreElement.textContent =
            score;


        /* SAVE BEST SCORE */

        if (score > best) {

            best = score;


            localStorage.setItem(
                "kFlyBest",
                best
            );


            bestElement.textContent =
                best;

        }


        gameOver.classList.remove(
            "hidden"
        );

    }


    /* =====================================
       START BUTTON
       ===================================== */

    startButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            startGame();

        }
    );


    /* =====================================
       RESTART BUTTON
       ===================================== */

    restartButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            startGame();

        }
    );


    /* =====================================
       MOUSE / TOUCH
       ===================================== */

    board.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target ===
                startButton
            ) return;


            if (
                event.target ===
                restartButton
            ) return;


            if (running) {

                flap();

            }

        }
    );


    /* =====================================
       KEYBOARD
       ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.code !==
                "Space"
            ) return;


            event.preventDefault();


            if (running) {

                flap();

            } else {

                startGame();

            }

        }
    );


    /* =====================================
       INITIAL POSITION
       ===================================== */

    resetPlayer();

})();
