// P5.js

var p, d;

function setup(){
  createCanvas(720, 405);
  background(225);
  p = new Perceptron();
  d = [];
  stroke(0);
  noFill();
  line(0, height / 2, width, height / 2)
  createTrainingData(1000);

  frameRate(5);
}


function mouseClicked() {
  pushTrainingDataToPerceptron();
  console.log('new training');
}

function draw() {
  background(225);
  stroke(0);
  noFill();

  line(0, height / 2, width, height / 2);
  drawDots();
  pushTrainingDataToPerceptron();
}


function pushTrainingDataToPerceptron() {
  for (var i = 0; i < d.length; i++) {
    p.train(d[i]);
  }
}


function createTrainingData(n) {
  for (var i = 0; i < n; i++) {
    var x = random(width);
    var y = random(height);
    d.push(new Dot(x, y));
  }
}


function drawDots() {
  for (var i = 0; i < d.length; i++) {
    noStroke();
    d[i].show();
  }
}


function Dot(x, y) {
  this.x = x;
  this.y = y;
  this.latestGuess = 0;

  if (this.y < height / 2) {
    this.label = 1;
  } else {
    this.label = -1
  }

  this.show = function() {
    if (this.latestGuess == this.label) {
      if (this.label == -1) {
        fill(255, 0, 0);
      } else {
        fill(0, 255, 0);
      }
    } else {
      fill(0, 0, 0);
    }
    ellipse(this.x, this.y, 10, 10);
  }
}


function Perceptron() {
  this.weights = [random(-1, 1), random(-1, 1), random(-1, 1)];
  this.bias = 1;
  this.c = .01;

  // sum and multiply by weights
  this.feedForward = function(inputDot) {
    s = 0;
    s += map(inputDot.x, 0, width, -1, 1)  * this.weights[0];
    s += map(inputDot.y, 0, height, -1, 1) * this.weights[1];

    // activation
    if (s < 0) {
      inputDot.latestGuess = -1
      return -1
    } else {
      inputDot.latestGuess = 1
      return 1
    }
  }


  // train the perceptron
  this.train = function(training_inputDot) {
    // calculate error
    var guess = this.feedForward(training_inputDot);
    var known = training_inputDot.label;
    var error = known - guess;
    //adjust weights
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[0] += error * training_inputDot.x * this.c;
      this.weights[1] += error * training_inputDot.y * this.c;
      this.weights[2] += error * this.bias * this.c;
    }
  }
}
