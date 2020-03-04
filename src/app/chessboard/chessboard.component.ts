import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {
  rows = [1, 2, 3, 4, 5, 6, 7, 8];
  cols = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor() { }
  ngOnInit(): void {
  }

  setQueen(i, j) {
    var cell_id = "r" + i + "c" + j;
    document.getElementById(cell_id).setAttribute("class", "chessboard-cell-queen");
  }

  unsetQueen(i, j) {
    var cell_id = "r" + i + "c" + j;
    document.getElementById(cell_id).classList.remove('chessboard-cell-queen');
  }

  isValid(queenLocations, n) {
    console.log(queenLocations);

    for (var i = 0; i < n; i++) {
      console.log(`Checking R${i}C${queenLocations[i]} against R${n}C${queenLocations[n]}`);

      // Check same column
      if (queenLocations[i] == queenLocations[n]) {
        console.log("Invalid - same column.");
        return false;
      }

      // Check same LR diagonal
      if ((n - i) == Math.abs(queenLocations[i] - queenLocations[n])) {
        console.log("Invalid - same LR diagonal");
        return false;
      }

      // Check same RL diagonal
      if ((n - i) == Math.abs(queenLocations[n] - queenLocations[i])) {
        console.log("Invalid - same RL diagonal");
        return false;
      }
    }
    return true;
  }

  eightQueens(queenLocations, n) {
    console.log(`Processing R${n}------------------------------`);
    // If this is the first row, choose a random cell to ensure the same solution isn't found each time
    if (n == 0) {
      var rand_cell = Math.floor(Math.random() * 8) + 1;
      queenLocations[0] = rand_cell;
      if (this.isValid(queenLocations, n)) {
        var qResult = this.eightQueens(queenLocations, n+1);
        if (qResult != false) {
          return qResult;
        }
      }
    }

    if (n == 8) {
      return queenLocations;
    } else {
      // Loop over cols to find valid position
      for (var i = 1; i < 9; i++) {
        queenLocations[n] = i;
        if (this.isValid(queenLocations, n)) {
          var qResult = this.eightQueens(queenLocations, n+1);
          if (qResult != false) {
            return qResult;
          }
        }
      }
      // No valid position was found
      return false;
    }
  }

  run() {
    var queenLocations = this.eightQueens([], 0);
    console.log(queenLocations);

    var r = 1;
    for (let col of queenLocations) {
      this.setQueen(r, col);
      r += 1;
    }

    console.log("Complete!");
  }

  clear() {
    window.location.reload();
  }

}
