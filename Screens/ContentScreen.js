$(document).ready(function(){
    //set menu
    $("#menu_welcome").click(function(){
        settingToggle("hide");
        showInContentByID("welcome")});
    $("#menu_register").click(function(){
        settingToggle("hide");
        showInContentByID("registration")});
    $("#menu_login").click(function(){
        settingToggle("hide");
        showInContentByID("login")});
    //set content
    $('.page').hide();
    $('#welcome').show("fast","swing");
    //set welcome page
    $("#welcome_to_login").click(function(){showInContentByID("login")});
    $("#welcome_to_registration").click(function(){showInContentByID("registration")});
    //set login page
    $("#login_to_register").click(function(){showInContentByID("registration")});
    $("#login_to_welcome").click(function(){showInContentByID("welcome")});
    //set register page
    $("#register_to_welcome").click(function(){showInContentByID("welcome")});
    settingToggle("hide");
})

function showInContentByID(id){
    $('.page').hide();
    $('#'.concat(id)).show("fast","swing");
}

function settingToggle(value){
    if (value === "hide") {
        $('#game_settings').hide();
    }
    else {
        settingsShow();
        $('#game_settings').show("fast","swing");
    }
}

function settingsShow() {
    $("#gameKeyUp").text("Up:".concat(chosenKeys.keyUp))
    $("#gameKeyDown").text("Down:".concat(chosenKeys.keyDown))
    $("#gameKeyLeft").text("Left:".concat(chosenKeys.keyLeft))
    $("#gameKeyRight").text("Right:".concat(chosenKeys.keyRight))
    $("#gameBalls2").text(ballsSettings);
    $("#5point").prop('value',color5);
    $("#15point").prop('value',color15);
    $("#25point").prop('value',color25);
    $("#gameTime2").text(timeSettings);
    $("#gameMonsters2").text(numberOfMonsters);
}

