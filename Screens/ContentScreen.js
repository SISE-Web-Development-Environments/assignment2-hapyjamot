$(document).ready(function(){
    //set menu
    $("#menu_welcome").click(function(){showInContentByID("welcome")});
    $("#menu_register").click(function(){showInContentByID("registration")});
    $("#menu_login").click(function(){showInContentByID("login")});
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
    $("#register_to_login").click(function(){showInContentByID("login")});
    $("#register_to_welcome").click(function(){showInContentByID("welcome")});
})
function showInContentByID(id){
    $('.page').hide();
    $('#'.concat(id)).show("fast","swing");
}