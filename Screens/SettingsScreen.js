var chosen = null;
var noConfirm = false;
var chosenKeys = {
    keyUp: 'ArrowUp',
    keyDown: 'ArrowDown',
    keyLeft: 'ArrowLeft',
    keyRight: 'ArrowRight',
}
$(document).ready(function() {
    $("#save_settings").click(function(){
        settingToggle("show");
        showInContentByID("app");
    });
    $("#chosenUpConfirmed").text(chosenKeys.keyUp)
    $("#chosenDownConfirmed").text(chosenKeys.keyDown)
    $("#chosenLeftConfirmed").text(chosenKeys.keyLeft)
    $("#chosenRightConfirmed").text(chosenKeys.keyRight)

    handleKeyEvent("linkUp","keyUp","chosenUp","confirmKeyUp");
    handleKeyEvent("linkDown","keyDown","chosenDown");
    handleKeyEvent("linkLeft","keyLeft","chosenLeft");
    handleKeyEvent("linkRight","keyRight","chosenRight");
})

function handleKeyEvent(button, modal, saveField, confirmId){
    $("#".concat(button)).click(function(e) {
        e.preventDefault()
        const jModal = $(this).modal({
            escapeClose: false,
            // showClose: false,
            clickClose: false,
            beforeClose: function(e){
                confirm(chosen, modal, confirmId);
            },
            focus: this,
        });
        $("#".concat(modal)).trigger('focus');
        $("#".concat(modal)).keydown(function(e) {
            $("#errorUp").text("");
            assignKeyBind(e,saveField);
        });
    });
    // $(document).on($.modal.CLOSE, function(e){
    //     confirm(chosen, modal, confirmId);
    //     // if (noConfirm) {
    //     //     e.preventDefault();
    // });
    // $("#".concat(modal)).on('close', function(){
    //     confirm(chosen, modal, confirmId);
    // })
    $("#".concat(confirmId)).click(function(e){
        confirm(chosen, modal, confirmId);
        // $("#".concat(modal)).modal().toggle();
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
}

function outputNumber(val) {
    document.querySelector('#balls').value = val;
}

function outputTime(val) {
    document.querySelector('#time').value = val;
}
$(document).ready(function() {
    $("#save_settings").click(function(){
        setBallColors("favcolor5","favcolor15","favcolor25");
        showInContentByID("app"); 
    });
})
