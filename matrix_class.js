class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    this.init();
  }


  // initialize this matrix by setting all values to a random number
  init() {
    for (let i = 0; i < this.rows; i++) {
      let rw = [];
      for (let j = 0; j < this.cols; j++) {
        rw.push(Math.floor(Math.random() * 5));
      }
      this.matrix.push(rw);
    }
  }


  // return row n of this matrix
  getRow(n) {
    return this.matrix[n];
  }


  // return column n of this matrix
  getCol(n) {
    let c = [];
		for (let i = 0; i < this.rows; i++) {
			c.push(this.matrix[i][n]);
		}
		return c;
  }


  // return the dot product between two arrays
  dotArr(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }


  // perform a dot product between this matrix and other matrix
  // the columns of this matrix should equal the rows of the other matrix for the dot product to work
  dot(other) {
    if (this.cols != other.rows) {
      return false
    }
    let newMatrix = []
    for (let i = 0; i < this.rows; i++) {
      let newRow = [];
      for (let j = 0; j < other.cols; j++) {
        let dotprod = this.dotArr(this.getRow(i), other.getCol(j));
        newRow.push(dotprod);
      }
      newMatrix.push(newRow);
    }
    this.matrix = newMatrix;
  }


  // multiply by a scalar or by another matrix
  // if other is a matrix multiply each element of this matrix with the corresponding element of other matrix
  // if other is not a matrix multiply each element with other
  mult(other) {
    if (other instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other.matrix[i][j];
        }
      }  
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other;
        }
      }
    }
  }


  // turn the columns of this matrix into the rows and the rows into the columns
  transpose() {
    let newMatrix = [];
    for (let i = 0; i < this.cols; i++) {
      newMatrix.push(this.getCol(i));
    }
    this.matrix = newMatrix;
  }


  // adds a number to all the elements of this matrix, or ads another matrix to this matrix
  // adding another matrix to this matrix only works if the two matrices have the same dimensions
  add(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] += n;
        }
      }
    }
  }


  // subtracts a number from all the elements of this matrix, or subtracts another matrix from this matrix
  // subtracting another matrix from this matrix only works if the two matrices have the same dimensions
  sub(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] -= n.matrix[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] -= n;
        }
      }
    }
  }


  // returns a flattend array of this.matrix
  flat() {
    let flatMatrix = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        flatMatrix.push(this.matrix[i][j]);
      }
    }
    return flatMatrix;
  }
  
}
