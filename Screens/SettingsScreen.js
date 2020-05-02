var chosen = null;

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

function handleKeyEvent(button, modal, saveField){
    $("#".concat(button)).click(function() {
        $("#".concat(modal)).show(function() {
            $("#".concat(modal)).focus();
        });
    });
    $("#".concat(modal)).keydown(function(e) {
        assignKeyBind(e,saveField);
    });
}

function assignKeyBind(e, id){
    if(e.code === 'Escape'){
        finishKeyListening();
    }
    chosen = e.code;
    $("#".concat(id)).text("you chose: ".concat(chosen));
}

function outputUpdate(val) {  
}
