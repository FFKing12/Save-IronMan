//Declaring variables.
var rocket, rocketImg,rocketImgLeft,rocketImgRight;
var space, spaceImg;
var comet, cometImg, cometGroup;
var coin, coinImg, coinGroup;

var gameOver, gameOverImg;
var restart, restartImg;

var gameState = "PLAY"; 
var score=0;

function preload() {

  //Loading images in variables.
  rocketImg = loadImage("Iron man gif.gif");
  
  spaceImg = loadImage("space.jpg");
  cometImg = loadImage("comet.png");
  coinImg = loadImage("coin.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}

function setup()
{
  canvas = createCanvas (500, 500);
  
 //Creating space.
  space = createSprite(200, 150, 20, 20);
  space.addImage(spaceImg);
  space.scale = 0.86;
  space.velocityY = 8;
  
  rocket = createSprite(200, 380, 20, 20);
  rocket.addImage(rocketImg);
  rocket.scale = .3;
  //applied collision radius
  rocket.debug=true;
 rocket.setCollider("rectangle",0,0,200,300);
  
  gameOver = createSprite(200, 200, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible=false;
  
  restart = createSprite(200, 310, 10, 10);
  //restart.addImage(restartImg);
  restart.scale = 0.175;
  restart.visible=false;
  
  coin = createSprite(200, -20, 10, 10);
  comet = createSprite(200, -20, 10, 10);
    
  cometGroup = new Group();
  coinGroup = new Group(); 
  
}

function draw()
{
  background(255);
  
  
  if(gameState === "PLAY")
 {
  
   gameOver.visible = false;
   //restart.visible = false; 
   
   space.velocityY = 8;
   
   //score = score + Math.round(getFrameRate()/50);
   
  //Regenerating the background.
  if (space.y > 350)
    {
      space.y = height/2;
    }
  
  //Making rocket move when arrow keys are pressed.
  if(keyDown("right_arrow"))
    {
      rocket.x = rocket.x + 3; 
    }
  
  if(keyDown("left_arrow"))
    {
      rocket.x = rocket.x - 3; 
    }
  
  //Function call.
  spawnComets();
  spawnCoin();
   
   if(coinGroup.isTouching(rocket))
     {
       score=score+1;
       coinGroup.get(0).destroy();     
     }
 
  if(cometGroup.isTouching(rocket))
    {
      gameState="END";
      space.velocityY=0;
    }
  
 }
  
  if(gameState ==="END")
    {
      gameOver.visible = true;
      restart.visible = true;
      
      space.veloctyY = 0;
      rocket.velocityY=0;
      cometGroup.destroyEach();
      coinGroup.destroyEach();
      reset();
    }
 
  drawSprites();
   
  stroke(100);
  textSize(60);
  text("Score: "+ score, 50,50);
  
  
}

function spawnComets()
{
  if(frameCount % 170 === 0)
    {
      comet = createSprite(200, -20, 10, 10);
      comet.addImage(cometImg);
      comet.x = Math.round(random(50, 350));
      comet.velocityY = 4;
      comet.lifetime = 130;
      comet.scale = 0.1; 
      
      cometGroup.add(comet);
      rocket.depth=comet.depth;
      rocket.depth+=1;
     
    }
}

function spawnCoin()
{
  if(frameCount % 70 === 0)
    {
      coin = createSprite(200, -20, 10, 10);
      coin.addImage(coinImg);
      coin.x = Math.round(random(50, 350));
      coin.velocityY = 4;
      coin.lifetime = 130;
      coin.scale = 0.05; 
      
      coinGroup.add(coin);
      rocket.depth=coin.depth;
      rocket.depth+=1;
    }
}

function reset()
{
  //restart = createSprite(200, 310, 10, 10);
  restart.addImage(restartImg);
  restart.scale = 0.175;
  
  if(mousePressedOver(restart))
    {
      score = 0;
      gameState = "PLAY";
      restart.visible=false;
    }
}