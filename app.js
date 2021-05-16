document.addEventListener('DOMContentLoaded' , () => {
    const seahorse = document.querySelector('.seahorse')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let seahorseLeft = 220
    let seahorseBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    function startGame() {
        seahorseBottom -= gravity
        seahorse.style.bottom = seahorseBottom + 'px'
        seahorse.style.left = seahorseLeft + 'px'
    }
    let timerId = setInterval(startGame, 20)

    // With this function our seahorse will jump just with the spacebar
    function control(e) {
        if(e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        // every time we push jump we add 50px to our seahorse and we cannot overpass 500px
        if (seahorseBottom < 500) seahorseBottom += 50
        seahorse.style.bottom = seahorseBottom + 'px'
        console.log(seahorseBottom)
    }
    document.addEventListener('keyup', control)


    function generateObstacle() {
        let obstacleLeft = 500
        // our obstacle height will changue randomly during the game
        let randomHeight = Math.random() * 60 
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'


        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if(obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (
                obstacleLeft > 200 && obstacleLeft < 280 && seahorseLeft === 220 && (seahorseBottom < obstacleBottom + 152 || seahorseBottom > obstacleBottom + gap - 200) ||
                seahorseBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }

        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()



    function gameOver() {
        clearInterval(timerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
    }
})