var p, d;


function setup() {
  createCanvas(720, 405)
  background(225);

  p = new Perceptron(2);
}


function Perceptron(numInputs) {
  this.numInputs = numInputs;
  this.weights = [];
  this.c = 0.1;
  this.bias = 1;
  //init random weights
  for (var i = 0; i < this.numInputs; i++) {
    this.weights.push(random(-1, 1));
  }


  this.feedForward = function(inputs) {
    // sum weighted inputs
    sumWeightedInputs = 0;
    for (var i = 0; i < this.numInputs; i++) {
      sumWeightedInputs += inputs[i] * this.weights[i];
    }
    // activation
    if (sumWeightedInputs < 0) {
      return -1
    } else {
      return 1
    }
  }


  this.train = function(train_inputs, training_known) {
    // get guess and error
    var guess = this.feedForward(train_inputs)
    var error = training_known - guess;
    //adjust weights
    for (var i = 0; i < this.numInputs; i++) {
      this.weights[i] += error * train_inputs[i] * this.c;
    }
  }
}
