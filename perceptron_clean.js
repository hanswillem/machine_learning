class Perceptron {
  constructor(numInputs) {
    this.numInputs = numInputs;
    this.weights = [];
    this.c = 0.1;
    this.bias = 1;  // not used
    
    // init random weights
    for (let i = 0; i < this.numInputs; i++) {
      this.weights.push(Math.random() * 2 - 1);
    }
  }


  feedForward(inputs) {
    // sum weighted inputs
    let sumWeightedInputs = 0;
    for (let i = 0; i < this.numInputs; i++) {
      sumWeightedInputs += inputs[i] * this.weights[i];
    }
    // activation
    if (sumWeightedInputs < 0) {
      return -1
    } else {
      return 1
    }
  }


  train(inputs, known) {
    // get guess and error
    let guess = this.feedForward(inputs)
    let error = known - guess;
    // adjust weights
    for (let i = 0; i < this.numInputs; i++) {
      this.weights[i] += error * inputs[i] * this.c;
    }
  }
  
}
