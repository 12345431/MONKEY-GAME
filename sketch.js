
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0
var ground,groundimage
var play=1
var end=0
var gamestate=play
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 groundimage=loadImage("ground1.png")
}



function setup() {
  createCanvas(600,200)
  monkey=createSprite(50,160,20,50)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.07

  foodGroup=new Group()
  obstacleGroup=new Group()
  ground=createSprite(300,190,20,20)
  ground.addImage(groundimage,groundimage)
  ground.scale=2

}


function draw() {
background(180)
  if (gamestate===play){
     ground.velocityX = -(4 + 3* score/100)
    ground.x=ground.width/2
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  food()
  obstacles()
  monkey.collide(ground)
  
  text("Score: "+score,540,20)
    for (var j = 0; j < foodGroup.length; j++) { 
  if (foodGroup.get(j).isTouching(monkey)) { 
    score=score+1
    foodGroup.get(j).destroy()
  }
 if (obstacleGroup.isTouching(monkey)){
  gamestate=end
 }
}
  }
  else if(gamestate===end){
    foodGroup.destroyEach()
    obstacleGroup.destroyEach()
    monkey.destroy()
    fill("red")
    textSize(20)
    text("Your score is "+score,200,135)
    ground.velocityX=0
  }
  drawSprites()

}
function food(){
  if (frameCount%80===0){
    var bananas=createSprite(600,120,20,20)
    bananas.addImage(bananaImage,bananaImage)
    bananas.velocityX=-4
    bananas.lifetime=150
    foodGroup.add(bananas)
    bananas.scale=0.06
  }
}
function obstacles(){
  if (frameCount%60===0){
    var obstacle=createSprite(600,165,20,20)
    obstacle.addImage(obstaceImage,obstaceImage)
    obstacle.velocityX=-5
    obstacle.scale=0.09
    obstacle.lifetime=120
    obstacleGroup.add(obstacle)
  }
}





