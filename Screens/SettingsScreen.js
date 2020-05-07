var keyCode = null;
var keyName = null;
var chosenKeys = null;
var chosenKeysNumbers = null;
var numberOfMonsters = null;
var ballsSettings = null;
var timeSettings = null;
var colorFive = null;
var colorFift = null;
var colorTwenty = null;

const DefaultSettings = {
    defaultChosenKeys: {
        keyUp: 'ArrowUp',
        keyDown: 'ArrowDown',
        keyLeft: 'ArrowLeft',
        keyRight: 'ArrowRight',
    },
    defaultChosenKeysNumbers: {
        keyUp: 38,
        keyDown: 40,
        keyLeft: 37,
        keyRight: 39,  
    },
    balls: 70,
    time: 180,
    monsters: 0,
    color5: "#ff0000",
    color15: "#ffff00",
    color25: "#0000ff",
}

$(document).ready(function() {

    handleKeyEvent("linkUp","keyUp","chosenUp","confirmKeyUp","errorUp");
    handleKeyEvent("linkDown","keyDown","chosenDown","confirmKeyDown","errorDown");
    handleKeyEvent("linkLeft","keyLeft","chosenLeft","confirmKeyLeft","errorLeft");
    handleKeyEvent("linkRight","keyRight","chosenRight","confirmKeyRight","errorRight");
    $("select.monsters").change(function(){
        numberOfMonsters = $(this).children("option:selected").val();
    });
    $("#save_settings").click(function(){
        save();
    });
    $("#random").click(function(){
        updateSettings(true);
        save();
    });
})

function save(){
    setBallColors("favcolor5","favcolor15","favcolor25");
    settingToggle("show");
    Play();
    showInContentByID("app"); 
}

function handleKeyEvent(button, modal, saveField, confirmId, errorId){
    $("#".concat(button)).click(function(e) {
        e.preventDefault()
        $(this).modal({
            escapeClose: false,
            clickClose: false,
        });
        $("#".concat(modal)).trigger('focus');
        $("#".concat(modal)).keydown(function(e) {
            $("#".concat(errorId)).text("");
            assignKeyBind(e,saveField);
        });
    });
    $("#".concat(confirmId)).click(function(e){
        confirm(confirmId);
    })

}

function assignKeyBind(e, idSave) {
    keyCode = e.keyCode;
    keyName = e.code;
    $("#".concat(idSave)).text(keyName);
}

function confirm(id) {
    var error_message = "Duplication exists, Please choose another key"
    if (id === "confirmKeyUp") {
        if (keyCode === chosenKeysNumbers.keyDown || keyCode === chosenKeysNumbers.keyLeft || keyCode === chosenKeysNumbers.keyRight) {
            $("#errorUp").text(error_message);
        }
        else {
            chosenKeysNumbers.keyUp = keyCode;
            chosenKeys.keyUp = keyName;
            $.modal.close();
        }
    }
    if (id === "confirmKeyDown") {
        if (keyCode === chosenKeysNumbers.keyUp || keyCode === chosenKeysNumbers.keyLeft || keyCode === chosenKeysNumbers.keyRight) {
            $("#errorDown").text(error_message);
        }
        else {
            chosenKeysNumbers.keyDown = keyCode;
            chosenKeys.keyDown = keyName;
            $.modal.close();
        }
    }
    if (id === "confirmKeyLeft") {
        if (keyCode === chosenKeysNumbers.keyUp || keyCode === chosenKeysNumbers.keyDown || keyCode === chosenKeysNumbers.keyRight) {
            $("#errorLeft").text(error_message);
        }
        else {
            chosenKeysNumbers.keyLeft = keyCode;
            chosenKeys.keyLeft = keyName;
            $.modal.close();
        }
    }
    if (id === "confirmKeyRight") {
        if (keyCode === chosenKeysNumbers.keyUp || keyCode === chosenKeysNumbers.keyDown || keyCode === chosenKeysNumbers.keyLeft) {
            $("#errorRight").text(error_message);
        }
        else {
            chosenKeysNumbers.keyRight= keyCode;
            chosenKeys.keyRight = keyName;
            $.modal.close();
        }
    }
    updateKeys();
}

function outputNumber(val) {
    ballsSettings = val;
    document.querySelector('#balls').value = val;
}

function outputTime(val) {
    timeSettings = val;
    document.querySelector('#time').value = val;
}
function generateRandomNumber(start, end){
    return Math.round(Math.random(end - start)) + start;
}
function updateSettings(random) {
    chosenKeys = {
        keyUp: DefaultSettings.defaultChosenKeys.keyUp,
        keyDown: DefaultSettings.defaultChosenKeys.keyDown,
        keyLeft: DefaultSettings.defaultChosenKeys.keyLeft,
        keyRight: DefaultSettings.defaultChosenKeys.keyRight,
    };
    chosenKeysNumbers = {
        keyUp: DefaultSettings.defaultChosenKeysNumbers.keyUp,
        keyDown: DefaultSettings.defaultChosenKeysNumbers.keyDown,
        keyLeft: DefaultSettings.defaultChosenKeysNumbers.keyLeft,
        keyRight: DefaultSettings.defaultChosenKeysNumbers.keyRight,
    };
    updateKeys();

    if (random) {
        balls = generateRandomNumber(50,90) 
        time = generateRandomNumber(60,360); 
        monsters = generateRandomNumber(0,3);
        colorFive = getRandomColor();
        colorFift = getRandomColor();
        colorTwenty = getRandomColor(); 
    }
    else {
        balls = DefaultSettings.balls;
        time = DefaultSettings.time; 
        monsters = DefaultSettings.monsters;
        colorFive = DefaultSettings.color5;
        colorFift = DefaultSettings.color15;
        colorTwenty = DefaultSettings.color25; 
    }
    $('#rangeOfBalls').prop('value',''.concat(balls));
    $('#rangeOfTime').prop('value',''.concat(time));
    outputNumber(balls);
    outputTime(time);
    $('#select_monsters').prop('selectedIndex',monsters);
    numberOfMonsters = monsters+1;
    $('#favcolor5').prop('value',colorFive);
    $('#favcolor15').prop('value',colorFift);
    $('#favcolor25').prop('value',colorTwenty);
}

function updateKeys() {
    $("#chosenUpConfirmed").text(chosenKeys.keyUp)
    $("#chosenDownConfirmed").text(chosenKeys.keyDown)
    $("#chosenLeftConfirmed").text(chosenKeys.keyLeft)
    $("#chosenRightConfirmed").text(chosenKeys.keyRight)
}

function getRandomColor() {
    let lettersToChoose = '0123456789ABCDEF';
    let randomColor = '#';
    for (var i = 0; i < 6; i++) {
        randomColor += lettersToChoose[Math.floor(Math.random() * 16)];
    }
    return randomColor;
}


