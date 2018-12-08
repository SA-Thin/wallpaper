var numBalls = 50;
var bounce = 0.5;
var grav = 0.01;
var fric = -1;
var balls = [];


function setup() {
  createCanvas(1920, 1080);
  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(10, 115),
      i,
      balls
    );
  }
  stroke(900);
  fill(250, 100, 0);
}

function draw() {
  background(0, 100, 250);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

function Ball(xin, yin, din, idin, oin) {
  this.x = xin;
  this.y = yin;
  var vx = 0;
  var vy = 0;
  this.diameter = din;
  this.id = idin;
  this.others = oin;
  this.hue = random(0, 50)

  this.collide = function() {
    for (var i = this.id + 1; i < numBalls; i++) {
      var dx = this.others[i].x - this.x;
      var dy = this.others[i].y - this.y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        var angle = atan2(dy, dx);
        var targetX = this.x + cos(angle) * minDist;
        var targetY = this.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].x) * bounce;
        var ay = (targetY - this.others[i].y) * bounce;
        vx -= ax;
        vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
        this.hue = random(0, 200)
      }
    }
  };

  this.move = function() {
    vy += grav;
    this.x += vx;
    this.y += vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      vx *= fric;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      vx *= fric;
      this.hue = random(0, 200)
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      vy *= fric;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      vy *= fric;
      this.hue = random(0, 100)
    }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    this.hue = random(0, 100)
  };
  
}