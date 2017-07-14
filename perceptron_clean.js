function Perceptron(numInputs) {
  this.numInputs = numInputs;
  this.weights = [];
  this.c = 0.1;
  this.bias = 1;  // not used
  // init random weights
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

  this.train = function(inputs, known) {
    // get guess and error
    var guess = this.feedForward(inputs)
    var error = known - guess;
    // adjust weights
    for (var i = 0; i < this.numInputs; i++) {
      this.weights[i] += error * inputs[i] * this.c;
    }
  }
}
