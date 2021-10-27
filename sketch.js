let mode;
let timer = 60;
let score1 = 0;
let score2 = 0;
// let kirby1 = [];
let kirby1;
let kirby2;
let star;
let obstacles;
let v1 =2;
let v2 =2;
let testx = 200;
let testy = 600;

let pic1='asset/kirbyleft1.png';
// let pic2='asset/standing.png'
function preload() {
  bg = loadImage ('asset/bg.png')
  star = loadImage('asset/star.png')
  ob = loadImage('asset/obstacle.png')
  desti = loadImage('asset/destination.png')

}

function setup() {
  createCanvas(800, 800);
  
  //start page
  mode =0;
  button = createButton("Start game!", width/2, height/2);
  button.position (350, 500);
  button.mousePressed(startgame);

  //player1
  // kirby1 = createSprite(200, 600);

  kirby1 = createSprite (600, 700);
  kirby2 = createSprite (200, 700);
  kirby1.addAnimation('normal',pic1,'asset/kirbyleft2.png' )
  kirby2.addAnimation('normal','asset/kirbyright1.png','asset/kirbyright2.png' )

  //star
  collectibles = new Group();
  for(var i=0; i<8; i++)
  {
    var star = createSprite(random(100, width-100), random(100, height-100));
    star.addAnimation('normal', 'asset/star.png', 'asset/star2.png');
    collectibles.add(star);
  }

  obstacles = new Group();
  for(var i=0; i<8; i++)
  {
    var poop = createSprite(random(100, width-100), random(100, height-100));
    poop.addAnimation('normal', 'asset/obstacle.png');
    // poop.position.x = random(poop.position.x-10, poop.position.x+10);
    // poop.position.y = random(poop.position.y-10, poop.position.y+10);
    obstacles.add(poop);
  }
  kirby1.playing = false;

}

function draw() {
  
  
  //game instruction//
  if(mode ==0) {
    background(255);
    noStroke();
    fill (245, 203, 204)
    rect (0, 100, 800, 800)
    bg.resize(100, 120);
    image (bg, 350, 525);
    fill (0);
    textAlign(CENTER, CENTER);
    textSize(30)
    text("Welcome to the League of Kirby", width/2, 50);
    text("Player 1", 600, 600)
    text("W A S D", 600, 650)
    text("Player 2", 200, 600)
    text("↑ ↓ ← →", 200, 650)
    image (star, 120, 100)
    text("- Score you want to get", width/2, 150);
    image (ob, 110, 210)
    text("- Obstacles you cannot pass", width/2, 250);
    desti.resize(80, 80)
    image (desti, 150, 310)
    text("- Final destination", width/2, 350);
   
    push()
    translate(600, 700)
    drawSprites(kirby1);
    pop()

    push()
    translate(200, 700)
    drawSprites(kirby2);
    pop()
  }

  //start game//
  if(mode ==1) {
    background(220);
    button.hide();
    fill(33, 44, 55)
    rect(75, 75, 650, 650)
    desti.resize (200, 200)
    image(desti, 300, 100);

    //timer and score
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(20);
    text("Time Left :" + timer, 75, 30);
    text("Player 1:" + score1, 650, 30);
    text("Player 2:" + score2, 650, 50);
    //timer
    if (frameCount % 60 == 0 && timer > 0) {
      timer --;
      print ("time")
    }
    
    if (timer == 0) {
      mode = 2
      // textAlign(CENTER, CENTER);
      // textSize(40);
      // text("xxx win", width/2, height/2);
    }

    //player1

    if (keyIsDown(LEFT_ARROW)) {
      kirby1.position.x -=v1;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      kirby1.position.x +=v1;
    }
  
    if (keyIsDown(UP_ARROW)) {
      kirby1.position.y -=v1;
    }
  
    if (keyIsDown(DOWN_ARROW)) {
      kirby1.position.y +=v1;
    }

    //player2
    if (keyIsDown(65)) {
      kirby2.position.x -=v2;
    }
  
    if (keyIsDown(68)) {
      kirby2.position.x +=v2;
    }
  
    if (keyIsDown(87)) {
      kirby2.position.y -=v2;
    }
  
    if (keyIsDown(83)) {
      kirby2.position.y +=v2;
    }
    
    //eat stars
    kirby1.overlap(collectibles, collect);
    kirby2.overlap(collectibles, collect);
    kirby1.collide (obstacles);
    kirby2.collide(obstacles);

    drawSprites();
  }

  //end games
  if (mode == 2) { 
    let winner;
    if (score1 > score2) {
      winner = "Player 1"
    } else if (score1 < score2) {
      winner = "Player 2"
    } else if (score1 == score2) {
      winner = "No one"
    }
    
    rect (0, 0, 800, 800)
    textAlign(CENTER, CENTER);
    textSize(40);
    stroke (20)
    text(winner +" win!!!!", width/2, height/2);
    noStroke()
    fill ((5*frameCount) % 360, 100, 100, 60)
    ellipse (width/2, height/2, 100, 100)
    fill ((3*frameCount) % 360, 100, 100, 60)
    ellipse (width/2, height/2, 400, 400)
    fill ((frameCount) % 360, 100, 100, 60)
    ellipse (width/2, height/2, 800, 800)
    fill (100,(8*frameCount) % 360, 100, 60)
    ellipse (width/2, height/2, 1200, 1200)
    fill (100,(5*frameCount) % 360, 100, 60)
    ellipse (width/2, height/2, 1600, 1600)
  }
}

function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
  // collector.changeAnimation('stretch');
  collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered
  //the event
  collected.remove();

  if (collector == kirby1) {
    score1 += 1;
  } else if (collector == kirby2) {
    score2 += 1;
  }
}

// function slowdown (collector, poop)
// {
//   collector.animation.rewind();
//   poop.remove();
//   if (collector == kirbyleft) {
//     v1 = 1;
//   } else {
//     v2 = 1;
//   }
// }

function startgame() {
  mode = 1;
}

