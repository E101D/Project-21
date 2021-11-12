//Coin is trying to avoid the robbers
var coin, coinImg;
var thief, thiefImg;
var ground;
var touches = [];
var gameState = "play";
var score, highscore;
var backgroundImg;
var gameOver, gameOverImg

function preload(){
   coinImg = loadAnimation("CoinImage1.png", "CoinImage2.png", "CoinImage3.png", "CoinImage4.png");
   backgroundImg = loadImage("BackgroundImage.png");
   thiefImg = loadAnimation("ThiefImage1.png", "ThiefImage2.png", "ThiefImage3.png", "ThiefImage4.png", "ThiefImage5.png", "ThiefImage6.png");
   gameOverImg = loadImage("GameOver.png");
}
function setup() {
   createCanvas(windowWidth, windowHeight);

   robbers = new Group();

   ground = createSprite(width / 2, height / 2, width, 20);
   ground.addImage(backgroundImg);
   ground.scale = (2);
   ground.velocityX = -3;

   score = 0;
   highscore = 0;

   coin = createSprite(50, height / 2 + 85, 20, 50);
   coin.addAnimation("coin", coinImg);
   coin.scale = (0.65);
   coin.debug = true;
   coin.setCollider("rectangle", 0, 25, 60, 60);

   groundinvis = createSprite(width / 2, height / 2 + 125, width, 10);
   groundinvis.visible = true;

   gameOver = createSprite(width / 2, height / 2, 20, 20);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.3
}

function draw() {
   background("grey");
   
   if(gameState === "play"){
      gameOver.visible = false;
      
      if(ground.x < width / 3){
         ground.x = width / 2;
      }
      SpawnThief();

      if(frameCount%2 === 0){
         score = score + 5;
      }
      if(highscore <= score){
         highscore = score;
      }

      if(touches.length > 0 || keyDown("space")&& coin.y >= height - height / 4.5 - 120){
         coin.velocityY = -20;
         touches = [];
      }
      coin.velocityY = coin.velocityY + 0.8;

      if(coin.isTouching(robbers)){
         gameState = "end";
      }
   }
   if(gameState === "end"){
      gameOver.visible = true;

      robbers.velocityXEach = 0;
      ground.velocityX = 0;

      if(touches.length < 0 || keyDown("enter")){
         gameState = "play";
         coin.x = 50;
      }

   }

   coin.collide(groundinvis);
   coin.collide(robbers);
   if(robbers.x < 0){
      robbers.destroyEach();
   }

   textSize(15);
   fill("white");
   text("Score ", score, width - 150, 50);
   textSize(15);
   fill("white");
   text("Highscore ", highscore, width - 150, 75);


   drawSprites();
}


function SpawnThief(){
   if(frameCount%150 === 0){
      thief = createSprite(width + 50, height / 2 + 65, 10, 10);
      thief.addAnimation("thief", thiefImg);
      thief.velocityX = -5 - Math.round(score / 100);
      robbers.add(thief);
}
}