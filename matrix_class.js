class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        this.init();
    }


    // initialize this data by setting all values to a random number
    init() {
        for (let i = 0; i < this.rows; i++) {
            let rw = [];
            for (let j = 0; j < this.cols; j++) {
                rw.push(Math.floor(Math.random() * 5));
            }
            this.data.push(rw);
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


    // return the dot product between two arrays
    dotArr(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }


    // perform a dot product between this matrix and another matrix
    // the columns of this matrix should equal the rows of the other matrix for the dot product to work
    dot(other) {
        if (this.cols != other.rows) {
            return false
        }
        let newdata = []
        for (let i = 0; i < this.rows; i++) {
            let newRow = [];
            for (let j = 0; j < other.cols; j++) {
                let dotprod = this.dotArr(this.getRow(i), other.getCol(j));
                newRow.push(dotprod);
            }
            newdata.push(newRow);
        }
        this.data = newdata;
    }


    // multiply by a scalar or by another matrix
    // if other is a matrix multiply each element of this matrix with the corresponding element of other matrix
    // if other is not a matrix multiply each element with other
    mult(other) {
        if (other instanceof data) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= other.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= other;
                }
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
    flat() {
        let flatdata = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                flatdata.push(this.data[i][j]);
            }
        }
        return flatdata;
    }


    // prints this.data to the console
    print() {
        console.log(this.data);
    }

}
