var backgroundScene, backgroundImg, blackboardImg;

var boy, boyAnim, boyStop;
var obstacle, obstacle1, obstacle2, obstacle3, obstaclesGroup;
var book, book1, book2, book3, booksGroup;
var invisibleGround;

var gameState = 1;
var marks = -3;

function preload(){
  backgroundImg = loadAnimation("background.jpg");
  blackboardImg = loadAnimation("blackboard.jpg");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  book1 = loadImage("book1.png");
  book2 = loadImage("book2.png");
  book3 = loadImage("book3.png");

  boyAnim = loadAnimation("1.png", "2.png", "3.png", "4.png");
  boyStop = loadAnimation("4.png");
}

function setup(){
  createCanvas(displayWidth - 100, displayHeight - 150);
  
  backgroundScene = createSprite(1050, 375, 10, 10);
  backgroundScene.addAnimation("bg", backgroundImg);
  backgroundScene.addAnimation("bb", blackboardImg);
  backgroundScene.velocityX = -8;
  backgroundScene.scale = 3;

  boy = createSprite(70, height - 100);
  boy.addAnimation("walk", boyAnim);
  boy.addAnimation("stop", boyStop);
  boy.scale = 0.8;
  boy.mirrorX(boy.mirrorX() * -1);

  invisibleGround = createSprite(width/2, height, width, 20);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  booksGroup = new Group();
}

function draw(){
  background("white");

  boy.collide(invisibleGround);

  if(gameState === 1){
    if(backgroundScene.x < 275){
      backgroundScene.x = 1000
    }

    boy.velocityY = boy.velocityY + 0.8;
    if(keyDown("Space") && boy.y > 640){
      boy.velocityY = -20;
    }

    marks = 1;

    var rand = Math.round(random(1, 2));

    /*switch(rand){
      case 1:
        spawnObstacles();
        break;
      case 2:
        spawnBooks();
        break;
      default:
        break;
    }*/

    if(boy.isTouching(obstaclesGroup)){
      gameState = 0;
    }

    for(i = 0; i < booksGroup.length; i++){
      if(boy.isTouching(booksGroup.get(i))){
        marks++;
        booksGroup.get(i).destroy();
      }
    }

    if(marks === 1 || marks === 5 || marks === 11){
      gameState = 2;
      showQuestion();
    }

    drawSprites();
  } else {
    boy.changeAnimation("stop", boyStop);

    drawSprites();

    textSize(20);
    fill("black");
    if(boy.isTouching(obstaclesGroup)){
      text("No matter how many hurdles come in your way, you must never stop learning.", displayWidth/2 - 400, 50);
      text("To continue learning, press the space bar or tap your screen.", displayWidth/2 - 375, 80);
    } else if(marks === 10){
      text("Congrats. You have educated the boy.", displayWidth/2 - 200, 50);
      text("Stop illiteracy and educate the world.", displayWidth/2 - 195, 80);
      text("To educate the boy more, press the space bar or tap your screen.", displayWidth/2 - 335, 110);
    }

    backgroundScene.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);
  }

  textSize(20);
  fill("blue");
  if(marks > 0){
    text("Class: " + marks, 50, 50);
  } else if(marks === -3){
    text("Start Educating", 50, 50);
  } else if(marks === -2){
    text("Class: Nursery", 50, 50);
  } else if(marks === -1){
    text("Class: LKG", 50, 50);
  } else if(marks === 0){
    text("Class: UKG", 50, 50);
  } else if(marks === 11){
    text("Education Completed", 50, 50);
  }
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(width + 50, height - 40);
    obstacle.scale = 1.4;
    obstacle.velocityX = -5;

    var rand = Math.round(random(1, 6));

    switch(rand){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle5);
      case 6:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("rectangle", 0, 0, 50, 50);
  }
}

function spawnBooks(){
  if(frameCount % 80 === 0){
    book = createSprite(width + 50, Math.round(random(300, 450)));
    book.velocityX = -5;

    var rand = Math.round(random(1, 3));

    switch(rand){
      case 1:
        book.scale = 0.3;
        book.addImage(book1);
        break;
      case 2:
        book.scale = 0.6;
        book.addImage(book2);
        break;
      case 3:
        book.scale = -0.6;
        book.addImage(book3);
        break;
      default:
        break;
    }
    booksGroup.add(book);
  }
}

function showQuestion(){
  if(gameState === 2){
    boy.visible = false;
    backgroundScene.changeAnimation("bb", blackboardImg);
    backgroundScene.x = width/2;
    backgroundScene.y = height/2;
    backgroundScene.scale = 1;
    if(marks === 1){

    }
  }
}