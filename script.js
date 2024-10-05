// -------- SPACE INVADERS ----------

let enemies = {

    enemy01: [],
    enemy02: [],
    enemy03: [],

}

let asteroidsRow1 = ["121", "122", "123", "124", "125", "126", "127"]
let asteroidsRow2 = ["121", "122", "123", "124", "125", "126", "127"]
let asteroidsRow3 = ["121", "122", "123", "124", "125", "126", "127"]

let gargamel = []
let gargamelHealth = 20
let gargamelCoor = ""

let walls = []
let wallsHitBox = []

let wallDisplay = '<img class="cellElement" src="images/stoneWall.png"></img>'

let yesHit1 = ""

let yesHit2 = ""

let yesHit3 = ""

let score = 0

let scoreDisplay = document.getElementById("score")

let targetCount = 0

let rocket = [3, 4]

let rocketCoordinates = rocket[0] + "" + rocket[1] 

let rocketCell = document.getElementById(rocketCoordinates)

let rocketDisplay = '<img class="cellElement" src="images/rocket.png"></img>'

rocketCell.innerHTML = rocketDisplay

let keyPress = ""

document.body.addEventListener("keydown", (ev) => {

  if(ev.key == "ArrowLeft") {keyPress = "left"; moveRocket()}

  if(ev.key == "ArrowRight") {keyPress = "right"; moveRocket()}

  if(ev.key == " ") {keyPress = " "; pewpew()}

  if(ev.key == "ArrowUp") {keyPress = "ArrowUp"; superLazerShoot()}

  }

)

let debugButton = document.getElementById("debug")
function debug () {
    console.log(enemies.enemy02)
}
debugButton.addEventListener("click", debug)


let startButton = document.getElementById("start")
let gameRunning = 0
function startGame () {

    if (gameRunning == 0) {
        
        startNewLevel()
        let audio = new Audio("sounds/levelStart.mp3")
        audio.play()
        gameRunning = 1
        
    }
}
startButton.addEventListener("click", startGame)



// --------- MOVEMENT -----------

// array called rocket which has an x and y element

// the cell corresponding to the value of rocket will display the rocket

// when an arrow key is pressed the value of the corresponding x or y 
// elements change accordingly

// display rocket at new coordinates, stop displaying old



function moveRocket () {

    if (keyPress == "left") {

        if(rocket[1] > 1) {

            rocketCell.innerHTML = ""
            rocket[1]--
            rocketCoordinates = rocket[0] + "" + rocket[1] 
            rocketCell = document.getElementById(rocketCoordinates)
            rocketCell.innerHTML = rocketDisplay

        }

    }

    if (keyPress == "right") {

        if(rocket[1] < 7) {

            rocketCell.innerHTML = ""
            rocket[1]++
            rocketCoordinates = rocket[0] + "" + rocket[1] 
            rocketCell = document.getElementById(rocketCoordinates)
            rocketCell.innerHTML = rocketDisplay

        }

    
    }
}



// --------- GUN ---------

// detect when spacebar is hit

// create array called bullet which = rocket coordinates but
// add 1 to the y element

// display explosion

//   whack a mole timer function

// use setTimeout (length bullet takes per cell) 

//   if bullet y value is == to top cell, stop here

// if bullet y value is less than top cell add 1 to y

// if new bullet coordinates == enemy coordinates, kill enemy,

// display bullet at new coordinates

// stop displaying in old cell

// call function again

pewpewCooldown = 0

function pewpew () {

    let shootCell = rocketCoordinates

    let wallAbove = wallsHitBox.find(findWall)

            function findWall (item) {
                return item == shootCell
            }

    if (pewpewCooldown == 0 && wallAbove != shootCell) {

        pewpewCooldown = 1

        let audio = new Audio("sounds/laser.mp3")
        audio.play()

        let lazer = []

        lazer.push(rocket[0])
        lazer.push(rocket[1])

        lazer[0]++

        let lazerCoordinates = lazer[0] + "" + lazer[1]



       let hitCheck = setInterval(checkHit, 20)

        function checkHit () {

            i = enemies.enemy01.findIndex(findEnemy1)
            yesHit1 = enemies.enemy01.find(findEnemy1)

            function findEnemy1 (item) {
                return item == lazerCoordinates
            }

            g = enemies.enemy02.findIndex(findEnemy2)
            yesHit2 = enemies.enemy02.find(findEnemy2)

            function findEnemy2 (item) {
                return item == lazerCoordinates
            }

            m = enemies.enemy03.findIndex(findEnemy3)
            yesHit3 = enemies.enemy03.find(findEnemy3)

            function findEnemy3 (item) {
                return item == lazerCoordinates
            }

            l = asteroids.findIndex(findAsteroid)

            function findAsteroid (item) {
                return item == lazerCoordinates
            }

            n = targets.findIndex(findTarget)

            function findTarget (item) {
                return item == lazerCoordinates
            }

            if (lazerCoordinates == gargamelCoor) {

                clearInterval(hitCheck)

                gargamelCell = document.getElementById(gargamelCoor)
                gargamelCell.innerHTML = gargamelDisplay

                gargamelHealth--
                gargamelHealthBar()
                let hitSound = new Audio("sounds/gargamelHit.mp3")
                hitSound.play()
                 lazer = []
                lazerCoordinates = ""
            
            }


            if (lazerCoordinates == enemies.enemy01[i]) {

                clearInterval(hitCheck)

                killEnemy1()
                lazer = []
                lazerCoordinates = ""
                enemies.enemy01[i] = ""
                
            }

            if (lazerCoordinates == enemies.enemy02[g]) {

                clearInterval(hitCheck)

                killEnemy2()
                lazer = []
                lazerCoordinates = ""
                enemies.enemy02[g] = ""
                
            }

            if (lazerCoordinates == enemies.enemy03[m]) {

                clearInterval(hitCheck)

                killEnemy3()
                lazer = []
                lazerCoordinates = ""
                enemies.enemy03[m] = ""
                
            }

            if (lazerCoordinates == asteroids[l]) {

                clearInterval(hitCheck)

                asteroidHitCoor = asteroidCoor
                asteroidHit()
                asteroidCoor = ""
                lazer = []
                lazerCoordinates = ""
                asteroids = []
                
            }

            if (lazerCoordinates == targets[n]) {

                clearInterval(hitCheck)

                targetCount++

                targets[n] = ""
                let targetSound = new Audio("sounds/targetHit.mp3")
                targetSound.play()
                lazer = []
                let targetHitCell = document.getElementById(lazerCoordinates)
                let targetHitDisplay =  '<img class="lazer" src="images/explosion.png"></img>'
                targetHitCell.innerHTML = targetHitDisplay
                lazerCoordinates = "miss"

        
               
                score = score + 120
                scoreDisplay.innerHTML = "SCORE: " + score
                
                

            }
        }


        let lazerCell = document.getElementById(lazerCoordinates)

        let lazerDisplay = '<img class="lazer" src="images/lazer.png"></img>'
        let gunfireDisplay = '<img class="gunfire" src="images/gunfire.png"></img>'

        lazerCell.innerHTML = gunfireDisplay

        setTimeout(lazerTravel, 200)
        setTimeout(lazerCooldown, 400)

        function lazerCooldown () {
            pewpewCooldown = 0
        }

        function lazerTravel () {

            if (lazer[0] < 12) {

                lazerCell.innerHTML = ""
                lazer[0]++                
                lazerCoordinates = lazer[0] + "" + lazer[1]
                lazerCell = document.getElementById(lazerCoordinates)
                lazerCell.innerHTML = lazerDisplay
                setTimeout(lazerTravel, 200)
                
            }
            
            else {

                lazerCell.innerHTML = ""
                lazer = []
                lazerCoordinates = "miss"
                score = score - 20
                scoreDisplay.innerHTML = "SCORE: " + score
            }

        }

    }

}



// ---------- POWER UP ------------

// super lazer, lights up entire collumn

// asteroid hit should call super lazer

// detect when player presses shoot button

// superlazer = array, collumn coor

// check if any enemys are on collumn

// kill

let superLazer = []

let superLazerDisplay = '<img class="superLazer" src="images/superLazer.png"></img>'

let powerUpActive = 0

function superLazerShoot () {

    let shootCell = rocketCoordinates

    let wallAbove = wallsHitBox.find(findWall)

            function findWall (item) {
                return item == shootCell
            }

    if (powerUpActive == 1 && wallAbove != shootCell) {

        powerUpActive = 0

        let audio = new Audio("sounds/superLazer.mp3")
            audio.play()

        for (let i = 0; i < 9; i++) {

            let superLazerCoor = i + 4 + "" + rocket[1]
            superLazer.push(superLazerCoor)
            let superLazerCell = document.getElementById(superLazerCoor)
            superLazerCell.innerHTML = superLazerDisplay    
          
        }

        setTimeout(superLazerOff, 2000)

    } 

    let hitCheck = setInterval(checkHit, 20)

    function checkHit () {

        for (let i = 0; i < superLazer.length; i++) {

            let superLazerCheck = superLazer[i]

            g = enemies.enemy01.findIndex(findEnemy1)
            yesHit1 = enemies.enemy01.find(findEnemy1)
           

            function findEnemy1 (item) {
                return item == superLazerCheck

            }
        
            if (superLazerCheck == enemies.enemy01[g]) {

                killEnemy1()
                enemies.enemy01[g] = ""
            
            }

        }


        for (let i = 0; i < superLazer.length; i++) {

            let superLazerCheck = superLazer[i]

            g = enemies.enemy02.findIndex(findEnemy2)
            yesHit2 = enemies.enemy02.find(findEnemy2)
           

            function findEnemy2 (item) {
                return item == superLazerCheck

            }
        
            if (superLazerCheck == enemies.enemy02[g]) {

                killEnemy2()
                enemies.enemy02[g] = ""
            
            }

            

        }

        for (let i = 0; i < superLazer.length; i++) {

            let superLazerCheck = superLazer[i]

            g = enemies.enemy03.findIndex(findEnemy3)
            yesHit3 = enemies.enemy03.find(findEnemy3)
           

            function findEnemy3 (item) {
                return item == superLazerCheck

            }
        
            if (superLazerCheck == enemies.enemy03[g]) {

                killEnemy3()
                enemies.enemy03[g] = ""
            
            }

            

        }

        

        for (let i = 0; i < superLazer.length; i++) {

            let superLazerCheck = superLazer[i]

           let g = asteroidsRow1.findIndex(findRow1)
           
            function findRow1 (item) {
                return item == superLazerCheck

            }
        
            if (superLazerCheck == asteroidsRow1[g]) {

                asteroidPass = 1

                for (let n = 0; n < asteroidsRow1.length; n++) {
                
                    let hitAsteroidCell = document.getElementById(asteroidsRow1[n])
                    asteroidsRow1[n] = ""

                    hitAsteroidCell.innerHTML = '<img class="lazer" src="images/explosion.png"></img>'
            
                    let audio = new Audio("sounds/explosion.mp3")
                    audio.play()

                    setTimeout(explodeOff, 2000)

                    function explodeOff () {

                        hitAsteroidCell.innerHTML = ""
                    }
                }

                for (let n = 0; n < asteroidsRow2.length; n++) {
                
                    let hitAsteroidCell = document.getElementById(asteroidsRow2[n])
                    asteroidsRow2[n] = ""

                    hitAsteroidCell.innerHTML = '<img class="lazer" src="images/explosion.png"></img>'
            
                    let audio = new Audio("sounds/explosion.mp3")
                    audio.play()

                    setTimeout(explodeOff, 2000)

                    function explodeOff () {

                        hitAsteroidCell.innerHTML = ""
                    }
                }

                for (let n = 0; n < asteroidsRow3.length; n++) {
                
                    let hitAsteroidCell = document.getElementById(asteroidsRow3[n])
                    asteroidsRow3[n] = ""

                    hitAsteroidCell.innerHTML = '<img class="lazer" src="images/explosion.png"></img>'
            
                    let audio = new Audio("sounds/explosion.mp3")
                    audio.play()

                    setTimeout(explodeOff, 2000)

                    function explodeOff () {

                        hitAsteroidCell.innerHTML = ""
                    }
                }
            }
        }
    }

    function superLazerOff () {

        clearInterval(hitCheck)

        for (let i = 0; i < superLazer.length; i++) {
    
            if (i < 9) {
    
                let superLazerCell = document.getElementById(superLazer[i])
                superLazerCell.innerHTML = ""
            }
    
            else {
    
                let superLazerCell = document.getElementById(superLazer[i])
                superLazerCell.innerHTML = ""
                superLazer = []
    
            }
    
        }
       
    }

}










// ------ ENEMY 1 ---------

// array with enemy coordinates

// display enemey at coordinates

// call move right function

// if x < 15 add 1 to enemy x value, display new coor, moveRIght()
// else - 1 to enemy y value, display new coor, call move left function

// move left is same as move right exept if x > 0, - 1 from x, display

// if enemey coor = lazer coor call kill enemy function -- maybe do this
// inside of laser function

// if enemy y value = 1, call game over.


// create laser array which contains coordinates of all active lasers

let enemy1Counter = -1

function enemyOne () {

    enemy1Counter++

    let enemy1Index = enemy1Counter

    let enemy1 = [12, 1]

    let enemy1Coordinates = enemy1[0] + "" + enemy1[1] 

    let enemy1Cell = document.getElementById(enemy1Coordinates)

    let enemy1Display = '<img class="lazer" src="images/enemy1.png"></img>'

    enemy1Cell.innerHTML = enemy1Display

    enemies.enemy01[enemy1Index] = enemy1Coordinates

    setTimeout(moveRight, 500)

    function moveRight () {

        if (enemies.enemy01[enemy1Index] == enemy1Coordinates) {

            if (enemy1[1] < 7) {

                enemy1Cell.innerHTML = ""
                enemy1[1]++
                enemy1Coordinates = enemy1[0] + "" + enemy1[1]
                enemy1Cell = document.getElementById(enemy1Coordinates)
                enemy1Cell.innerHTML = enemy1Display
                enemies.enemy01[enemy1Index] = enemy1Coordinates
                setTimeout(moveRight, 500)
    
            }

            else {

                if (enemy1[0] > 6) {

                    enemy1Cell.innerHTML = 
                    enemy1[0]--
                    enemy1Coordinates = enemy1[0] + "" + enemy1[1]
                    enemy1Cell = document.getElementById(enemy1Coordinates)
                    enemy1Cell.innerHTML = enemy1Display 
                    enemies.enemy01[enemy1Index] = enemy1Coordinates
                    setTimeout(moveLeft, 500)
                }

                else{youLose()}

            }

        }

    }

    function moveLeft () {

        if (enemies.enemy01[enemy1Index] == enemy1Coordinates) {


            if (enemy1[1] > 1) {

                enemy1Cell.innerHTML = ""
                enemy1[1]--
                enemy1Coordinates = enemy1[0] + "" + enemy1[1]
                enemy1Cell = document.getElementById(enemy1Coordinates)
                enemy1Cell.innerHTML = enemy1Display 
                enemies.enemy01[enemy1Index] = enemy1Coordinates
                setTimeout(moveLeft, 500)
    
            }

            else {

                enemy1Cell.innerHTML = 
                enemy1[0]--
                enemy1Coordinates = enemy1[0] + "" + enemy1[1]
                enemy1Cell = document.getElementById(enemy1Coordinates)
                enemy1Cell.innerHTML = enemy1Display 
                enemies.enemy01[enemy1Index] = enemy1Coordinates
                setTimeout(moveRight, 500)
            }

        }

    }

}




function killEnemy1 () {
    
    let hitCoordinates = yesHit1
    let hitCell = document.getElementById(hitCoordinates)
    let hitDisplay =  '<img class="lazer" src="images/explosion.png"></img>'
    hitCell.innerHTML = hitDisplay
    let audio = new Audio("sounds/explosion.mp3")
    audio.play()

    score = score + 120
    scoreDisplay.innerHTML = "SCORE: " + score

}






// -------- ENEMY 2 -------

let enemy2Counter = -1

function enemyTwo () {

    enemy2Counter++

    let enemy2Index = enemy2Counter

    let enemy2 = [12, 1]

    let enemy2Coordinates = enemy2[0] + "" + enemy2[1] 

    let enemy2Cell = document.getElementById(enemy2Coordinates)

    let enemy2Display = '<img class="lazer" src="images/enemy2.png"></img>'

    enemy2Cell.innerHTML = enemy2Display

    enemies.enemy02[enemy2Index] = enemy2Coordinates

    setTimeout(moveRight, 250)

    function moveRight () {

        if (enemies.enemy02[enemy2Index] == enemy2Coordinates) {

            if (enemy2[1] < 7) {

                enemy2Cell.innerHTML = ""
                enemy2[1]++
                enemy2Coordinates = enemy2[0] + "" + enemy2[1]
                enemy2Cell = document.getElementById(enemy2Coordinates)
                enemy2Cell.innerHTML = enemy2Display
                enemies.enemy02[enemy2Index] = enemy2Coordinates
                setTimeout(moveRight, 250)
    
            }

            else {

                if (enemy2[0] > 6) {

                    enemy2Cell.innerHTML = 
                    enemy2[0]--
                    enemy2Coordinates = enemy2[0] + "" + enemy2[1]
                    enemy2Cell = document.getElementById(enemy2Coordinates)
                    enemy2Cell.innerHTML = enemy2Display 
                    enemies.enemy02[enemy2Index] = enemy2Coordinates
                    setTimeout(moveLeft, 250)
                }

                else {youLose()}

            }

        }

    }

    function moveLeft () {

        if (enemies.enemy02[enemy2Index] == enemy2Coordinates) {


            if (enemy2[1] > 1) {

                enemy2Cell.innerHTML = ""
                enemy2[1]--
                enemy2Coordinates = enemy2[0] + "" + enemy2[1]
                enemy2Cell = document.getElementById(enemy2Coordinates)
                enemy2Cell.innerHTML = enemy2Display 
                enemies.enemy02[enemy2Index] = enemy2Coordinates
                setTimeout(moveLeft, 250)
    
            }

            else {

                enemy2Cell.innerHTML = 
                enemy2[0]--
                enemy2Coordinates = enemy2[0] + "" + enemy2[1]
                enemy2Cell = document.getElementById(enemy2Coordinates)
                enemy2Cell.innerHTML = enemy2Display 
                enemies.enemy02[enemy2Index] = enemy2Coordinates
                setTimeout(moveRight, 250)
            }

        }

    }

}




function killEnemy2 () {
    
    let hitCoordinates = yesHit2
    let hitCell = document.getElementById(hitCoordinates)
    let hitDisplay =  '<img class="lazer" src="images/explosion.png"></img>'
    hitCell.innerHTML = hitDisplay
    let audio = new Audio("sounds/explosion.mp3")
    audio.play()

    score = score + 220
    scoreDisplay.innerHTML = "SCORE: " + score

}




// -------- ENEMY 3 ----------

let enemy3Counter = -1

function enemyThree () {

    enemy3Counter++

    let enemy3Index = enemy3Counter

    let enemy3 = [12, 1]

    let enemy3Coordinates = enemy3[0] + "" + enemy3[1] 

    let enemy3Cell = document.getElementById(enemy3Coordinates)

    let enemy3Display = '<img class="lazer" src="images/enemy3.png"></img>'

    enemy3Cell.innerHTML = enemy3Display

    enemies.enemy03[enemy3Index] = enemy3Coordinates

    setTimeout(moveRight, 500)

    function moveRight () {

        if (enemies.enemy03[enemy3Index] == enemy3Coordinates) {

            if (enemy3[1] < 7) {

                genRandStep()

                enemy3Cell.innerHTML = ""
                enemy3[1]++
                enemy3Coordinates = enemy3[0] + "" + enemy3[1]
                enemy3Cell = document.getElementById(enemy3Coordinates)
                enemy3Cell.innerHTML = enemy3Display
                enemies.enemy03[enemy3Index] = enemy3Coordinates
                setTimeout(moveRight, 500)
    
            }

            else {

                if (enemy3[0] > 6) {

                    enemy3Cell.innerHTML = 
                    enemy3[0]--
                    enemy3Coordinates = enemy3[0] + "" + enemy3[1]
                    enemy3Cell = document.getElementById(enemy3Coordinates)
                    enemy3Cell.innerHTML = enemy3Display 
                    enemies.enemy03[enemy3Index] = enemy3Coordinates
                    setTimeout(moveLeft, 500)

                }

                else {youLose()}

            }

        }

    }

    function moveLeft () {

        if (enemies.enemy03[enemy3Index] == enemy3Coordinates) {


            if (enemy3[1] > 1) {

                genRandStep()

                enemy3Cell.innerHTML = ""
                enemy3[1]--
                enemy3Coordinates = enemy3[0] + "" + enemy3[1]
                enemy3Cell = document.getElementById(enemy3Coordinates)
                enemy3Cell.innerHTML = enemy3Display 
                enemies.enemy03[enemy3Index] = enemy3Coordinates
                setTimeout(moveLeft, 500)
    
            }

            else {

                enemy3Cell.innerHTML = ""
                enemy3[0]--
                enemy3Coordinates = enemy3[0] + "" + enemy3[1]
                enemy3Cell = document.getElementById(enemy3Coordinates)
                enemy3Cell.innerHTML = enemy3Display 
                enemies.enemy03[enemy3Index] = enemy3Coordinates
                setTimeout(moveRight, 500)
            }

        }

    }

    function genRandStep () {

        let int = getRandomInt(0, 9)
    
        function getRandomInt (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
        if (int == 0) {
    
            attack()
        }
    }
    

    function attack () {

        let audio = new Audio("sounds/bullet.mp3")
        audio.play()

        let bullet = []
        
        bullet.push(enemy3[0] - 1)
        bullet.push(enemy3[1])

        let bulletCoor = bullet[0] + "" + bullet[1]
        let bulletCell = document.getElementById(bulletCoor)
        let bulletDisplay = '<img class="bullet" src="images/bullet.png"></img>'
        bulletCell.innerHTML = bulletDisplay

        setTimeout(bulletTravel, 200)

        let hitCheck = setInterval(checkHit, 20)

        function checkHit () {
 
            if (bulletCoor == rocketCoordinates) {

                youLose()

                let audio = new Audio("sounds/explosion.mp3")
                audio.play()
            }
        }

        function bulletTravel () {

            if (bullet[0] > 1) {

                bulletCell.innerHTML = ""

                bullet[0]--
                bulletCoor = bullet[0] + "" + bullet[1]
                bulletCell = document.getElementById(bulletCoor)

                bulletCell.innerHTML = bulletDisplay

                setTimeout(bulletTravel, 200)
                
            }

            else {
                
                bulletCell.innerHTML = ""
                bullet = []
                bulletCoor = ""
            }

        
        }




    
       
    }
    

}






function killEnemy3 () {
    
    let hitCoordinates = yesHit3
    let hitCell = document.getElementById(hitCoordinates)
    let hitDisplay =  '<img class="lazer" src="images/explosion.png"></img>'
    hitCell.innerHTML = hitDisplay
    let audio = new Audio("sounds/explosion.mp3")
    audio.play()

    score = score + 120
    scoreDisplay.innerHTML = "SCORE: " + score

}

//enemyThree()

//setTimeout(enemyThree, 1000)
//setTimeout(enemyThree, 2000)





// use enemy1 as base

// change ALL elements from enemy1 to enemey3

// add new "genRandStep" function and call it every step the enemy takes

// genRandStep randomly generates a number from 0 - 4 (for example), if
// that number == 0, call the function "attack"

// --- attack ---

// *** similar to lazer funtion ***

// generates a bullet the cell below the enmey. bullet travels down 






// ---------- WALL ----------

function wall (wallCoor, wallHitBox) {
    let wallCell = document.getElementById(wallCoor)
    wallCell.innerHTML = wallDisplay
    wallsHitBox.push(wallHitBox)
    walls.push(wallCoor)

}



// -------- ASTEROID ---------

let asteroidCoor = ""
let asteroidHitCoor = ""
let asteroids = []

function asteroid (row, collumn) {

let asteroidY = collumn
let asteroidX = row
asteroidCoor = asteroidX + "" + asteroidY
asteroids[0] = asteroidCoor
let asteroidCell = document.getElementById(asteroidCoor) 
asteroidCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

setTimeout(asteroidTravel, 500)

    function asteroidTravel () {

        if (asteroidCoor != "") {

        if (collumn == 7) {

            if (asteroidY > 1) {

                asteroidCell.innerHTML = ""
                asteroidY--
                asteroidCoor = asteroidX + "" + asteroidY
                asteroidCell = document.getElementById(asteroidCoor)
                asteroidCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'
                asteroids[0] = asteroidCoor

                setTimeout(asteroidTravel, 500)

            }

            else{

                asteroidCell.innerHTML = ""
                asteroidCoor = ""
                asteroids[0] = ""
            
            }
        
        }

        if (collumn == 1) {

            if (asteroidY < 7) {

                asteroidCell.innerHTML = ""
                asteroidY++
                asteroidCoor = asteroidX + "" + asteroidY
                asteroidCell = document.getElementById(asteroidCoor)
                asteroidCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'
                asteroids[0] = asteroidCoor

                setTimeout(asteroidTravel, 500)

            }

            else{

                asteroidCell.innerHTML = ""
                asteroidCoor = ""
                asteroids[0] = ""
            
            }

        }

    }

}

}

function asteroidHit () {

    score = score + 520
    scoreDisplay.innerHTML = "SCORE: " + score

    powerUpActive = 1

   let prompt = document.getElementById("prompt")
   prompt.innerHTML = "Press 'UP' for Super Laser"
   prompt.classList.add("prompt")
   
   setTimeout(promptOff, 1500)

   function promptOff () {
    prompt.innerHTML = ""
    prompt.classList.remove("prompt")
   }

    let asteroidHitCell = document.getElementById(asteroidHitCoor)
    let hitDisplay =  '<img class="lazer" src="images/explosion.png"></img>'
    asteroidHitCell.innerHTML = hitDisplay
    let audio = new Audio("sounds/explosion.mp3")
    audio.play()
}

//asteroid (7, 7)


// SCOREBOARD

// score variable, display on screen

// if event happens change score accordingly, display score

// event ideas: Kill 100pts, miss -10pts





// ------------- BOUNS LEVEL ------------

// work kind of like whack a mole

// targets pop up on screen for a couple seconds, try to hit as 
// many as possible in 30 seconds

// target array that stores all target coor

// randomly generate x and y values

// display values on screen

// detect if bullet hits target

let targets = []

let targetDisplay =  '<img class="lazer" src="images/target.png"></img>'

function target () {

    let targetX = getRandomInt(1, 7)
    let targetY = getRandomInt(6, 12)

    function getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let targetCoor = targetY + "" + targetX
    let targetCell = document.getElementById(targetCoor)
    targetCell.innerHTML = targetDisplay
    targets.push(targetCoor)

    setTimeout(targetOff, 3000)

    function targetOff () {

        i = targets.findIndex(findTarget)
            function findTarget (item) {
                return item == targetCoor
            }

        targets[i] = ""
        targetCell.innerHTML = ""

    
    }
}

//setInterval(target, 1000)






let showLevel = document.getElementById("showLevel")

// ---------------- LEVEL 1 ---------------

function level1 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 1"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 10 times enemy 1

    setTimeout(enemyOne, 2000)
    setTimeout(enemyOne, 3000)
    setTimeout(enemyOne, 4000)
    setTimeout(enemyOne, 5000)
    setTimeout(enemyOne, 6000)
    setTimeout(enemyOne, 7000)
    setTimeout(enemyOne, 8000)
    setTimeout(enemyOne, 9000)
    setTimeout(enemyOne, 10000)
    setTimeout(enemyOne, 11000)

    setTimeout(a, 11000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelOneOver, 1000)
    }

    

    function levelOneOver () {



        if (enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == "" && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == "") {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }


}



// ---------- LEVEL 2 ------------

function level2 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 2"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 20 times enemy 1

    setTimeout(enemyOne, 2000)
    setTimeout(enemyOne, 3000)
    setTimeout(enemyOne, 4000)
    setTimeout(enemyOne, 5000)
    setTimeout(enemyOne, 6000)
    setTimeout(enemyOne, 7000)
    setTimeout(enemyOne, 8000)
    setTimeout(enemyOne, 9000)
    setTimeout(enemyOne, 10000)
    setTimeout(enemyOne, 11000)

    setTimeout(enemyOne, 12000)
    setTimeout(enemyOne, 13000)
    setTimeout(enemyOne, 14000)
    setTimeout(enemyOne, 15000)
    setTimeout(enemyOne, 16000)
    setTimeout(enemyOne, 17000)
    setTimeout(enemyOne, 18000)
    setTimeout(enemyOne, 19000)
    setTimeout(enemyOne, 20000)
    setTimeout(enemyOne, 21000)

    setTimeout(callAsteroid, 10000)

    function callAsteroid() {
        asteroid(7, 7)
    }

    setTimeout(a, 21000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelTwoOver, 1000)
    }

    

    function levelTwoOver () {



        if (enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == "" && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == ""  && enemies.enemy01[10] == "" && enemies.enemy01[11] == "" && enemies.enemy01[12] == "" && enemies.enemy01[13] == "" && enemies.enemy01[14] == "" && enemies.enemy01[15] == "" && enemies.enemy01[16] == "" && enemies.enemy01[17] == "" && enemies.enemy01[18] == "" && enemies.enemy01[19] == "") {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }


}

// ---------- LEVEL 3 ------------

// same as level 2 but with barriers 

function level3 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 3"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 20 times enemy 1

    setTimeout(wall("42", "32"), 2000)
    setTimeout(wall("43", "33"), 2000)
    setTimeout(wall("45", "35"), 2000)
    setTimeout(wall("46", "36"), 2000)

    setTimeout(enemyOne, 2000)
    setTimeout(enemyOne, 3000)
    setTimeout(enemyOne, 4000)
    setTimeout(enemyOne, 5000)
    setTimeout(enemyOne, 6000)
    setTimeout(enemyOne, 7000)
    setTimeout(enemyOne, 8000)
    setTimeout(enemyOne, 9000)
    setTimeout(enemyOne, 10000)
    setTimeout(enemyOne, 11000)

    setTimeout(enemyOne, 12000)
    setTimeout(enemyOne, 13000)
    setTimeout(enemyOne, 14000)
    setTimeout(enemyOne, 15000)
    setTimeout(enemyOne, 16000)
    setTimeout(enemyOne, 17000)
    setTimeout(enemyOne, 18000)
    setTimeout(enemyOne, 19000)
    setTimeout(enemyOne, 20000)
    setTimeout(enemyOne, 21000)

    setTimeout(a, 21000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelThreeOver, 1000)
    }

    

    function levelThreeOver () {



        if (enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == "" && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == ""  && enemies.enemy01[10] == "" && enemies.enemy01[11] == "" && enemies.enemy01[12] == "" && enemies.enemy01[13] == "" && enemies.enemy01[14] == "" && enemies.enemy01[15] == "" && enemies.enemy01[16] == "" && enemies.enemy01[17] == "" && enemies.enemy01[18] == "" && enemies.enemy01[19] == "") {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }


}

// ---------- LEVEL 4 ------------

function level4 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 4"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 10 new enimes 2x speed

    setTimeout(callAsteroid, 3000)
    function callAsteroid () {
        asteroid (7, 1)
    }

    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)
    setTimeout(enemyTwo, 4500)
    setTimeout(enemyTwo, 5000)
    setTimeout(enemyTwo, 5500)
    setTimeout(enemyTwo, 6000)
    setTimeout(enemyTwo, 6500)

   

    setTimeout(a, 6500)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelFourOver, 1000)
    }

    

   function levelFourOver () {



        if (enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy02[5] == "" && enemies.enemy02[6] == "" && enemies.enemy02[7] == "" && enemies.enemy02[8] == "" && enemies.enemy02[9] == "") {
            endLevel()
            clearInterval(endCheck)
            
        }
 
   }

}

// ---------- LEVEL 5 ------------

function level5 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 5"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 5 x enemy2 + 15 x enemy1 + walls

    setTimeout(wall("41", "31"), 2000)
    setTimeout(wall("47", "37"), 2000)
    setTimeout(wall("42", "32"), 2000)
    setTimeout(wall("46", "36"), 2000)

    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)

    setTimeout(enemyOne, 5000)
    setTimeout(enemyOne, 6000)
    setTimeout(enemyOne, 7000)
    setTimeout(enemyOne, 8000)
    setTimeout(enemyOne, 9000)
    setTimeout(enemyOne, 10000)
    setTimeout(enemyOne, 11000)
    setTimeout(enemyOne, 12000)
    setTimeout(enemyOne, 13000)
    setTimeout(enemyOne, 14000)

    setTimeout(enemyOne, 15000)
    setTimeout(enemyOne, 16000)
    setTimeout(enemyOne, 17000)
    setTimeout(enemyOne, 18000)
    setTimeout(enemyOne, 19000)
   


   

    setTimeout(a, 19000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelFiveOver, 1000)
    }

    

   function levelFiveOver () {



        if (enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == ""  && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == ""  && enemies.enemy01[10] == "" && enemies.enemy01[11] == "" && enemies.enemy01[12] == "" && enemies.enemy01[13] == "" && enemies.enemy01[14] == "") {
            endLevel()
            clearInterval(endCheck)
            
        }
 
   }

}

// ---------BOUNS LEVEL -----------

function bonusLevel () {

    gameRunning = 1

    showLevel.innerHTML = "BOUNS"
    showLevel.classList.add("showLevel")
    let prompt = document.getElementById("prompt")

    setTimeout(showLevelOff, 2000)
    setTimeout(showPrompt, 2500)
    setTimeout(promptOff, 4000)

    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    function showPrompt () {
        prompt.innerHTML = "Shoot as many targets as you can!"
        prompt.classList.add("prompt")

    }

    function promptOff () {
        prompt.innerHTML = ""
        prompt.classList.remove("prompt")

    }


    setTimeout(target, 4000)
    setTimeout(target, 5000)
    setTimeout(target, 6000)
    setTimeout(target, 7000)
    setTimeout(target, 8000)
    setTimeout(target, 9000)
    setTimeout(target, 10000)
    setTimeout(target, 11000)
    setTimeout(target, 12000)
    setTimeout(target, 13000)

    setTimeout(target, 14000)
    setTimeout(target, 15000)
    setTimeout(target, 16000)
    setTimeout(target, 17000)
    setTimeout(target, 18000)
    setTimeout(target, 19000)
    setTimeout(target, 20000)
    setTimeout(target, 21000)
    setTimeout(target, 22000)
    setTimeout(target, 23000)

    setTimeout(target, 24000)
    setTimeout(target, 25000)
    setTimeout(target, 26000)
    setTimeout(target, 27000)
    setTimeout(target, 28000)
    setTimeout(target, 29000)
    setTimeout(target, 30000)
    setTimeout(target, 31000)
    setTimeout(target, 32000)
    setTimeout(target, 33000)

    setTimeout(endBonus, 36000)

    function endBonus () {

        let audio = new Audio("sounds/pass.mp3")
        audio.play()

        let prompt = document.getElementById("prompt")
        prompt.innerHTML = "You hit " + targetCount + "/30 targets!"
        prompt.classList.add("prompt")
    
        setTimeout(promptOff, 3000)
    
        function promptOff () {
            prompt.innerHTML = ""
            prompt.classList.remove("prompt")
    
        }

        setTimeout(level6, 3000)
        levelCounter++
    }
}



// ---------------- LEVEL 6 ---------------

function level6 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 6"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    // 30 times enemy 2

    setTimeout(callAsteroid, 10000)
    function callAsteroid () {
        asteroid (7, 7)
    }

    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)
    setTimeout(enemyTwo, 4500)
    setTimeout(enemyTwo, 5000)
    setTimeout(enemyTwo, 5500)
    setTimeout(enemyTwo, 6000)
    setTimeout(enemyTwo, 6500)

    setTimeout(enemyTwo, 7000)
    setTimeout(enemyTwo, 7500)
    setTimeout(enemyTwo, 8000)
    setTimeout(enemyTwo, 8500)
    setTimeout(enemyTwo, 9000)
    setTimeout(enemyTwo, 9500)
    setTimeout(enemyTwo, 10000)
    setTimeout(enemyTwo, 11500)
    setTimeout(enemyTwo, 12000)
    setTimeout(enemyTwo, 12500)

    setTimeout(enemyTwo, 13000)
    setTimeout(enemyTwo, 13500)
    setTimeout(enemyTwo, 14000)
    setTimeout(enemyTwo, 14500)
    setTimeout(enemyTwo, 15000)
    setTimeout(enemyTwo, 15500)
    setTimeout(enemyTwo, 16000)
    setTimeout(enemyTwo, 16500)
    setTimeout(enemyTwo, 17000)
    setTimeout(enemyTwo, 17500)

    setTimeout(a, 17500)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelSixOver, 1000)
    }

    

    function levelSixOver () {

        if (enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy02[5] == "" && enemies.enemy02[6] == "" && enemies.enemy02[7] == "" && enemies.enemy02[8] == "" && enemies.enemy02[9] == "" &&
            enemies.enemy02[10] == "" && enemies.enemy02[11] == "" && enemies.enemy02[12] == "" && enemies.enemy02[13] == "" && enemies.enemy02[14] == "" && enemies.enemy02[15] == "" && enemies.enemy02[16] == "" && enemies.enemy02[17] == "" && enemies.enemy02[18] == "" && enemies.enemy02[19] == "" &&
            enemies.enemy02[20] == "" && enemies.enemy02[21] == "" && enemies.enemy02[22] == "" && enemies.enemy02[23] == "" && enemies.enemy02[24] == "" && enemies.enemy02[25] == "" && enemies.enemy02[26] == "" && enemies.enemy02[27] == "" && enemies.enemy02[28] == "" && enemies.enemy02[29] == ""
        )

        {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }


}



// -------- LEVEL 7 ----------

function level7 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 7"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    setTimeout(enemyThree, 2000)
    setTimeout(enemyThree, 3000)
    setTimeout(enemyThree, 4000)
    setTimeout(enemyThree, 5000)
    setTimeout(enemyThree, 6000)

    setTimeout(enemyThree, 7000)
    setTimeout(enemyThree, 8000)
    setTimeout(enemyThree, 9000)
    setTimeout(enemyThree, 10000)
    setTimeout(enemyThree, 11000)

    setTimeout(a, 1100)

    let endCheck = ""

    function a () {
       endCheck = setInterval(levelSevenOver, 1000)
    }

    

    function levelSevenOver () {

        if (enemies.enemy03[0] == "" && enemies.enemy03[1] == "" && enemies.enemy03[2] == "" && enemies.enemy03[3] == "" && enemies.enemy03[4] == "" &&
            enemies.enemy03[5] == "" && enemies.enemy03[6] == "" && enemies.enemy03[7] == "" && enemies.enemy03[8] == "" && enemies.enemy03[9] == "" )
        {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }


}





// -------- level 8 ------------

function level8 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 8"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    setTimeout(callAsteroid1, 10000)
    function callAsteroid1 () {
        asteroid (7, 7)
    }

    setTimeout(callAsteroid1, 25000)
    function callAsteroid1 () {
        asteroid (7, 1)
    }

    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)
    setTimeout(enemyTwo, 4500)
    setTimeout(enemyTwo, 5000)
    setTimeout(enemyTwo, 5500)
    setTimeout(enemyTwo, 6000)
    setTimeout(enemyTwo, 6500)

    setTimeout(enemyThree, 7000)
    setTimeout(enemyThree, 8000)
    setTimeout(enemyThree, 9000)
    setTimeout(enemyThree, 10000)
    setTimeout(enemyThree, 11000)
    setTimeout(enemyThree, 12000)
    setTimeout(enemyThree, 13000)
    setTimeout(enemyThree, 14000)
    setTimeout(enemyThree, 15000)
    setTimeout(enemyThree, 16000)

    setTimeout(enemyOne, 17000)
    setTimeout(enemyOne, 18000)
    setTimeout(enemyOne, 19000)
    setTimeout(enemyOne, 20000)
    setTimeout(enemyOne, 21000)
    setTimeout(enemyOne, 22000)
    setTimeout(enemyOne, 23000)
    setTimeout(enemyOne, 24000)
    setTimeout(enemyOne, 25000)
    setTimeout(enemyOne, 26000)

    setTimeout(a, 26000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelEightOver, 1000)
    }

    

    function levelEightOver () {



        if (enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == "" && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == "" &&
            enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy02[5] == "" && enemies.enemy02[6] == "" && enemies.enemy02[7] == "" && enemies.enemy02[8] == "" && enemies.enemy02[9] == "" && 
            enemies.enemy03[0] == "" && enemies.enemy03[1] == "" && enemies.enemy03[2] == "" && enemies.enemy03[3] == "" && enemies.enemy03[4] == "" && enemies.enemy03[5] == "" && enemies.enemy03[6] == "" && enemies.enemy03[7] == "" && enemies.enemy03[8] == "" && enemies.enemy03[9] == "" 
         ) {
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }



}


// -------- level 9 ------------

function level9 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 9"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    setTimeout(callAsteroid1, 10000)
    function callAsteroid1 () {
        asteroid (7, 7)
    }

    setTimeout(callAsteroid2, 25000)
    function callAsteroid2 () {
        asteroid (7, 1)
    }

    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)
    setTimeout(enemyTwo, 4500)
    setTimeout(enemyTwo, 5000)
    setTimeout(enemyTwo, 5500)
    setTimeout(enemyTwo, 6000)
    setTimeout(enemyTwo, 6500)

    setTimeout(enemyTwo, 7000)
    setTimeout(enemyTwo, 7500)
    setTimeout(enemyTwo, 8000)
    setTimeout(enemyTwo, 8500)
    setTimeout(enemyTwo, 9000)
    setTimeout(enemyTwo, 9500)
    setTimeout(enemyTwo, 10000)
    setTimeout(enemyTwo, 10500)
    setTimeout(enemyTwo, 11000)
    setTimeout(enemyTwo, 11500)

    setTimeout(enemyThree, 12000)
    setTimeout(enemyThree, 13000)
    setTimeout(enemyThree, 13000)
    setTimeout(enemyThree, 15000)
    setTimeout(enemyThree, 16000)
    setTimeout(enemyThree, 17000)
    setTimeout(enemyThree, 18000)
    setTimeout(enemyThree, 19000)
    setTimeout(enemyThree, 20000)
    setTimeout(enemyThree, 21000)

    setTimeout(enemyThree, 22000)
    setTimeout(enemyThree, 23000)
    setTimeout(enemyThree, 24000)
    setTimeout(enemyThree, 25000)
    setTimeout(enemyThree, 26000)
    setTimeout(enemyThree, 27000)
    setTimeout(enemyThree, 28000)
    setTimeout(enemyThree, 29000)
    setTimeout(enemyThree, 30000)
    setTimeout(enemyThree, 31000)

    

    setTimeout(a, 26000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelNineOver, 1000)
    }

    

    function levelNineOver () {



        if (enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy02[5] == "" && enemies.enemy02[6] == "" && enemies.enemy02[7] == "" && enemies.enemy02[8] == "" && enemies.enemy02[9] == "" && 
            enemies.enemy02[10] == "" && enemies.enemy02[11] == "" && enemies.enemy02[12] == "" && enemies.enemy02[13] == "" && enemies.enemy02[14] == "" && enemies.enemy02[15] == "" && enemies.enemy02[16] == "" && enemies.enemy02[17] == "" && enemies.enemy02[18] == "" && enemies.enemy02[19] == "" && 

            enemies.enemy03[0] == "" && enemies.enemy03[1] == "" && enemies.enemy03[2] == "" && enemies.enemy03[3] == "" && enemies.enemy03[4] == "" && enemies.enemy03[5] == "" && enemies.enemy03[6] == "" && enemies.enemy03[7] == "" && enemies.enemy03[8] == "" && enemies.enemy03[9] == "" &&
            enemies.enemy03[10] == "" && enemies.enemy03[11] == "" && enemies.enemy03[12] == "" && enemies.enemy03[13] == "" && enemies.enemy03[14] == "" && enemies.enemy03[15] == "" && enemies.enemy03[16] == "" && enemies.enemy03[17] == "" && enemies.enemy03[18] == "" && enemies.enemy03[19] == "" 
        ) {
          
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }



}




// -------- level 10 ------------

function level10 () {

    gameRunning = 1

    showLevel.innerHTML = "LEVEL 10"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    setTimeout(callAsteroid1, 10000)
    function callAsteroid1 () {
        asteroid (7, 7)
    }

    setTimeout(callAsteroid2, 25000)
    function callAsteroid2 () {
        asteroid (7, 1)
    }

    setTimeout(callAsteroid3, 40000)
    function callAsteroid3 () {
        asteroid (7, 7)
    }


    setTimeout(enemyTwo, 2000)
    setTimeout(enemyTwo, 2500)
    setTimeout(enemyTwo, 3000)
    setTimeout(enemyTwo, 3500)
    setTimeout(enemyTwo, 4000)
    setTimeout(enemyTwo, 4500)
    setTimeout(enemyTwo, 5000)
    setTimeout(enemyTwo, 5500)
    setTimeout(enemyTwo, 6000)
    setTimeout(enemyTwo, 6500)

    setTimeout(enemyTwo, 7000)
    setTimeout(enemyTwo, 7500)
    setTimeout(enemyTwo, 8000)
    setTimeout(enemyTwo, 8500)
    setTimeout(enemyTwo, 9000)
    setTimeout(enemyTwo, 9500)
    setTimeout(enemyTwo, 10000)
    setTimeout(enemyTwo, 10500)
    setTimeout(enemyTwo, 11000)
    setTimeout(enemyTwo, 11500)

    setTimeout(enemyOne, 12000)
    setTimeout(enemyOne, 13000)
    setTimeout(enemyOne, 13000)
    setTimeout(enemyOne, 15000)
    setTimeout(enemyOne, 16000)
    setTimeout(enemyOne, 17000)
    setTimeout(enemyOne, 18000)
    setTimeout(enemyOne, 19000)
    setTimeout(enemyOne, 20000)
    setTimeout(enemyOne, 21000)

    setTimeout(enemyThree, 22000)
    setTimeout(enemyThree, 23000)
    setTimeout(enemyThree, 24000)
    setTimeout(enemyThree, 25000)
    setTimeout(enemyThree, 26000)
    setTimeout(enemyThree, 27000)
    setTimeout(enemyThree, 28000)
    setTimeout(enemyThree, 29000)
    setTimeout(enemyThree, 30000)
    setTimeout(enemyThree, 31000)

    setTimeout(enemyOne, 32000)
    setTimeout(enemyOne, 33000)
    setTimeout(enemyOne, 34000)
    setTimeout(enemyOne, 35000)
    setTimeout(enemyOne, 36000)
    setTimeout(enemyOne, 37000)
    setTimeout(enemyOne, 38000)
    setTimeout(enemyOne, 39000)
    setTimeout(enemyOne, 40000)
    setTimeout(enemyOne, 41000)

    setTimeout(enemyThree, 42000)
    setTimeout(enemyThree, 43000)
    setTimeout(enemyThree, 44000)
    setTimeout(enemyThree, 45000)
    setTimeout(enemyThree, 46000)
    setTimeout(enemyThree, 47000)
    setTimeout(enemyThree, 48000)
    setTimeout(enemyThree, 49000)
    setTimeout(enemyThree, 50000)
    setTimeout(enemyThree, 51000)

    

    setTimeout(a, 26000)
    let endCheck = ""

    function a () {
       endCheck = setInterval(levelTenOver, 1000)
    }

    

    function levelTenOver () {



        if (enemies.enemy01[0] == "" && enemies.enemy01[1] == "" && enemies.enemy01[2] == "" && enemies.enemy01[3] == "" && enemies.enemy01[4] == "" && enemies.enemy01[5] == "" && enemies.enemy01[6] == "" && enemies.enemy01[7] == "" && enemies.enemy01[8] == "" && enemies.enemy01[9] == "" && 
            enemies.enemy01[10] == "" && enemies.enemy01[11] == "" && enemies.enemy01[12] == "" && enemies.enemy01[13] == "" && enemies.enemy01[14] == "" && enemies.enemy01[15] == "" && enemies.enemy01[16] == "" && enemies.enemy01[17] == "" && enemies.enemy01[18] == "" && enemies.enemy01[19] == "" && 
            
            enemies.enemy02[0] == "" && enemies.enemy02[1] == "" && enemies.enemy02[2] == "" && enemies.enemy02[3] == "" && enemies.enemy02[4] == "" && enemies.enemy02[5] == "" && enemies.enemy02[6] == "" && enemies.enemy02[7] == "" && enemies.enemy02[8] == "" && enemies.enemy02[9] == "" && 
            enemies.enemy02[10] == "" && enemies.enemy02[11] == "" && enemies.enemy02[12] == "" && enemies.enemy02[13] == "" && enemies.enemy02[14] == "" && enemies.enemy02[15] == "" && enemies.enemy02[16] == "" && enemies.enemy02[17] == "" && enemies.enemy02[18] == "" && enemies.enemy02[19] == "" && 

            enemies.enemy03[0] == "" && enemies.enemy03[1] == "" && enemies.enemy03[2] == "" && enemies.enemy03[3] == "" && enemies.enemy03[4] == "" && enemies.enemy03[5] == "" && enemies.enemy03[6] == "" && enemies.enemy03[7] == "" && enemies.enemy03[8] == "" && enemies.enemy03[9] == "" &&
            enemies.enemy03[10] == "" && enemies.enemy03[11] == "" && enemies.enemy03[12] == "" && enemies.enemy03[13] == "" && enemies.enemy03[14] == "" && enemies.enemy03[15] == "" && enemies.enemy03[16] == "" && enemies.enemy03[17] == "" && enemies.enemy03[18] == "" && enemies.enemy03[19] == "" 
        ) {
          
            endLevel()
            clearInterval(endCheck)
            
        }

        
    }



}

    



// --------- END LEVEL -------------

let levelCounter = 0

function endLevel () {

    enemy1Counter = -1
    enemy2Counter = -1
    enemy3Counter = -1
    levelCounter++

    for (let i = 0; i < walls.length; i++) {
        
       let clearCell = document.getElementById(walls[i])
       clearCell.innerHTML = ""
    }

    walls = []
    wallsHitBox = []
    enemies.enemy01 = []
    enemies,enemy02 = []
    enemies,enemy03 = []

    let audio = new Audio("sounds/pass.mp3")
    audio.play()

    showLevel.innerHTML = "PASS"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)
    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    if (gameRunning == 1) {
        
        setTimeout(startNewLevel, 3000)

    }
   
}



function startNewLevel() {
    let audio = new Audio("sounds/levelStart.mp3")
    audio.play()
   
    if (levelCounter == 0) {level1()}
    if (levelCounter == 1) {level2()}
    if (levelCounter == 2) {level3()}
    if (levelCounter == 3) (level4())
    if (levelCounter == 4) (level5())
    if (levelCounter == 5) (bonusLevel())
    if (levelCounter == 6) (level6())
    if (levelCounter == 7) (level7())
    if (levelCounter == 8) (level8())
    if (levelCounter == 9) (level9())
    if (levelCounter == 10) (level10())
        
    
}

let start1 = document.getElementById("start1")
let start2 = document.getElementById("start2")
let start3 = document.getElementById("start3")
let start4 = document.getElementById("start4")
let start5 = document.getElementById("start5")
let start6 = document.getElementById("start6")
let start7 = document.getElementById("start7")
let start8 = document.getElementById("start8")
let start9 = document.getElementById("start9")
let start10 = document.getElementById("start10")

let startBonus = document.getElementById("startBonus")
let startBoss = document.getElementById("startBoss")


start1.addEventListener("click", startLevel1)
start2.addEventListener("click", startLevel2)
start3.addEventListener("click", startLevel3)
start4.addEventListener("click", startLevel4)
start5.addEventListener("click", startLevel5)
start6.addEventListener("click", startLevel6)
start7.addEventListener("click", startLevel7)
start8.addEventListener("click", startLevel8)
start9.addEventListener("click", startLevel9)
start10.addEventListener("click", startLevel10)

function startLevel1 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level1()
    }
}

function startLevel1 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level1()
    }
}

function startLevel2 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level2()
    }
}

function startLevel3 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level3()
    }
}

function startLevel4 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level4()
    }
}

function startLevel5 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level5()
    }
}

function startLevel6 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level6()
    }
}

function startLevel7 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level7()
    }
}

function startLevel8 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level8()
    }
}

function startLevel9 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level9()
    }
}

function startLevel10 () {

    if (gameRunning == 0) {
        gameRunning = 1
        level10()
    }
}

startBonus.addEventListener("click", startBonusLevel)
startBoss.addEventListener("click", startBossFight)

function startBonusLevel () {

    if (gameRunning == 0) {
        gameRunning = 1
        bonusLevel()
    }
}

function startBossFight () {

    if (gameRunning == 0) {
        gameRunning = 1
        bossFight()
    }
}













// --------- END GAME ----------- 

let gameOver = document.getElementById("endGame")

function endGame () {

    enemy1Counter = -1
    enemy2Counter = -1
    levelCounter = 0
    gameRunning = 0

    let clear = setInterval(clearBoard, 10)

    function clearBoard () {

        for (let i = 0; i < walls.length; i++) {
        
            let clearCell = document.getElementById(walls[i])
            clearCell.innerHTML = ""
        }

        for (let i = 0; i < enemies.enemy01.length; i++) {

            let clearCell = document.getElementById(enemies.enemy01[i])
            clearCell.innerHTML = ""
            enemies.enemy01[i] = ""
        }  

        for (let i = 0; i < enemies.enemy02.length; i++) {

            let clearCell = document.getElementById(enemies.enemy02[i])
            clearCell.innerHTML = ""
            enemies.enemy02[i] = ""
        }

        for (let i = 0; i < enemies.enemy03.length; i++) {

            let clearCell = document.getElementById(enemies.enemy03[i])
            clearCell.innerHTML = ""
            enemies.enemy03[i] = ""
        }


    }

    setTimeout(finalClear, 10000)

    function finalClear () {

        clearInterval(clear)
 
        walls = []
        wallsHitBox = []   
        enemies.enemy01 = []
        enemies.enemy02 = []
        enemies.enemy03 = []

    }

    setTimeout(endDisplay, 5000)

    function endDisplay () {

        let audio = new Audio("sounds/gameOver.mp3")
        audio.play()

        showLevel.innerHTML = "GAME OVER"
        showLevel.classList.add("showLevel")
        setTimeout(showLevelOff, 4000)

        function showLevelOff () {
            showLevel.innerHTML = ""
            showLevel.classList.remove("showLevel")
        }
    }
}

gameOver.addEventListener("click", endGame)



// ---------- YOU LOSE ----------

function youLose () {

    setTimeout(playSound, 1000)

    function playSound () {

        let audio = new Audio("sounds/youLose.mp3")
        audio.play()
    }

    showLevel.innerHTML = "YOU LOSE"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 4000)

    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    endGame()

}




















// ------ BOSS FIGHT --------

// one dude, maybe something silly like darth vader...

// has health and health bar

// has different phases of different movement patterns

// slower and shoots back at you 

// fast, hard to shoot

// teleports to random spot 

// has big laser attack, similar to super laser

// attack that blasts the whole screen, have to hide

// when health is at critical level you must kill it with super laser



// ---------- BOSS FIGHT PHASE 1, ASTEROID FIELD ------------

// spawn 2 asteroids on top row at random coor

// asteroids move down 

// everytime asteroids move down span 2 new asteroids

// if asteroids coor == rocket coor end game

let asteroidPass = 0

let bossMusic =  new Audio("sounds/bossMusic.mp3")
bossMusic.volume = 0.2

function bossFight () {

    bossMusic.play()

    showLevel.innerHTML = "BOSS"
    showLevel.classList.add("showLevel")
    setTimeout(showLevelOff, 2000)

    function showLevelOff () {
        showLevel.innerHTML = ""
        showLevel.classList.remove("showLevel")
    }

    setTimeout(displayPrompt1, 2500)
    

    function displayPrompt1 () {

        let prompt = document.getElementById("prompt")
        prompt.innerHTML = "Watch out, Asteroid Field Incoming"
        prompt.classList.add("prompt")
    
        setTimeout(promptOff, 1500)
        
        function promptOff () {
            prompt.innerHTML = ""
            prompt.classList.remove("prompt")
        }

    }

    setTimeout(bossPhaseAsteroid, 4000)

}



function spawnAsteroid () {

    let asteroid1Y = 12
    let asteroid2Y = 12
    let asteroid1X = getRandomInt (1, 7)
    let asteroid2X = getRandomInt (1, 7)

    function getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (asteroid1X == asteroid2X) {

        if (asteroid2X < 7) {
            asteroid2X++
        }

        else {
            asteroid2X--
        }
  
    }

    let asteroid1Coor = asteroid1Y + "" +  asteroid1X
    let asteroid2Coor = asteroid2Y + "" +  asteroid2X

    let asteroid1Cell = document.getElementById(asteroid1Coor)
    let asteroid2Cell = document.getElementById(asteroid2Coor)

    asteroid1Cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'
    asteroid2Cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

    setTimeout(asteroidTravel, 200)

    function asteroidTravel () {

        if (asteroid1Y > 3) {

            asteroid1Cell.innerHTML = ""
            asteroid2Cell.innerHTML = ""

            asteroid1Y--
            asteroid2Y--

            asteroid1Coor = asteroid1Y + "" +  asteroid1X
            asteroid2Coor = asteroid2Y + "" +  asteroid2X

            asteroid1Cell = document.getElementById(asteroid1Coor)
            asteroid2Cell = document.getElementById(asteroid2Coor)

            asteroid1Cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'
            asteroid2Cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

            if (asteroid1Coor == rocketCoordinates || asteroid2Coor == rocketCoordinates) {

                youLose()
            }

            setTimeout(asteroidTravel, 200)
   
        }

        else {

            if (asteroid1Coor == rocketCoordinates || asteroid2Coor == rocketCoordinates) {

                youLose()
                let audio = new Audio("sounds/explosion.mp3")
                audio.play()
                asteroid1Cell.innerHTML = '<img class="lazer" src="images/explosion.png"></img>'
            }

            else {

                asteroid1Cell.innerHTML = ""
                asteroid2Cell.innerHTML = ""
    
            }
        }
    }
}



function asteroidFieldEnding () {

    // prompt player and give them super laser

    // spawn asteroids along the top, 3 layers thick

    // detect if rocket coor == asteroid coor

    // detect when super laser is shot, deestroy astroids in
    // 3 wide coollumn

    powerUpActive = 1

    let prompt = document.getElementById("prompt")
    prompt.innerHTML = "Quick, use the Super Laser!"
    prompt.classList.add("prompt")

    setTimeout(promptOff, 1500)
    
    function promptOff () {
        prompt.innerHTML = ""
        prompt.classList.remove("prompt")
    }

    spawnAsteroidRow1()
    setTimeout(spawnAsteroidRow2, 410)
    setTimeout(spawnAsteroidRow3, 820)

    function spawnAsteroidRow1 () {

        for (let i = 0; i < asteroidsRow1.length; i++) {

            let asteroidSpawnCell = document.getElementById(asteroidsRow1[i])
            asteroidSpawnCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        setTimeout(row1Travel, 400)

    }

    function spawnAsteroidRow2 () {

        for (let i = 0; i < asteroidsRow2.length; i++) {

            let asteroidSpawnCell = document.getElementById(asteroidsRow2[i])
            asteroidSpawnCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        setTimeout(row2Travel, 400)

    }

    function spawnAsteroidRow3 () {

        for (let i = 0; i < asteroidsRow3.length; i++) {

            let asteroidSpawnCell = document.getElementById(asteroidsRow3[i])
            asteroidSpawnCell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        setTimeout(row3Travel, 400)

    }

    let row1Y = 12

    function row1Travel () {

        for (let i = 0; i < asteroidsRow1.length; i++) {

            let cell = document.getElementById(asteroidsRow1[i])
            cell.innerHTML = ""

        }

        row1Y--


        for (let i = 0; i < 7; i++) {

            asteroidsRow1[i] = asteroidsRow1[i] - 10
        }

        for (let i = 0; i < asteroidsRow1.length; i++) {

            let cell = document.getElementById(asteroidsRow1[i])
            cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        if (row1Y > 3) {
            
            setTimeout(row1Travel, 400)
        }

        // check if hit player

        else {

            for (let i = 0; i < asteroidsRow1.length; i++) {

                if (asteroidsRow1[i] == rocketCoordinates) {

                    i = 8
                    youLose()
                    
                }

            }

            for (let i = 0; asteroidsRow1.length; i++) {

                let IDONTKNOW = document.getElementById(asteroidsRow1[i])
                IDONTKNOW.innerHTML = ""

            }

            asteroidsRow1 = []

        }

    }

    let row2Y = 12

    function row2Travel () {

        for (let i = 0; i < asteroidsRow2.length; i++) {

            let cell = document.getElementById(asteroidsRow2[i])
            cell.innerHTML = ""

        }



        row2Y--

       

        for (let i = 0; i < 7; i++) {

            asteroidsRow2[i] = asteroidsRow2[i] - 10
            
        }

        for (let i = 0; i < asteroidsRow2.length; i++) {

            let cell = document.getElementById(asteroidsRow2[i])
            cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        if (row2Y > 3) {
            
            setTimeout(row2Travel, 400)
        }

        // check if hit player

        else {

            for (let i = 0; i < asteroidsRow2.length; i++) {

                if (asteroidsRow2[i] == rocketCoordinates) {

                    i = 8
                    youLose()
                    
                }

            }

            for (let i = 0; asteroidsRow2.length; i++) {

                let IDONTKNOW = document.getElementById(asteroidsRow2[i])
                IDONTKNOW.innerHTML = ""

            }

            asteroidsRow2 = []

        }

    }

    let row3Y = 12

    function row3Travel () {

        for (let i = 0; i < asteroidsRow3.length; i++) {

            let cell = document.getElementById(asteroidsRow3[i])
            cell.innerHTML = ""

        }

        row3Y--

        for (let i = 0; i < 7; i++) {

            asteroidsRow3[i] = asteroidsRow3[i] - 10
            

        }

        for (let i = 0; i < asteroidsRow3.length; i++) {

            let cell = document.getElementById(asteroidsRow3[i])
            cell.innerHTML = '<img class="lazer" src="images/asteroid.png"></img>'

        }

        if (row3Y > 3) {
            
            setTimeout(row3Travel, 400)
        }

        // check if hit player

        else {

            for (let i = 0; i < asteroidsRow3.length; i++) {

                if (asteroidsRow3[i] == rocketCoordinates) {

                    i = 8
                    youLose()
                    
                }

            }

            for (let i = 0; asteroidsRow3.length; i++) {

                let IDONTKNOW = document.getElementById(asteroidsRow3[i])
                IDONTKNOW.innerHTML = ""
                
            }

            asteroidsRow3 = []

        }

    }

    

    
}




let asteroidCounter = 0

function bossPhaseAsteroid () {

    if (asteroidCounter < 50) {

        asteroidCounter++
        spawnAsteroid()
        setTimeout(bossPhaseAsteroid, 400)
    }

    else {

        setTimeout(asteroidFieldEnding, 1000)
        setTimeout(bossIntro, 8000)
    }



}




function bossIntro () {

    if (asteroidPass == 1) {

        spawnGargamel()

        let prompt = document.getElementById("prompt")
        prompt.innerHTML = "Target Identified: GARGAMEL"
        prompt.classList.add("prompt")
        setTimeout(promptOff, 3000)
        

        function promptOff () {

            prompt.innerHTML = ""
            prompt.classList.remove("prompt")
        }
    }
}  

let gargamelDisplay = '<img class="lazer" src="images/gargamel.png"></img>'

let gargamelCell = ""

function spawnGargamel () {

    gargamel = [11, 4]

    gargamelCoor = "114"

    bossMusic.volume = 0.1

    let audio = new Audio("sounds/gargamelLaugh.mp3")
    audio.play()

    setTimeout(bossMusicPlay, 2000)

    function bossMusicPlay () {
        bossMusic.volume = 0.2
        
    }

    gargamelCell = document.getElementById(gargamelCoor)
    gargamelCell.innerHTML = gargamelDisplay

    setTimeout(gargamelPhaseSlow, 3000)
    setTimeout(spawnHealthBar, 3000)

    function spawnHealthBar () {

        let healthBar = document.getElementById("healthBar")
        healthBar.classList.add("healthBar")
    }

}


let phase = 0

function phaseSelect () {

    if (gargamel[0] > 8) {


        let phase = getRandomInt(0, 2)

        function getRandomInt (min, max) {
             min = Math.ceil(min);
             max = Math.floor(max);
             return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (phase == 0) {

            gargamelPhaseSuperLaser()
        }

        if (phase == 1) {

            gargamelPhaseFast()
        }

        if (phase == 2) {

            gargamelPhaseTeleport()
        }
    }

    else {

        setTimeout(moveUp, 200)
        setTimeout(moveUp, 400)
        setTimeout(moveUp, 600)
        
        function moveUp () {

            gargamelCoor = gargamel[0] + "" + gargamel[1]

            gargamelCell = document.getElementById(gargamelCoor)
            gargamelCell.innerHTML = ""
            gargamel[0]++
        }

        setTimeout(callPhaseSelect, 800)

        function callPhaseSelect () {

            phaseSelect()
        }


    }

}

function gargamelPhaseFast () {

    // move diagonally right/down, move right/up... 

    // if x == 7 move left

    // do same for left but reverse

    let upDown = 0

    let stepCount = 0

    moveRight()

    // 0 = down

    function moveRight () {

        if (stepCount < 30) {

            stepCount++

            if (gargamel[1] < 7) {

                if (upDown == 0) {
                    upDown = 1
                    gargamelCell.innerHTML = ""
                    gargamel[0]--
                    gargamel[1]++
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay
                    setTimeout(moveRight, 100)
                
                } 

                 else {
                    upDown = 0
                    gargamelCell.innerHTML = ""
                    gargamel[0]++
                    gargamel[1]++
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay
                    setTimeout(moveRight, 100)
                }   
            }   

            else {
                upDown = 0
                moveLeft()
            }

        }
            
        else {

            stepCount = 0

            setTimeout(gargamelPhaseSlow, 200)
            
        } 
    } 

    function moveLeft () {

        if (stepCount < 30) {

            stepCount++

            if (gargamel[1] > 1) {

                if (upDown == 0) {

                    upDown = 1

                    gargamelCell.innerHTML = ""

                    gargamel[0]--
                    gargamel[1]--
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay

                    setTimeout(moveLeft, 100)
            
                } 

                else {

                    upDown = 0

                    gargamelCell.innerHTML = ""

                    gargamel[0]++
                    gargamel[1]--
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay
                    setTimeout(moveLeft, 100)

                }
            }

            else {

                upDown = 0
                moveRight()
            }
        }

        else {

            stepCount = 0

            setTimeout(gargamelPhaseSlow, 200)
        }

    }

}

function gargamelPhaseSlow () {

    // moves in long circle

    // fires back

    let stepCount = 0

    moveRight()

    function moveRight () {

            if (stepCount < 40) {

                stepCount++

                if (gargamel[1] < 6) {

                    genRandStep()

                    gargamelCell.innerHTML = ""
                    gargamel[1]++
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay

                    setTimeout(moveRight, 300)
                }

                else {

                    gargamelCell.innerHTML = ""
                    gargamel[0]--
                    gargamelCoor = gargamel[0] + "" + gargamel[1]
                    gargamelCell = document.getElementById(gargamelCoor)
                    gargamelCell.innerHTML = gargamelDisplay

                    setTimeout(moveLeft, 300)
                }
            
            }

            else {

                stepCount = 0

                setTimeout(phaseSelect, 200)
            
            }
        }

    function moveLeft () {

        if (stepCount < 15) {

            stepCount++

            if (gargamel[1] > 2) {

                genRandStep()

                gargamelCell.innerHTML = ""
                gargamel[1]--
                gargamelCoor = gargamel[0] + "" + gargamel[1]
                gargamelCell = document.getElementById(gargamelCoor)
                gargamelCell.innerHTML = gargamelDisplay

                setTimeout(moveLeft, 300)
            }

            else {

                gargamelCell.innerHTML = ""
                gargamel[0]++
                gargamelCoor = gargamel[0] + "" + gargamel[1]
                gargamelCell = document.getElementById(gargamelCoor)
                gargamelCell.innerHTML = gargamelDisplay

                setTimeout(moveRight, 300)
            }
        }

        else {

            stepCount = 0

            setTimeout(phaseSelect, 200)
        }
    
    }

    function genRandStep () {

        let int = getRandomInt(0, 2)
    
        function getRandomInt (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
        if (int == 0) {
    
            attack()
        }
    }
    

    function attack () {

        let audio = new Audio("sounds/bullet.mp3")
        audio.play()

        let bullet = []
        
        bullet.push(gargamel[0] - 1)
        bullet.push(gargamel[1])

        let bulletCoor = bullet[0] + "" + bullet[1]
        let bulletCell = document.getElementById(bulletCoor)
        let bulletDisplay = '<img class="bullet" src="images/bullet.png"></img>'
        bulletCell.innerHTML = bulletDisplay

        setTimeout(bulletTravel, 200)

        let hitCheck = setInterval(checkHit, 20)

        function checkHit () {
 
            if (bulletCoor == rocketCoordinates) {

                youLose()

                let audio = new Audio("sounds/explosion.mp3")
                audio.play()
            }
        }

        function bulletTravel () {

            if (bullet[0] > 1) {

                bulletCell.innerHTML = ""

                bullet[0]--
                bulletCoor = bullet[0] + "" + bullet[1]
                bulletCell = document.getElementById(bulletCoor)

                bulletCell.innerHTML = bulletDisplay

                setTimeout(bulletTravel, 200)
                
            }

            else {
                
                bulletCell.innerHTML = ""
                bullet = []
                bulletCoor = ""
            }
        }
    }
}

function gargamelPhaseSuperLaser () {

    let gargamelLaugh = new Audio ("sounds/gargamelLaugh.mp3")

    gargamelLaugh.play()

    let chargeUpSound = new Audio("sounds/gargamelChargeUp.mp3")

    setTimeout(playChargeSound, 1000)

    function playChargeSound () {

        chargeUpSound.play()
    }

    setTimeout(gargamelSuperLaser, 1500)

    function gargamelSuperLaser () {

        let gargamelLaser = new Audio("sounds/superLazer.mp3")
        gargamelLaser.play()

        let gargamelLaserCoor = gargamel[0] - 1 + "" + gargamel[1]

        let cellCounter = gargamel[0] - 3

        

        function spawnLaser () {

            if (cellCounter > 0) {
            
                let gargamelLaserCell = document.getElementById(gargamelLaserCoor)
                gargamelLaserCell.innerHTML = superLazerDisplay
                gargamelLaserCoor = gargamelLaserCoor - 10
                cellCounter--
                spawnLaser()

            }

        }    

        spawnLaser()

        let checkLaser = setInterval(checkGargamelLaser, 20)

        function checkGargamelLaser () {

            if (rocketCoordinates == gargamelLaserCoor + 10) {

                clearInterval(checkLaser)
                youLose()
            }
        }

        setTimeout(checkGargamelLaserOff, 2000)

        function checkGargamelLaserOff () {

            clearInterval(checkLaser)
        }

        setTimeout(gargamelSuperLaserOff, 2000)

        let cellCounter1 =  gargamel[0] - 3

        function gargamelSuperLaserOff () {

            if (cellCounter1 > 0) {


            
                let gargamelLaserCell = document.getElementById(gargamelLaserCoor + 10)
                gargamelLaserCell.innerHTML = ""
                gargamelLaserCoor = gargamelLaserCoor + 10
                cellCounter1--

                gargamelSuperLaserOff()

            }

            else {

                gargamelPhaseSlow()
            }
        }
        
    }
}

function gargamelPhaseTeleport () {

    let teleportChargeSound = new Audio ("sounds/gargamelChargeUp.mp3")

    teleportChargeSound.play()

    setTimeout(playChargeSound, 2000)

    function playChargeSound () {

        teleportChargeSound.play()
    }

    let gargamelX = getRandomInt (1, 7)
    let gargamelY = getRandomInt (9, 11)

    
    function getRandomInt (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    }

    setTimeout(teleport, 3000)

    function teleport () {

        gargamelCell = document.getElementById(gargamelCoor)
        console.log(gargamelCoor)
        gargamelCell.innerHTML = '<img class="lazer" src="images/teleport.png"></img>'


        setTimeout(teleportSpawn, 1000)
    }

    function teleportSpawn () {

        gargamel[0] = gargamelY
        gargamel[1] = gargamelX

        gargamelCell.innerHTML = ""

        let teleportSound = new Audio ("sounds/superLazer.mp3")

        teleportSound.play()

        gargamelCoor = gargamel[0] + "" + gargamel[1]
        gargamelCell = document.getElementById(gargamelCoor)
        gargamelCell.innerHTML = '<img class="lazer" src="images/teleport.png"></img>'

        setTimeout(gargamelSpawn, 1000)
    }
    
    function gargamelSpawn () {

        gargamelCell.innerHTML = gargamelDisplay
        setTimeout(gargamelPhaseSlow, 500)
    }

}


function gargamelHealthBar () {

    if (gargamelHealth < 18) {

        let health10 = document.getElementById("health10")
        health10.classList.remove("healthPoint")
        health10.classList.add("healthPointOff")
    }

    if (gargamelHealth < 16) {

        let health9 = document.getElementById("health9")
        health9.classList.remove("healthPoint")
        health9.classList.add("healthPointOff")
    }

    if (gargamelHealth < 14) {

        let health8 = document.getElementById("health8")
        health8.classList.remove("healthPoint")
        health8.classList.add("healthPointOff")
    }

    if (gargamelHealth < 12) {

        let health7 = document.getElementById("health7")
        health7.classList.remove("healthPoint")
        health7.classList.add("healthPointOff")
    }

    if (gargamelHealth < 10) {

        let health6 = document.getElementById("health6")
        health6.classList.remove("healthPoint")
        health6.classList.add("healthPointOff")
    }

    
    if (gargamelHealth < 8) {

        let health5 = document.getElementById("health5")
        health5.classList.remove("healthPoint")
        health5.classList.add("healthPointOff")
    }

    
    if (gargamelHealth < 6) {

        let health4 = document.getElementById("health4")
        health4.classList.remove("healthPoint")
        health4.classList.add("healthPointOff")
    }

    
    if (gargamelHealth < 4) {

        let health3 = document.getElementById("health3")
        health3.classList.remove("healthPoint")
        health3.classList.add("healthPointOff")
    }

    
    if (gargamelHealth < 2) {

        let health2 = document.getElementById("health2")
        health2.classList.remove("healthPoint")
        health2.classList.add("healthPointOff")
    }

    if (gargamelHealth == 0) {

        let health1 = document.getElementById("health1")
        health1.classList.remove("healthPoint")
        health1.classList.add("healthPointOff")
    }





}    

//spawnGargamel()

//gargamelPhaseFast()

//gargamelPhaseSuperLaser()





