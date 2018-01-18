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


    // fill this matrix with random numbers
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random();
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


    // turn the columns of this matrix into the rows and the rows into the columns
    transpose() {
        let newdata = [];
        for (let i = 0; i < this.cols; i++) {
            newdata.push(this.getCol(i));
        }
        this.data = newdata;
        // swap rows and cols vars
        [this.rows, this.cols] = [this.cols, this.rows];
    }


    // adds a number to all the elements of this matrix, or ads another matrix to this data
    // adding another matrix to this matrix only works if the two matrices have the same dimensions
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
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
                for (let j = 0; j < this.data[i].length; j++) {
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
      let newData = [];
      for (let i of a) {
        newData.push([i]);
      }
      newMatrix.data = newData;
      return newMatrix;
    }


    // returns matrix m (which should have only one column) as an array
    static toArray(m) {
        return m.getCol(0);
    }


}



// ---------------------------- Neural Network ----------------------------



// still need to add biasses!!
class NeuralNetwork {
    constructor(i, h, o) {
    this.i = i;
    this.h = h;
    this.o = o;
    
    // weights and bias matrices
    this.weights_to_hidden = new Matrix(this.h, this.i);
    this.bias_to_hidden = new Matrix(this.h, 1);
    this.weights_to_outputs = new Matrix(this.o, this.h);
    this.bias_to_outputs = new Matrix(this.o, 1);
    // randomizing
    this.weights_to_hidden.randomize();
    this.weights_to_outputs.randomize();
    this.bias_to_hidden.randomize();
    this.bias_to_outputs.randomize();
    }


    // sigmoid function for activation
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x) );
    }


    feedForward(arr_inputs) {

        // ----------- from inputs to hidden -----------
        
        // input matrix
        let inputs = Matrix.fromArray(arr_inputs);
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
      
}


// ---------------------------------------------------------------------------


let nn = new NeuralNetwork(3, 1, 1);
let o = nn.feedForward([0, 1, 1])

console.log(o);
