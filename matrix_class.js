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
    transpose(other) {
        let newdata = [];
        for (let i = 0; i < other.cols; i++) {
            newdata.push(other.getCol(i));
        }
        return newdata;
    }


    // adds a number to all the elements of this matrix, or ads another matrix to this data
    // adding another matrix to this matrix only works if the two matrices have the same dimensions
    add(n) {
        if (n instanceof data) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }


    // subtracts a number from all the elements of this matrix, or subtracts another matrix from this matrix
    // subtracting another matrix from this matrix only works if the two matrices have the same dimensions
    sub(n) {
        if (n instanceof data) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
                    this.data[i][j] -= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.data[i].length; j++) {
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
    static dotArr(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }


    // performs a dot product between matrix A and matrix B
    // the columns of A should be equal to the rows of B for the dot product to work
    static dot(ma, mb) {
        let newMatrix = new Matrix(ma.rows, mb.cols);
        let newdata = []
        for (let i = 0; i < ma.rows; i++) {
            let newRow = [];
            for (let j = 0; j < mb.cols; j++) {
                let dotprod = Matrix.dotArr(ma.getRow(i), mb.getCol(j));
                newRow.push(dotprod);
            }
            newdata.push(newRow);
        }
        newMatrix.data = newdata;
        return newMatrix;
    }


    // returns a new matrix with the sigmoid function applied to all elements of m
    static sigmoid(m) {
      let newMatrix = new Matrix(m.rows, m.cols);
      for (let i = 0; i < m.rows; i++) {
        for (let j = 0; j < m.cols; j++) {
          let x = m.data[i][j];
          newMatrix.data[i][j] = 1 / ( 1 + Math.exp(-x) );
        }
      }
      return newMatrix;
    }


    // takes in an array and returns a new matrix with one column
    static fromArray(a) {
      let newMatrix = new Matrix(a.length, 1);
      let newData = [];
      for (let i of a) {
        newData.push([i]);
      }
      newMatrix.data = newData;
      return newMatrix;
    }

}



// ---------------------------- Neural Network ----------------------------



class NN {
  constructor(inputs, hidden, outputs) {
    this.inputs = inputs;
    this.hidden = hidden;
    this.outputs = outputs;
  }

  // m_x = matrix 
  query(arr_inputs) {
    let m_x = Matrix.fromArray(arr_inputs);
    let m_wi = new Matrix(this.hidden, this.inputs);
    m_wi.randomize();
    let m_w_dot_x = Matrix.dot(m_wi, m_x);
    let m_h = Matrix.sigmoid(m_w_dot_x);
    let m_wh = new Matrix(this.outputs, this.hidden);
    m_wh.randomize();
    let m_w_dot_h = Matrix.dot(m_wh, m_h);
    m_w_dot_h.print();
  }


  
}

let n = new NN(3, 2, 2);
n.query([15, 1, .003]);
