document.addEventListener('DOMContentLoaded', () => {
// QuerySelector will go to HTML file , look through it and find this
//particular div called "grid"
const grid = document.querySelector('.grid')

//This will look for class "grid div " which has 200 divs inside it background
//will apply changed to ALL at the same time

let squares = Array.from(document.querySelectorAll('.grid div'))
// we use # to pick an id
const SocreDisplay = document.querySelector('#score')
const StartBtn = document.querySelector('#start-button')
const width= 10;
let nextRandom = 0;
//this is the L tetromino shape drawing
const lTetromino =[
   [1, width+1, width*2+1, 2],

   [width, width+1, width+2, width*2+2],
   [1, width+1, width*2+1, width*2],
   [width, width*2, width*2+1, width*2+2]
]

const zTetromino = [
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1],
  [0,width,width+1,width*2+1],
  [width+1, width+2,width*2,width*2+1]
]

const tTetromino = [
  [1,width,width+1,width+2],
  [1,width+1,width+2,width*2+1],
  [width,width+1,width+2,width*2+1],
  [1,width,width+1,width*2+1]
]

const oTetromino = [
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1],
  [0,1,width,width+1]
]

const iTetromino = [
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3],
  [1,width+1,width*2+1,width*3+1],
  [width,width+1,width+2,width+3]
]

const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
let currentPosition = 4
let currentRotation = 0

//ramdomly select a shape or bloack and its first rotation

let random = Math.floor(Math.random()*theTetrominoes.length)


let current= theTetrominoes[random][0]

//drawing the first rotation on the blocks  "draw the tatromino"

function draw(){
  current.forEach(index =>{

    squares[currentPosition + index].classList.add('tetromino')
  })
}

//undraw the block or tetromino

function undraw(){

  current.forEach(index =>{
  squares[currentPosition + index].classList.remove('tetromino')

})

}


//setInterval allows us to invoce a function manytimes
//make the tetromino move down every second

timeId = setInterval(moveDown, 1000)


//assign function to keyCodes

function control(e) {

  if(e.keyCode === 37){
    moveLeft()
  }

  else if (e.keyCode=== 39){
    moveRight()
  }
  else if (e.keyCode === 38 ){
    rotate()
  }

  else if (e.keyCode === 40){
    moveDown()
  }
}

document.addEventListener('keyup', control)




//move down function
function moveDown(){
  undraw()
  currentPosition += width
  draw()
  freeze()

}

//creating a freeze function that sets an enpoint

function freeze(){

  if (current.some(index=> squares[currentPosition +index +width].classList.contains('taken')))
  {
    current.forEach(index => squares[currentPosition+index].classList.add('taken'))

    random= nextRandom


    //start a new block falling moveDown
    nextRandom= Math.floor(Math.random()*theTetrominoes.length)
    current= theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()

    dispalyShape()
  }

}

//function move tet left
function moveLeft(){
  undraw()
  const isLfetEged= current.some(index => (currentPosition+ index) % width === 0)

  if(!isLfetEged) currentPosition -=1

  if (current.some(index=> squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition +=1
  }

  draw()
}

//move the tetromino right, unless is at the edge or there is a blockage
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
  if(!isAtRightEdge) currentPosition +=1
  if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -=1
  }
  draw()
}


// this function will rotate the theTetrominoes


function rotate (){

  undraw()
  currentRotation ++
  if (currentRotation=== current.length){ //if the currentRotation get to 4 make it go back to 0
    currentRotation= 0
  }

  current = theTetrominoes[random][currentRotation]
  draw()

}


//show up next shape in the small screen 'mini-grid '

const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
const displayIndex = 0


//the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  // this function will dispaly the shape in the mini screen
  function dispalyShape (){
// remove any trace of the tetrminos from the entire grid
  displaySquares.forEach(square =>{
square.classList.remove('tetromino')
}
)

upNextTetrominoes[nextRandom].forEach(index => {
  displaySquares[displayIndex + index].classList.add('tetromino')

});

  }




















})
