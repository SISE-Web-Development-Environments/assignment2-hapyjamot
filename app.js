var context;
var shape = new Object();
var monsters = new Array();
var moving_point = new Object();
var board;
var sprite_board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
//magic numbers
const PACMAN = 2;
const MONSTER = 6;
const MOVING_POINT = 7;
const WALL = 4;
const PILL = 3;
const BALL_5 = 5;
const BALL_15 = 15;
const BALL_25 = 25;
const blockSize = 60;
//ball counters
var ball5Counter;
var ball15Counter;
var ball25Counter;
//color holders
var color5;
var color15;
var color25;
//movement directions
var directionXpacman=0;
var directionYpacman=0;
//
var initial_angle = 0.15 * Math.PI;
var eyeOffsetX = 5;
var eyeOffsetY = -15;
//
var hult = true;
//for the pacman lives
var pacman_remain;
//music player
var musicPlayer;
var screenRows = 10;
var screenCols = 10;
$(document).ready(function () {
  //Play();
  musicPlayer = document.getElementById("music");
  $("#switch").click(function () {
    stopGame();
    settingToggle("hide");
    showInContentByID("login");
  });
  $("#newGame").click(function () {
    stopGame();
    Play();
  });
});

function stopGame() {
  time_elapsed = 0;
  window.clearInterval(interval);
}

function Play() {
  context = canvas.getContext("2d");
  Start();
}

function Start() {
  board = new Array();
  sprite_board = new Array();
  //set the amount of monsters
  for(var i=0;i<numberOfMonsters;i++){
	monsters[i] = new Object();
}
if(monsters.length>0){
	monsters[0].i=0;
	monsters[0].j=0;
	monsters[0].color = "pink";
}	
if(monsters.length>1){
	monsters[1].i=screenRows - 1;
	monsters[1].j=0;
	monsters[1].color = "orange";
}
if(monsters.length>2){
	monsters[2].i=screenRows -1;
	monsters[2].j=screenCols - 1;
	monsters[2].color = "red";
}	
if(monsters.length>3){
	monsters[3].i=0;
	monsters[3].j=screenCols - 1;
	monsters[3].color = "green";
}
	
  score = 0;
  pac_color = "yellow";
  var cnt = 100;
  pacman_remain = 1;
  start_time = new Date();
  //use the value from the settings screen
  var food_remain = document.getElementById("rangeOfBalls").value;
  //set counters
  ball5Counter = 0;
  ball15Counter = 0;
  ball25Counter = 0;
  //set empty boards
  for (var i = 0; i < screenRows; i++) {
    board[i] = new Array();
    sprite_board[i] = new Array();
    for (var j = 0; j < screenCols; j++) {
      board[i][j] = 0;
      sprite_board[i][j] = 0;
    }
  }
  for (var i = 0; i < screenRows; i++) {
    //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    var original_food_remain = document.getElementById("rangeOfBalls").value;
    for (var j = 0; j < screenCols; j++) {
      //set walls in both boards
      if (
        (i == 2 && j >= 2 && j <= 3) ||
        (i == 2 && j >= 6 && j <= 7) ||
        (i == 7 && j >= 2 && j <= 3) ||
        (i == 7 && j >= 6 && j <= 7) ||
        (i == 3 && (j == 2 || j == 7)) ||
        (i == 4 && j == 2) ||
        (i == 5 && j == 7) ||
        (i == 6 && (j == 2 || j == 7))
      ) {
        board[i][j] = WALL;
        sprite_board[i][j] = WALL;
      } else {
        var randomNum = Math.random();
        if (randomNum <= (1.0 * food_remain) / cnt) {
          food_remain--;
          var number;
          if (ball25Counter / original_food_remain < 0.1) {
            number = BALL_25;
            ball25Counter++;
          } else if (ball15Counter / original_food_remain < 0.3) {
            number = BALL_15;
            ball15Counter++;
          } else if (ball5Counter / original_food_remain < 0.6) {
            number = BALL_5;
            ball5Counter++;
          }
          var emptyCell = findRandomEmptyCell(board);
          board[emptyCell[0]][emptyCell[1]] = number;
        } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
          shape.i = i;
          shape.j = j;
          pacman_remain--;
          board[i][j] = PACMAN;
          sprite_board[i][j] = PACMAN;
        } else {
          board[i][j] = 0;
        }
        cnt--;
      }
    }
  }
  //set a random pill in an empty cell
  var pillCell = findRandomEmptyCell(board);
  board[pillCell[0]][pillCell[1]] = PILL;
  //set the moving point position
  var movingPointCell = findRandomEmptyCell(board);
  moving_point.i = movingPointCell[0];
  moving_point.j = movingPointCell[1];
  moving_point.valid = true;
  sprite_board[movingPointCell[0]][movingPointCell[1]] = MOVING_POINT;
  while (food_remain > 0) {
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = BALL_5;
    food_remain--;
  }
  keysDown = {};
  addEventListener(
    "keydown",
    function (e) {
      keysDown[e.keyCode] = true;
    },
    false
  );
  addEventListener(
    "keyup",
    function (e) {
      keysDown[e.keyCode] = false;
    },
    false
  );
  interval = setInterval(UpdatePosition, 250);
  //dont forget the first 5 lives
  pacman_remain = 5;
  hult = false;
  musicPlayer.play();
}
//finds a random empty cell on the board
function findRandomEmptyCell(board) {
  var i = Math.floor(Math.random() * screenRows);
  var j = Math.floor(Math.random() * screenCols);
  while (board[i][j] != 0) {
    i = Math.floor(Math.random() * screenRows);
    j = Math.floor(Math.random() * screenCols);
  }
  return [i, j];
}

function GetKeyPressed() {
  if (keysDown[chosenKeysNumbers.keyUp] || keysDown[38]) {
    //move up
    return 1;
  }
  if (keysDown[chosenKeysNumbers.keyDown] || keysDown[40]) {
    //move down
    return 2;
  }
  if (keysDown[chosenKeysNumbers.keyLeft] || keysDown[37]) {
    //move left
    return 3;
  }
  if (keysDown[chosenKeysNumbers.keyRight] || keysDown[39]) {
    //move right
    return 4;
  }
}

function Draw() {
  canvas.width = canvas.width; //clean board
  lblScore.value = score;
  lblTime.value = Math.floor(document.getElementById("rangeOfTime").value - time_elapsed);
  lblLives.value = pacman_remain;
  for (var i = 0; i < screenRows; i++) {
    for (var j = 0; j < screenCols; j++) {
      var center = new Object();
      center.x = i * 60 + 30;
      center.y = j * 60 + 30;
      if (board[i][j] == PACMAN) {
        context.beginPath();
        context.arc(
          center.x,
          center.y,
          30,
          initial_angle,
          initial_angle + 1.65 * Math.PI
        ); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(
          center.x + eyeOffsetX,
          center.y + eyeOffsetY,
          5,
          0,
          2 * Math.PI
        ); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == 1) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
      } else if (board[i][j] == WALL) {
        context.beginPath();
        context.rect(center.x - 30, center.y - 30, 60, 20);
        context.fillStyle = "grey"; //color
        context.fill();
      }
      /// extra custom item will look like a red circle
      else if (board[i][j] == PILL) {
        context.beginPath();
        context.arc(center.x, center.y, 20, 0, 2 * Math.PI); //circle
        context.fillStyle = "red"; //color
        context.fill();
        context.beginPath();
        context.arc(center.x, center.y, 7, 0, 2 * Math.PI); //circle
        context.fillStyle = "white"; //color
        context.fill();
      }
      /// the different color balls
      else if (board[i][j] == BALL_5) {
        context.beginPath();
        context.arc(center.x, center.y, 7, 0, 2 * Math.PI); //circle
        context.fillStyle = color5; //color
        context.fill();
        context.beginPath();
        context.font = "15px Georgia";
        context.fillStyle = "black";
        context.fillText("5", center.x - 4, center.y + 3);
        context.fill();
      } else if (board[i][j] == BALL_15) {
        context.beginPath();
        context.arc(center.x, center.y, 12, 0, 2 * Math.PI); //circle
        context.fillStyle = color15; //color
        context.fill();
        context.beginPath();
        context.font = "20px Georgia";
        context.fillStyle = "black";
        context.fillText("15", center.x - screenRows - 1, center.y + 4);
        context.fill();
      } else if (board[i][j] == BALL_25) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); //circle
        context.fillStyle = color25; //color
        context.fill();
        context.beginPath();
        context.font = "25px Georgia";
        context.fillStyle = "black";
        context.fillText("25", center.x - 13, center.y + 6);
        context.fill();
      }
      //check sprite_board
      if (sprite_board[i][j] == MONSTER) {
		var monsterNumber = getMonsterInPosotion(i,j);
		var monsterImage = new Image(1,1);
		monsterImage.setAttribute('x',center.x-10);
		monsterImage.setAttribute('y',center.y-10);
		monsterImage.setAttribute('width',4);
		monsterImage.setAttribute('height',4);
		context.beginPath();
		monsterImage.src = "./Styles/images/Pacman_ghost"+monsterNumber+".svg";
		//monsterImage.onload = function() {
		context.drawImage(monsterImage, center.x-10, center.y-10,1,1);
		//}			
		context.fill();
		context.beginPath();
		context.arc(center.x, center.y, 30, Math.PI, 0*Math.PI); // half circle
		context.lineTo(center.x, center.y);
		context.fillStyle = monsters[monsterNumber].color; //color
		context.fill();
		context.beginPath();
		context.rect(center.x-30, center.y, 60, 30);
		context.fillStyle = monsters[monsterNumber].color; //color
		context.fill();
		context.beginPath();
		context.arc(center.x + 10, center.y - 10, 7, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
		context.beginPath();
		context.arc(center.x - 10, center.y - 10, 7, 0, 2 * Math.PI); // circle
		context.fillStyle = "white"; //color
		context.fill();
      } else if (
        sprite_board[i][j] == MOVING_POINT &&
        moving_point.valid == true
      ) {
        context.beginPath();
        context.arc(center.x, center.y, 25, 0, 2 * Math.PI); // circle
        context.fillStyle = "black"; //color
        context.fill();
        context.beginPath();
        context.arc(center.x, center.y, 20, 0, 2 * Math.PI); // circle
        context.fillStyle = "white"; //color
        context.fill();
        context.beginPath();
        context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
        context.fillStyle = "red"; //color
        context.fill();
      }
    }
  }
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	if(!hult){
		for(var i=0;i<monsters.length;i++){
			sprite_board[monsters[i].i][monsters[i].j] = 0;
			moveMonster(i);
			sprite_board[monsters[i].i][monsters[i].j] = MONSTER;
		}
		movePoint();	
	}
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != WALL) {
			//move up
			initial_angle = 1.65 * Math.PI;
			eyeOffsetX = -15;
			eyeOffsetY = -5;
			//shape.j--;
			directionYpacman = -1;
			directionXpacman = 0;
		}
	}
	if (x == 2) {
		if (shape.j < screenCols - 1 && board[shape.i][shape.j + 1] != WALL) {
			//move down
			initial_angle = 0.75 * Math.PI;
			eyeOffsetX = -15;
			eyeOffsetY = 5;
			//shape.j++;
			directionYpacman = 1;
			directionXpacman = 0;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != WALL) {
			//move left
			initial_angle = 1.15 * Math.PI;
			eyeOffsetX = -5;
			eyeOffsetY = -15;
			//shape.i--;
			directionXpacman = -1;
			directionYpacman = 0;
		}
	}
	if (x == 4) {
		if (shape.i < (screenRows - 1) && board[shape.i + 1][shape.j] != WALL) {
			//move right
			initial_angle = 0.15 * Math.PI;
			eyeOffsetX = 5;
			eyeOffsetY = -15;
			//shape.i++;
			directionXpacman = 1;
			directionYpacman = 0;
		}
	}
	if(directionXpacman!=0){
		switch(shape.i){
			case 0:{
					if(directionXpacman==-1)
						directionXpacman=0;
					break;
					}
			case 9:{
				if(directionXpacman==1)
					directionXpacman=0;
				break;
			}
			default:{
				if((board[shape.i-1][shape.j]==WALL&&directionXpacman==-1)||
					(board[shape.i+1][shape.j]==WALL&&directionXpacman==1))
					directionXpacman=0;
				break;
			}
		}
	}
	if(directionYpacman!=0){
		switch(shape.j){
			case 0:{
					if(directionYpacman==-1)
						directionYpacman=0;
					break;
					}
			case 9:{
				if(directionYpacman==1)
					directionYpacman=0;
				break;
			}
			default:{
				if((board[shape.i][shape.j-1]==WALL&&directionYpacman==-1)||
					(board[shape.i][shape.j+1]==WALL&&directionYpacman==1))
					directionYpacman=0;
				break;
			}
		}
	}	
	//move pacman according to the last key pressed
	shape.i+=directionXpacman;
	shape.j+=directionYpacman;
	
  //increment the lives counter
  if (board[shape.i][shape.j] == PILL) {
    pacman_remain++;
    //lblLives.value = pacman_remain;
  }
  //check for the different types of balls
  else if (board[shape.i][shape.j] == BALL_5) {
    score += 5;
  } else if (board[shape.i][shape.j] == BALL_15) {
    score += 15;
  } else if (board[shape.i][shape.j] == BALL_25) {
    score += 25;
  }
  //check for the different types of sprites
  if (sprite_board[shape.i][shape.j] == MONSTER) {
    pacman_remain--;
    score -= 10;
    board[shape.i][shape.j] = 0;
    var newPosition = findRandomEmptyCell(board);
    shape.i = newPosition[0];
    shape.j = newPosition[1];
    board[shape.i][shape.j] = PACMAN;
    if (pacman_remain == 0 && hult == false) {
      hult = true;
	  window.clearInterval(interval);
	  musicPlayer.pause();
      alert("Loser!");
    }
  } else if (sprite_board[shape.i][shape.j] == MOVING_POINT) {
    sprite_board[shape.i][shape.j] = 0;
    moving_point.valid = false;
    score += 50;
  }
  board[shape.i][shape.j] = PACMAN;
  sprite_board[shape.i][shape.j] = PACMAN;
  var currentTime = new Date();
  time_elapsed = (currentTime - start_time) / 1000;
  if (score >= 100 && time_elapsed <= 10) {
    pac_color = "green";
  }
  if (time_elapsed > document.getElementById("rangeOfTime").value) {
	hult = true;
	musicPlayer.pause();
    window.clearInterval(interval);
    if (score <= 100) {
      window.alert("You are better Then " + score + " points!!!");
    } else {
      window.alert("Winner!");
    }
  } else if (!checkForPoints()) {
	hult = true;
	musicPlayer.pause();
    window.clearInterval(interval);
    if (score <= 100) {
      window.alert("You are better Then " + score + " points!!!");
    } else {
      window.alert("Winner!");
    }
  }
    Draw();
}
// default id's "favcolor5","favcolor15","favcolor25"
function setBallColors() {
  ballColors("favcolor5", "favcolor15", "favcolor25");
}
// variable id's
function ballColors(color5ID, color15ID, color25ID) {
  color5 = document.getElementById(color5ID).value;
  color15 = document.getElementById(color15ID).value;
  color25 = document.getElementById(color25ID).value;
}
function moveMonster(number) {
  var rnd = rndNum();
  //smartMoveMonster(number);
  if (rnd % 7 == 0) randomMoveMonster(number);
  else smartMoveMonster(number);
}
function smartMoveMonster(number) {
  var directionX = 0;
  var directionY = 0;
  var x = monsters[number].i;
  var y = monsters[number].j;
  //check for barriars
  var canMoveUp =
    y != 0 && board[x][y - 1] != WALL && sprite_board[x][y - 1] != MOVING_POINT;
  var canMoveDown =
    y != screenCols - 1 &&
    board[x][y + 1] != WALL &&
    sprite_board[x][y + 1] != MOVING_POINT;
  var canMoveRight =
    x != screenRows - 1 &&
    board[x + 1][y] != WALL &&
    sprite_board[x + 1][y] != MOVING_POINT;
  var canMoveLeft =
    x != 0 && board[x - 1][y] != WALL && sprite_board[x - 1][y] != MOVING_POINT;
  //check for the player
  var shouldMoveUp = y > shape.j;
  var shouldMoveDown = y < shape.j;
  var shouldMoveRight = x < shape.i;
  var shouldMoveLeft = x > shape.i;

  //check movement on y axis
  if (!shouldMoveUp && !shouldMoveDown) {
    directionY = 0;
  } else {
    if (shouldMoveUp) {
      if (canMoveUp) {
        directionY = -1;
      }
    }
    if (shouldMoveDown) {
      if (canMoveDown) {
        directionY = 1;
      }
    }
  }
  //check movement on x axis
  if (!shouldMoveRight && !shouldMoveLeft) {
    directionX = 0;
  } else {
    if (shouldMoveRight) {
      if (canMoveRight) {
        directionX = 1;
      }
    }
    if (shouldMoveLeft) {
      if (canMoveLeft) {
        directionX = -1;
      }
    }
  }
  if (rndNum() % 2 == 0) monsters[number].i += directionX;
  else monsters[number].j += directionY;
}
function randomMoveMonster(number) {
  var x = monsters[number].i;
  var y = monsters[number].j;
  var canMoveUp =
    y != 0 && board[x][y - 1] != WALL && sprite_board[x][y - 1] != MOVING_POINT;
  var canMoveDown =
    y != screenCols - 1 &&
    board[x][y + 1] != WALL &&
    sprite_board[x][y + 1] != MOVING_POINT;
  var canMoveRight =
    x != screenRows - 1 &&
    board[x + 1][y] != WALL &&
    sprite_board[x + 1][y] != MOVING_POINT;
  var canMoveLeft =
    x != 0 && board[x - 1][y] != WALL && sprite_board[x - 1][y] != MOVING_POINT;
  var rnd = rndNum() % 4;
  var didntMove = true;
  while (didntMove) {
    if (rnd == 0) {
      if (canMoveUp) {
        monsters[number].j -= 1;
        didntMove = false;
      }
    } else if (rnd == 1) {
      if (canMoveDown) {
        monsters[number].j += 1;
        didntMove = false;
      }
    } else if (rnd == 2) {
      if (canMoveRight) {
        monsters[number].i += 1;
        didntMove = false;
      }
    } else {
      if (canMoveLeft) {
        monsters[number].i -= 1;
        didntMove = false;
      }
    }
    rnd = rndNum() % 4;
  }
}
function rndNum() {
  return Math.floor(Math.random() * 10);
}
function movePoint() {
  if (moving_point.valid == false) return;
  var rnd = rndNum() % 4;
  var x = moving_point.i;
  var y = moving_point.j;
  sprite_board[x][y] = 0;
  var canMoveUp =
    y != 0 && board[x][y - 1] != WALL && sprite_board[x][y - 1] != MONSTER;
  var canMoveDown =
    y != screenCols - 1 &&
    board[x][y + 1] != WALL &&
    sprite_board[x][y + 1] != MONSTER;
  var canMoveRight =
    x != screenRows - 1 &&
    board[x + 1][y] != WALL &&
    sprite_board[x + 1][y] != MONSTER;
  var canMoveLeft =
    x != 0 && board[x - 1][y] != WALL && sprite_board[x - 1][y] != MONSTER;
  var didntMove = true;
  while (didntMove) {
    if (rnd == 0) {
      if (canMoveUp) {
        moving_point.j -= 1;
        didntMove = false;
      }
    } else if (rnd == 1) {
      if (canMoveDown) {
        moving_point.j += 1;
        didntMove = false;
      }
    } else if (rnd == 2) {
      if (canMoveRight) {
        moving_point.i += 1;
        didntMove = false;
      }
    } else {
      if (canMoveLeft) {
        moving_point.i -= 1;
        didntMove = false;
      }
    }
    rnd = rndNum() % 4;
  }
  sprite_board[moving_point.i][moving_point.j] = MOVING_POINT;
}

function checkForPoints(){
	for(let i=0;i<screenRows;i++){
		for(let j=0;j<screenCols;j++){
			if(
				board[i][j]==PILL||
				board[i][j]==BALL_5||
				board[i][j]==BALL_15||
				board[i][j]==BALL_25||
				sprite_board[i][j]==MOVING_POINT){
					return true;
				}
		}
	}
	return false;
}
function getMonsterInPosotion(i,j)
{
	if(monsters==null||monsters.length==0)
		return -1; 
	for(var k=0;k<monsters.length;k++)
	{
		if(monsters[k].i==i&&monsters[k].j==j)
			return k;
	}
	return -1;
}
function checkForPoints() {
  for (let i = 0; i < screenRows; i++) {
    for (let j = 0; j < screenCols; j++) {
      if (
        board[i][j] == PILL ||
        board[i][j] == BALL_5 ||
        board[i][j] == BALL_15 ||
        board[i][j] == BALL_25 ||
        sprite_board[i][j] == MOVING_POINT
      ) {
        return true;
      }
    }
  }
  return false;
}
