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
  dot(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }


  // multiply this matrix with matrix m and return the result in a new matrix
  product(m) {
    let newMatrix = []
    for (let i = 0; i < this.rows; i++) {
      let newRow = [];
      for (let j = 0; j < m.cols; j++) {
        let dotprod = this.dot(this.getRow(i), m.getCol(j));
        newRow.push(dotprod);
      }
      newMatrix.push(newRow);
    }
    this.matrix = newMatrix;
  }


  // return a new matrix with the columns of this matrix as its rows, and the rows of this matrix as its columns
  transpose() {
    let newMatrix = [];
    for (let i = 0; i < this.cols; i++) {
      newMatrix.push(this.getCol(i));
    }
    this.matrix = newMatrix;
  }


  // adds a number to all the elements of this matrix, or ads another matrix to this matrix
  add(n) {
    if (n instanceof Matrix) {
      // ad another matrix to this matrix - only works if the two matrices have the same dimensions
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] += n.matrix[i][j];
        }
      }
    } else {
      
      // ad a number to every element of this matrix
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.matrix[i].length; j++) {
          this.matrix[i][j] += n;
        }
      }
    }
  }

}


m1 = new Matrix(3, 2);
console.log(m1.matrix)
m1.transpose();
console.log(m1.matrix)
