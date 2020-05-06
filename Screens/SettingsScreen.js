var chosen = null;
var noConfirm = false;
var numberOfMonsters =1;
var chosenKeys = {
    keyUp: 'ArrowUp',
    keyDown: 'ArrowDown',
    keyLeft: 'ArrowLeft',
    keyRight: 'ArrowRight',
}
$(document).ready(function() {
    $("#save_settings").click(function(){
        settingToggle("show");
        Play();
        setBallColors("favcolor5","favcolor15","favcolor25");
        showInContentByID("app"); 
    });
    updateKeys();
    handleKeyEvent("linkUp","keyUp","chosenUp","confirmKeyUp");
    handleKeyEvent("linkDown","keyDown","chosenDown");
    handleKeyEvent("linkLeft","keyLeft","chosenLeft");
    handleKeyEvent("linkRight","keyRight","chosenRight");
    $("select.monsters").change(function(){
        numberOfMonsters = $(this).children("option:selected").val();
    });
})

function handleKeyEvent(button, modal, saveField, confirmId){
    $("#".concat(button)).click(function(e) {
        e.preventDefault()
        $(this).modal({
            escapeClose: false,
            clickClose: false,
        });
        $("#".concat(modal)).trigger('focus');
        $("#".concat(modal)).keydown(function(e) {
            $("#errorUp").text("");
            assignKeyBind(e,saveField);
        });
    });
    $("#".concat(confirmId)).click(function(e){
        confirm(chosen, modal, confirmId);
    })

}

function assignKeyBind(e, idSave) {
    chosen = e.code;
    $("#".concat(idSave)).text(chosen);
}

function confirm(key, modal, id) {
    var error_message = "Duplication exists, Please choose another key"
    if (id === "confirmKeyUp") {
        if (key === chosenKeys.keyDown || key === chosenKeys.keyLeft || key === chosenKeys.keyRight) {
            $("#errorUp").text(error_message);
            noConfirm = true;
        }
        else {
            chosenKeys.keyUp = key;
            $.modal.close();
            // $("#".concat(modal)).css("display", "none");
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
