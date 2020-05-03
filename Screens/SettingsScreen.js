var chosen = null;
var chosenKeys = {
    keyUp: 'ArrowUp'
}
$(document).ready(function() {
    $("#save_settings").click(function(){
        settingToggle("show");
        showInContentByID("app");
    });

    handleKeyEvent("linkUp","keyUp","chosenUp");
    handleKeyEvent("linkDown","keyDown","chosenDown");
    handleKeyEvent("linkLeft","keyLeft","chosenLeft");
    handleKeyEvent("linkRight","keyRight","chosenRight");
})
// function validateKey

// function save


function handleKeyEvent(button, modal, saveField){
    $("#".concat(button)).click(function() {
        $("#".concat(modal)).modal({
            escapeClose: false,
            // showClose: false,
            clickClose: false
        })
        $("#".concat(modal)).keydown(function(e) {
        assignKeyBind(e,saveField);
    });
        var confirmId = '#confirmKeyUp';
        const t = $(confirmId);
        $(confirmId).click(function(e){
            e.preventDefault();
            console.log('checking if valid')
            // chosenKeys[]
        })

    });
}

function assignKeyBind(e, idSave) {
    chosen = e.code;

    $("#".concat(idSave)).text(chosen);
}

function outputNumber(val) {
    document.querySelector('#balls').value = val;
}

function outputTime(val) {
    document.querySelector('#time').value = val;
}
