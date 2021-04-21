var player;
var playerImg, npcImg;
var obstacleImg;
var ground1, groundImg;
var invisGround;
var h5, badge, badgeImg;
var background1, backgroundImg;
var x = 50;
var treeImg;
var score = 0;
var npcGroup, obstacleGroup, treeGroup;
var gameState = 3;
var retry, retryImg;

function preload()
{
  playerImg = loadImage("pc.png");
  npcImg = loadImage("npcs.png");
  obstacleImg = loadImage("obstacle.png");
  groundImg = loadImage("ground2.png");
  backgroundImg = loadImage("background.jpg");
  treeImg = loadImage("tree.png");
  badgeImg = loadImage("badge.png");
  retryImg = loadImage("retry.png");

}

function setup() 
{
  createCanvas(800,400);

  player = createSprite(200, 285, 20, 20);
  player.addImage(playerImg);

  ground1 = createSprite(400, 360, 800, 40);
  ground1.addImage(groundImg)
  ground1.velocityX = -5; 
  ground1.x = ground1.width /2;

 // background1 = createSprite(400, 200, 20, 20);
  //background1.addImage(backgroundImg);

  invisGround = createSprite(400, 400, 800, 40);
  invisGround.visible = false;

  retry = createSprite(365, 50, 20, 20);
  retry.addImage(retryImg);
  retry.scale = 0.3;
  h5 = createElement();
  h5.style('color', '#00a1d3');
  h5.position(300, 50);

  npcGroup = createGroup();
  obstacleGroup = createGroup();
  treeGroup = createGroup();

  player.setCollider("rectangle",0,0,60,200);
 
}

function draw() {
  background(backgroundImg);  


  // background1.depth = player.depth;
  // player.depth = player.depth+1;
  // console.log(player.depth);
  // console.log(background1.depth);


  if(gameState === 3)
  {
    stroke("blue");
    strokeWeight(3);
    textSize(30);
    text("Welcome to the Save The Trees Game!", 175, 100);
    text("")
    text("Press Space to Jump", 275, 170);
    text("Press K to save the trees", 250, 250);
    text("Press E to continue", 275, 350)
    retry.visible = false;
    player.visible = false;
    ground1.visible = false;
    obstacleGroup.destroyEach();
    treeGroup.destroyEach();
    npcGroup.destroyEach();
    
    if(keyDown("e"))
    {
      gameState = 0;
    }
  }

  else{
    text("Score: "+ score, 500,50);

    player.visible = true;
    ground1.visible = true;
  }
  
  if(gameState === 0)
  {
    retry.visible = false;
    
    if(keyDown("space"))
    {
      player.velocityY = -12;
    }

    player.velocityY = player.velocityY+0.8; 

    score = score + Math.round(getFrameRate()/60);

    ground1.velocityX = -5;
    
    if (ground1.x < 0)
   {
    ground1.x = ground1.width/2;
   }


    spawnObstacles();
    spawnTress();
    spawnNPC();
  
    if(keyDown("k") && player.isTouching(npcGroup))
   {
    npcGroup.destroyEach();
    h5.html("You Saved the Tree from being Cut!");
    badge = createSprite(x, 50, 20, 20);
    x = x+35;
    badge.addImage(badgeImg);
    badge.scale = 0.2;
   }
   for(var i = 0; i < npcGroup.length; i++)
   {
      if(npcGroup.get(i)!== null && npcGroup.get(i).x < 0)
      {
        gameState = 1;
      }
   }
   if(player.isTouching(obstacleGroup))
   {
    gameState = 1;
   }
  
  }

  if(gameState === 1)
  {
    retry.visible = true;
    
    stroke("blue");
    strokeWeight(3);
    textSize(20);
    text("GAME OVER", 300, 125);
    ground1.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    treeGroup.setVelocityXEach(0);
    treeGroup.setLifetimeEach(-1);
    npcGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    npcGroup.setVelocityXEach(0);
  }

  player.collide(invisGround);

  if(mousePressedOver(retry))
  {
    gameState = 0;
    obstacleGroup.destroyEach();
    npcGroup.destroyEach();
    treeGroup.destroyEach();
    score = 0;

  }
 
  drawSprites();

  

}

function spawnTress()
{
  if(frameCount % 200 === 0)
    {
      var tree = createSprite(470, 265, 20, 20);
      tree.addImage(treeImg);
      tree.velocityX = -6;
      tree.scale = 0.8;
      treeGroup.add(tree);
    }
}

function spawnObstacles()
{
    if(frameCount % 80 === 0)
    {
      var obstacle = createSprite(400, 345, 20, 20);
      obstacle.x = Math.round(random(350, 700));
      obstacle.addImage(obstacleImg);
      obstacle.velocityX = -6;
      obstacle.scale = 0.2;
      obstacle.lifetime = 400;
      obstacleGroup.add(obstacle);

    }
}

function spawnNPC()
{
  if(frameCount % 200 === 0)
  {
    var npc = createSprite(470, 265, 20, 20);
    npc.addImage(npcImg);
    npc.velocityX = -6;
    npcGroup.add(npc);

  

  }
}