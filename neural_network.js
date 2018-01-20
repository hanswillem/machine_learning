class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        this.init();
    }


    // initialize this data by setting all values to 0
    init() {
        for (let i = 0; i < this.rows; i++) {
            let rw = [];
            for (let j = 0; j < this.cols; j++) {
                rw.push(0);
            }
            this.data.push(rw);
        }
    }


    // fill this matrix with random numbers between -1 and 1
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }


    // fill this matrix with random ints below 5 to do easy math tests
    addtestvals() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.round(Math.random() * 4);
            }
        }
    }


    // return row n of this matrix
    getRow(n) {
        return this.data[n];
    }


    // return column n of this matrix
    getCol(n) {
        let c = [];
        for (let i = 0; i < this.rows; i++) {
            c.push(this.data[i][n]);
        }
        return c;
    }


    // multiply by a scalar
    mult(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }


    // adds a number to all the elements of this matrix, or ads another matrix to this data
    // adding another matrix to this matrix only works if the two matrices have the same dimensions
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }


    // subtracts a number from all the elements of this matrix, or subtracts another matrix from this matrix
    // subtracting another matrix from this matrix only works if the two matrices have the same dimensions
    sub(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= n;
                }
            }
        }
    }


    // returns a flattend array of this matrix
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }


    // prints this.data to the console
    print() {
        console.log(this.data);
    }


    // ---------------------------- static methods ----------------------------


    // ads matrix a to matrix b and returns the result as a new matrix
    static add(a, b) {
        let newMatrix = new Matrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                newMatrix.data[i][j] = a.data[i][j] + b.data[i][j];
            }
        }
        return newMatrix;
    }


    // subtracts matrix a from matrix b and returns the result as a new matrix
    static sub(a, b) {
        let newMatrix = new Matrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                newMatrix.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return newMatrix;
    }


    // returns the dot product between two arrays
    static dot(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }


    // performs a matrix product between matrix A and matrix B
    // the columns of A should be equal to the rows of B for the dot product to work
    static mult(ma, mb) {
        let newMatrix = new Matrix(ma.rows, mb.cols);
        let newdata = []
        for (let i = 0; i < ma.rows; i++) {
            let newRow = [];
            for (let j = 0; j < mb.cols; j++) {
                let matrixprod = Matrix.dot(ma.getRow(i), mb.getCol(j));
                newRow.push(matrixprod);
            }
            newdata.push(newRow);
        }
        newMatrix.data = newdata;
        return newMatrix;
    }


    // apply function fn to all elements of matrix m and return the result in a new matrix
    static applyFunc(m, fn) {
        let newMatrix = new Matrix(m.rows, m.cols);
        for (let i= 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                newMatrix.data[i][j] = fn(m.data[i][j]);
            }
        }
        return newMatrix;
    }


    // takes in an array and returns it in the form of a new matrix with one column
    static fromArray(a) {
      let newMatrix = new Matrix(a.length, 1);
      for (let i = 0; i < a.length; i++) {
        newMatrix.data[i][0] = a[i];
      }
      return newMatrix;
    }


    // returns matrix m (which should have only one column) as an array
    static toArray(m) {
        return m.getCol(0);
    }


    // turn the columns of matrix m  into the rows and the rows into the columns
    static transpose(m) {
        let newMatrix = new Matrix(m.cols, m.rows)
        let newdata = [];
        for (let i = 0; i < m.cols; i++) {
            newdata.push(m.getCol(i));
        }
        newMatrix.data = newdata;
        return newMatrix;
    }

}



// ---------------------------- Neural Network ----------------------------



class NeuralNetwork {
    constructor(i, h, o) {
    this.i = i;
    this.h = h;
    this.o = o;

    // weights and bias matrices
    this.weights_to_hidden = new Matrix(this.h, this.i);
    this.weights_to_outputs = new Matrix(this.o, this.h);
    this.bias_to_hidden = new Matrix(this.h, 1);
    this.bias_to_outputs = new Matrix(this.o, 1);
    // randomizing
    this.weights_to_hidden.randomize();
    this.weights_to_outputs.randomize();
    this.bias_to_hidden.randomize();
    this.bias_to_outputs.randomize();
    }


    // sigmoid function for activation
    sigmoid(x) {
        return 1 / ( 1 + Math.exp(-x) );
    }


    feedForward(inputs_arr) {

        // ----------- from inputs to hidden -----------

        // input matrix
        let inputs = Matrix.fromArray(inputs_arr);
        // multiply inputs by weights
        let hidden = Matrix.mult(this.weights_to_hidden, inputs);
        // add the bias
        hidden.add(this.bias_to_hidden);
        // pass result through activation function (sigmoid)
        hidden = Matrix.applyFunc(hidden, this.sigmoid);


        // ----------- from hidden to outputs -----------

        // multiply hidden by weights
        let outputs = Matrix.mult(this.weights_to_outputs, hidden);
        // add the bias
        outputs.add(this.bias_to_outputs)
        // pass result through activation function (sigmoid)
        outputs = Matrix.applyFunc(outputs, this.sigmoid);
        //return the outputs as an array
        outputs = Matrix.toArray(outputs);
        return outputs;
    }


    // train the network - backpropagation 
    train(inputs_arr, targets_arr) {
        let targets = Matrix.fromArray(targets_arr);

        // feed forward the inputs
        let outputs = this.feedForward(inputs_arr);
        outputs = Matrix.fromArray(outputs);

        // calculate the ouput errors -> errors = target - ouputs
        let errors_outputs = Matrix.sub(targets, outputs);

        // calculate the hidden errors
        let weights_to_outputs_t = Matrix.transpose(this.weights_to_outputs);
        let errors_hidden = Matrix.mult(weights_to_outputs_t, errors_outputs);
      }
}


// ---------------------------------------------------------------------------


let nn = new NeuralNetwork(3, 2, 2);
let inputs = [1, -5, 1];
let targets = [0, 1];

nn.train(inputs, targets);
