var ship;
var tiefighter = []
var img2;
var img3;
var bullets = []
var img;
var gameScreen = 0
var scoreElem;
var song1;
var song2;





function preload() {
  img = loadImage("X-Wing_Top_View.png");
  img2 = loadImage("TIEfighter3-Fathead.png");
  img3 = loadImage("Death-Star-Construction-1.jpg");
  img4 = loadImage("roguesquadronlogo.JPG");
}

function setup() {
  
  song1 = loadSound('Star Wars Main Title and the Arrival at Naboo.mp3');
  createCanvas(900, 600);
  
  ship = new Ship(img)
  for (var i = 0; i < 20; i = i + 1) {
    tiefighter.push(new Jitter(img2));
  }
}

function draw() {
  if (gameScreen==0) {
    initScreen();
  }else{
    playGame();
  }

}

function mousePressed() {
  bullets.push(new Bullet(ship.x - 30, ship.y));
  bullets.push(new Bullet(ship.x + 30, ship.y));
}

function initScreen() {
  background('black');
  
  fill("white");
  text("Click START",400,400);
  image(img4,170,150);
  if (mouseIsPressed) {
    gameScreen=1
     scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  }
}

function playGame() {
  song2 = loadSound('Star Wars Soundtrack Episode III ,Extended Edition Rolling With Grievous (HD).mp3');
  background(img3);
  ship.update(mouseX);
  ship.display();
  for (var i = 0; i < tiefighter.length; i = i + 1) {
    tiefighter[i].move();
    tiefighter[i].display();
  }
  for (var i = 0; i < bullets.length; i = i + 1) {
    bullets[i].move();
    bullets[i].display();
    for (var j = 0; j < tiefighter.length; j = j + 1) {
      if (bullets[i].collide(tiefighter[j])) {
        var prevScore = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Score = ' + (prevScore + 1));
        tiefighter.splice(j, 1)
        bullets[i].y=0
      }

    }
  }
}

//Constructor function
function Ship(img) {
  this.x = width / 2;
  this.y = height - 40;
  this.img = img


  this.display = function() {
    //code to draw ship
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, 70, 80);
    pop()
  }

  this.update = function(x) {
    this.x = x;
  }
}

// Jitter class
function Jitter(img) {
  this.x = random(width);
  this.y = random(height / 2);
  this.diameter = random(40, 40);
  this.speed = 2;
  this.img = img;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.diameter, this.diameter);
    pop();
  };
}


function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.diameter = 5;
  this.speed = 12;
  this.collide = function(tf) {
    d = dist(this.x, this.y, tf.x, tf.y);
    if (d < this.diameter / 2 + tf.diameter)
      return true
    else return false

  }


  this.move = function() {

    this.y += -this.speed;
  };

  this.display = function() {
    fill("red");
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}