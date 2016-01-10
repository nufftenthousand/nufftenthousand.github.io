$(document).ready(function(){

var highScoreCookieName = "nate256highscore";
initGame();

function initGame() {
  initScoreboard();
  initGrid();
  initKeyEvents();
  initTouchEvents();
}

function initGrid() {
  grid = new Array(4);
  for ( var r=0; r<4; r++ ) {
    grid[r] = new Array(4);
    for ( var c=0; c<4; c++ ) {
      grid[r][c] = null;
    }
  }
  paintGrid();
  freshTile();
}

function initScoreboard() {
  highScore = getStoredHighScore();
  score = 0;
  paintHighScore();
  paintScore();
}

function initTouchEvents() {
  var options = {
    preventDefault: true
  };
  swipeableElement = document.getElementById('grid');
  var mc = new Hammer(swipeableElement, options);
  mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  mc.on('swipeleft', function(ev) {
    move('left');
  });
  mc.on('swipeup', function(ev) {
    move('up');
  });
  mc.on('swiperight', function(ev) {
    move('right');
  });
  mc.on('swipedown', function(ev) {
    move('down');
  });
}

function initKeyEvents() {
  document.onkeydown = function(e) {
    var evt = e || window.event;
    if ( evt.keyCode >= 37 && evt.keyCode <= 40 ) {
      evt.preventDefault();

      switch (evt.keyCode) {
        case 37:
          move('left');
        break;
        case 38:
          move('up');
        break;
        case 39:
          move('right');
        break;
        case 40:
          move('down');
        break;
      }

    }
  };
}

function alterCell(r, c) {
  var cell = getCellID(r, c);
  $(cell).empty();
  $(cell).attr('class', 'cell');
  if ( grid[r][c] ) {
    $(cell).addClass('n'+grid[r][c]);
    $(cell).append(grid[r][c]);
  }
}

function paintGrid() {
  for ( var r=0; r<4; r++ ) {
    for ( var c=0; c<4; c++ ) {
      alterCell(r, c);
    }
  }
}

function paintCell(r,c,fresh) {
  var cell = getCellID(r, c);
  alterCell(r, c);
  $(cell).addClass('fresh');
}

function getCellID(r, c) {
  return '#cell-'+(4*r+c);
}

function getStoredHighScore() {
  var value = Cookies.get(highScoreCookieName);
  if ( value === undefined ) {      // haven't played yet
    Cookies.set(highScoreCookieName, 0); // have a cookie
    return 0;
  }
  return parseInt(value, 10);
}

function newHighScore(newScore) {
  if ( newScore > highScore ) {
    Cookies.set(highScoreCookieName, newScore);
    return true;
  } else {
    return false;
  }
}

function paintHighScore() {
  $('#highScore').html( highScore );
}

function paintScore() {
  $('#score').html(score);
}

function addToScore(incrementBy) {
  score = score + incrementBy;
  paintScore();
}

function consolodateLine(line) {
  var pre = 0;
  for ( var i=0; i<line.length; i++ ) {
    if (line[i] == pre) {   // adjacent cells are equal
      line[i] = line[i]*2;  // combine
      addToScore(line[i]);
      pre = 0;
      line.splice(i-1,1);
      i--;
    } else {
      pre = line[i];
    }
  }
}

function siphonFromGrid(r,c,line) {
  if (grid[r][c]) {
    line.push(grid[r][c]);
    grid[r][c] = null;
  }
}

function siphonToGrid(r,c,i,line) {
  grid[r][c] = line[i];
}

function move(direction) {
  var prevGrid = duplicateGrid();

  switch (direction) {
    case 'left':
      moveLeft();
    break;
    case 'up':
      moveUp();
    break;
    case 'right':
      moveRight();
    break;
    case 'down':
      moveDown();
    break;
  }

  paintGrid();

  if ( tilesMoved(grid, prevGrid) ) {
    freshTile();
  }
}

function moveLeft() {
  for ( var r=0; r<4; r++ ) {
    var line = [];
    for ( var c=0; c<4; c++ ) {
      siphonFromGrid(r,c,line);
    }
    consolodateLine(line);
    for ( var c=0; c<line.length; c++ ) {
      siphonToGrid(r,c,c,line);
    }
  }
}

function moveRight() {
  for ( var r=0; r<4; r++ ) {
    var line = [];
    for ( var c=3; c>=0; c-- ) {
      siphonFromGrid(r,c,line);
    }
    consolodateLine(line);
    var i = line.length - 1;
    for ( var c=(4-line.length); c<4; c++ ) {
      // alert(c);
      siphonToGrid(r,c,i,line);
      i--;
    }
  }
}

function moveUp() {
  for ( var c=0; c<4; c++ ) {
    var line = [];
    for ( var r=0; r<4; r++ ) {
      siphonFromGrid(r,c,line);
    }
    consolodateLine(line);
    for ( var r=0; r<line.length; r++ ) {
      siphonToGrid(r,c,r,line);
    }
  }
}

function moveDown() {
  for ( var c=0; c<4; c++ ) {
    var line = [];
    for ( var r=3; r>=0; r-- ) {
      siphonFromGrid(r,c,line);
    }
    consolodateLine(line);
    var i = line.length - 1;
    for ( var r=(4-line.length); r<4; r++ ) {
      // alert(c);
      siphonToGrid(r,c,i,line);
      i--;
    }
  }
}

function freshTile() {
  var emptyCells = [];
  for ( var r=0; r<4; r++ ) {
    for ( var c=0; c<4; c++ ) {
      if ( !grid[r][c] ) {
        emptyCells.push(4*r+c);
      }
    }
  }
  var rndMax = emptyCells.length;
  var rnd = Math.floor(Math.random() * rndMax);
  var cellNum = emptyCells[rnd];
  var tileValRnd = Math.floor(Math.random() * 10);
  var tileVal = null;
  if ( tileValRnd < 8 ) {
    tileVal = 2;
  } else {
    tileVal = 4;
  }
  var cellC = cellNum % 4;
  var cellR = (cellNum - cellC) / 4;
  grid[cellR][cellC] = tileVal;

  var fresh = true;
  paintCell(cellR,cellC,fresh);
}

function tilesMoved(a, b) {
  var gridIsFull = true;
  var movement = false;
  for ( var i = 0; i < a.length; i++ ) {
    for ( var j = 0; j < a[i].length; j++ ) {
      if ( a[i][j] == null ) gridIsFull = false;
      if ( a[i][j] != b[i][j] ) movement = true;
    }
  }
  if ( gridIsFull ) endGame();
  return movement;
}

function duplicateGrid() {
  var copy = new Array(4);
  for ( var i = 0; i < 4; i++ ) {
    copy[i] = new Array(4);
    for ( var j = 0; j < 4; j++ ) {
      copy[i][j] = grid[i][j];
    }
  }
  return copy;
}

function endGame() {
  var message = "Not bad, but my dog got " + score*2 + " by walking on my keyboard. Play again?";
  if ( newHighScore(score) ) {   // updates if higher than before
    message = "New high score: " + score + "\n" + message;
  } else {
    message = "Your score: " + score + "\n" + message;
  }

  var playAgain = confirm( message );
  if ( playAgain ) {
    initGame();
  }
}

});
