var keyCode = null;
var keyName = null;
var numberOfMonsters = 1;

var chosenKeys = {
    keyUp: 'ArrowUp',
    keyDown: 'ArrowDown',
    keyLeft: 'ArrowLeft',
    keyRight: 'ArrowRight',
}

var chosenKeysNumbers = {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39,   
}

$(document).ready(function() {
    $("#save_settings").click(function(){
        settingToggle("show");
        Play();
        setBallColors("favcolor5","favcolor15","favcolor25");
        showInContentByID("app"); 
    });
    updateKeys();
    handleKeyEvent("linkUp","keyUp","chosenUp","confirmKeyUp","errorUp");
    handleKeyEvent("linkDown","keyDown","chosenDown","confirmKeyDown","errorDown");
    handleKeyEvent("linkLeft","keyLeft","chosenLeft","confirmKeyLeft","errorLeft");
    handleKeyEvent("linkRight","keyRight","chosenRight","confirmKeyRight","errorRight");
    $("select.monsters").change(function(){
        numberOfMonsters = $(this).children("option:selected").val();
    });
})

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
    document.querySelector('#balls').value = val;
}

function outputTime(val) {
    document.querySelector('#time').value = val;
}

function updateKeys() {
    $("#chosenUpConfirmed").text(chosenKeys.keyUp)
    $("#chosenDownConfirmed").text(chosenKeys.keyDown)
    $("#chosenLeftConfirmed").text(chosenKeys.keyLeft)
    $("#chosenRightConfirmed").text(chosenKeys.keyRight)
}
