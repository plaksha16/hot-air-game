var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var PLAY = 1
var END = 0
var gamestate = PLAY


function preload() {
  bgImg = loadImage("assets/bg.png")

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obstacle1Img = loadImage("assets/obsBottom1.png")
  obstacle2Img = loadImage("assets/obsBottom2.png")
  obstacle3Img = loadImage("/assets/obsBottom3.png")
  obstacle4Img = loadImage("/assets/obsTop1.png")
  obstacle5Img = loadImage("/assets/obsTop2.png")
  restartImg = loadImage("/assets/restart.png")
  gameOverImg = loadImage("/assets/gameOver.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  //background image
  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);
  bg.scale = 1.3
  

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.5;
  balloon.debug = true;


  gameOver = createSprite(width / 2, height / 3, 10, 10)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  invisibleGround = createSprite(200, height, width, 25);
  invisibleGround.visible = true;

  restart = createSprite(width / 2, 400, 10, 10)
  restart.addImage(restartImg)
  restart.visible = false

  obstaclesGroup = new Group()
  obstacle1Group = new Group()
}

function draw() {

  background("black");

  if (gamestate == PLAY) {
console.log(gamestate)
console.log(bg.velocityX)
    bg.velocityX = -2

    if (bg.x < 600) {
      bg.x = width / 2
    }

    if (keyDown("space")) {
      balloon.velocityY = -6;
  
    }

    if (balloon.isTouching(obstaclesGroup) || balloon.isTouching(obstacle1Group) || balloon.isTouching(invisibleGround)) {
      gamestate = END
      console.log(gamestate)
    }

    balloon.velocityY = balloon.velocityY + 0.2;

    obstacles();
  }



 

  //making the hot air balloon jump
 

  

  if (gamestate == END) {
    gameOver.visible = true;
    restart.visible = true;
    balloon.velocityY = 0
    obstacle1Group.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    bg.velocityX = 0

    if (mousePressedOver(restart)) {
      gamestate = PLAY
      console.log(gamestate)
      balloon.x = 0
      console.log(balloon.x)
    }
  }




  //adding gravity
 

  drawSprites();

}


function obstacles() {
  if (frameCount % 150 == 0) {
    var obstacle = createSprite(width + 100, 450, 5, 5)
    obstacle.addImage("obstacle", obstacle1Img)
    obstacle.scale = 0.2
    obstacle.velocityX = -2
    obstacle1Group.add(obstacle)
  }

  if (frameCount % 290 == 0) {
    var obstacle5 = createSprite(width + 100, random(80, 200), 4, 4)
    obstacle5.addImage("obstacle4", obstacle5Img)
    obstacle5.velocityX = -1
    obstacle5.scale = 0.1

    obstaclesGroup.add(obstacle5);

  }



}