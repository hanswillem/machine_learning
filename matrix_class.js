class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    this.init();
  }


  // initialize this matrix by setting all values to 0
  init() {
    for (let i = 0; i < this.rows; i++) {
      let rw = [];
      for (let j = 0; j < this.cols; j++) {
        rw.push(0);
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
    let newMatrix = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {      
      let newRow = [];
      for (let j = 0; j < m.cols; j++) {
        let dotprod = this.dot(this.getRow(i), m.getCol(j));
        newRow.push(dotprod);
      }
      newMatrix.matrix[i] = newRow;
    }
    return newMatrix;
  }

  
}
