$(document).ready(function(){

var highScoreCookieName = "nate256highscore";
initGame();

function initGame() {
  initScoreboard();
  initGrid();
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

function stroke(dir) {
  switch(dir) {
    case 'u':
      break;
    case 'd':
      break;
    case 'l':
      break;
    case 'r':
      break;
    default:
      alert('Invalid direction'); // debug
  }
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

function simKeyPress(code) {
  jQuery.event.trigger({ type: 'keypress', which: code });
}

var options = {};
$('#grid').hammer(options).bind("swipeleft", simKeyPress(37));
$('#grid').hammer(options).bind("swipeup", simKeyPress(38));
$('#grid').hammer(options).bind("swiperight", simKeyPress(39));
$('#grid').hammer(options).bind("swipedown", simKeyPress(40));

document.onkeydown = function(e) {
  var evt = e || window.event;
  if ( evt.keyCode >= 37 && evt.keyCode <= 40 ) {
    evt.preventDefault();

    var prevGrid = duplicateGrid();

    switch (evt.keyCode) {
      case 37:
        moveLeft();
      break;
      case 38:
        moveUp();
      break;
      case 39:
        moveRight();
      break;
      case 40:
        moveDown();
      break;
    }

    paintGrid();
    if ( tilesMoved(grid, prevGrid) ) {
      freshTile();
    }

    // $('#test').empty();
    // echo('grid:');
    // testPrintGrid(grid);
    // br();
    // echo('prevGrid:');
    // testPrintGrid(prevGrid);

  }
};

// testPainting();

function testPainting() {
  grid[0][0] = 16;
  grid[0][1] = 32;
  grid[0][2] = 64;
  grid[0][3] = 128;
  grid[1][0] = 256;
  grid[1][1] = 512;
  grid[1][2] = 1024;
  grid[1][3] = 2048;
  paintGrid();
  grid[0][0] = 16;
  grid[0][1] = 16;
  grid[0][2] = 16;
  grid[0][3] = 16;
  grid[1][0] = 256;
  grid[1][1] = 512;
  grid[1][2] = 512;
  grid[1][3] = 512;
  paintGrid();
  grid[0][0] = 16;
  grid[0][1] = 16;
  grid[0][2] = 16;
  grid[0][3] = 128;
  grid[1][0] = 512;
  grid[1][1] = 512;
  grid[1][2] = 512;
  grid[1][3] = 128;
  grid[2][0] = 16;
  grid[2][1] = null;
  grid[2][2] = null;
  grid[2][3] = 16;
  grid[3][0] = null;
  grid[3][1] = null;
  grid[3][2] = null;
  grid[3][3] = 512;
  paintGrid();
}

function testPrintGrid(x) {
  for ( var i = 0; i < x.length; i++ ) {
    var row = '';
    for ( var j = 0; j < x[i].length; j++) {
      row = row + x[i][j] + ' ';
    }
    echo(row);
  }
}

function testArrFunc() {
  var arr = ['a','b','c','d','d','f'];
  function printTestArr() {
    for (var i = 0; i < arr.length; i++) {
      $('#test').append(arr[i]+' ');
    }
    $('#test').append('<br>');
  }
  $('#test').append('<br>');
  $('#test').append('<br>');
  printTestArr();
  arr.splice(3,1);
  printTestArr();

  $('#test').append('<br>');
}

function br() {
  $('#test').append('<br>');
}

function echo(str) {
  $('#test').append(str+'<br>');
}

});
