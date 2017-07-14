class Matrix(object):
    
    def __init__(self, m):
        self.m = m
        
    def add(self, n):
        
        # if n is an int or a float
        if isinstance(n, int) or isinstance(n, float):
            for i in range(len(self.m)):
                for j in range(len(self.m[i])):
                    self.m[i][j] += n
        
        # if  is another matrix
        if isinstance(n, Matrix):
            for i in range(len(self.m)):
                for j in range(len(self.m[i])):
                    self.m[i][j] += n.m[i][j]
    
    
    def getRow(self, n):
        return self.m[n]
    
    
    def getColl(self, n):
        c = []
        for i in self.m:
            c.append(i[n])
        return c
    
    
    def dotVec(self, v1, v2):
        multSum = 0
        for i in range(len(v1)):
            multSum += v1[i] * v2[i]
            
        return multSum
    
    
    # calculate the dot product of this matrix with matrix n
    # return the result as a new matrix
    # the number of collumns of this matrix must be equal to the number of rows of matrix n
    def dot(self, n):
        l = []
        lm = []
        numRows = len(self.m)
        numColls = len(n.m[0])
        
        for i in range(numRows):
            r = self.getRow(i)
            for j in range(numColls):
                c = n.getColl(j)
                l.append(self.dotVec(r, c))
        
        ind = 0
        for i in range(numRows):
            lm.append(l[ind : ind + numColls])
            ind += numColls
    
        return Matrix(lm)
