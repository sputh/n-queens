/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

  */

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n});
  var rows = solution.rows();
  for (var i = 0; i < n; i++) {
    rows[i][i] = 1;
  }

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return rows;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  // function placeAt(rowIndex, columnIndex):
  // if (can place a rook in rows[rowIndex][columnIndex])
  //   place it at columnIndex
  //   if (rowIndex === n - 1)
  //     solutionCount++
  //   else
  //     placeAt(rowIndex + 1, 0)
  //   rows[rowIndex][columnIndex] = 0
  //
  // if (columnIndex < n - 1)
  //   placeAt(rowIndex, columnIndex + 1)
  //
  var fillBoardStartingAt = function(rowIndex, columnIndex) {
    // Try to place at row, column; i.e. place it at row, column, check for conflicts
    board.togglePiece(rowIndex, columnIndex);
    if(!board.hasColConflictAt(columnIndex) && !board.hasRowConflictAt(rowIndex)) {
     // If we successfully added to the last row, increment count
     if (rowIndex === n-1) {
      solutionCount++;
        //console.log(JSON.stringify(rows));
      // If not the last row, try to place one on the next row
    } else {
      fillBoardStartingAt(rowIndex + 1, 0);
    }
  }
    // Remove the piece and continue
    board.togglePiece(rowIndex, columnIndex);
    // If we are not on the last column, try to place in the next column
    if(columnIndex < n - 1) {
      fillBoardStartingAt(rowIndex, columnIndex + 1);
    }
  }

  fillBoardStartingAt(0,0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n});

  var flag = true;
  var fillBoardStartingAt = function(rowIndex, columnIndex) {
    if (flag === true) {
      solution.togglePiece(rowIndex, columnIndex);
      if(!solution.hasAnyQueenConflictsOn(rowIndex, columnIndex)) {
        if(rowIndex === n - 1) {
          flag = false;
        } else {
          fillBoardStartingAt(rowIndex + 1, 0);
        }
      }
      if (flag === true) {
        solution.togglePiece(rowIndex, columnIndex);
        if (columnIndex < n - 1) {
          fillBoardStartingAt(rowIndex, columnIndex + 1);
        }
      }
    }
  }

  fillBoardStartingAt(0,0);
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; //fixme
  var solution = new Board({n:n});
  var fillBoardStartingAt = function(rowIndex, colIndex) {
    solution.togglePiece(rowIndex, colIndex);
    if(!solution.hasAnyQueenConflictsOn(rowIndex, colIndex)) {
      if(rowIndex === n-1) {
        solutionCount += 1;

      } else {
        fillBoardStartingAt(rowIndex + 1, 0);
      }
    }
    solution.togglePiece(rowIndex, colIndex);
    if(colIndex < n-1) {
      fillBoardStartingAt(rowIndex, colIndex + 1);
    }
  };

  fillBoardStartingAt(0,0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
