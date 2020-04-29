console.log("Hello World!");

function setUpLoginScreen(){
    //set up the input elements
    var userNameText = document.createElement("input");
    var UserPassword = document.createElement("input");
    var loginButton = document.createElement("button");
    var body = document.getElementsByTagName("body");
    body.console.write("<input type=\"text\" name=\"userName\"><br>");
    body.console.write("<input type=\"password\" name=\"userPassword\"><br>");
    body.console.write("<input type=\"submit\" name=\"LoginButton\"><br>");
    //body.chilred.add(userNameText);
    //body.chilred.add(UserPassword);
    //body.chilred.add(loginButton);
}
localStorage.setItem("p","p");
            $(document).ready(function(){
                $("#login_button_id").click(function(){
                    $(".login_element").toggle("slow","swing");
                });
                $("#send_button").click(function(){
                    authenticate(
                    document.getElementById("username_id_test").value,
                    document.getElementById("password_id_test").value);
                    });

            });
            function authenticate(userName,password){
                var UserLabel = document.getElementById("after_login_label");
                var GuestLabal = document.getElementById("guest_label");   
                var LoginButton = document.getElementById("login_button_id");              
                if(localStorage.getItem(userName)!=null){
                    UserLabel.innerText="Welcome, ";
                    UserLabel.append(userName);
                    UserLabel.hidden=false;
                    GuestLabal.hidden=true;
                    $(".login_element").toggle("fast","swing");
                    LoginButton.innerText="Switch Account";
                }
                else{
                    UserLabel.hidden=true;
                    UserLabel.innerText="Welcome, ";
                    GuestLabal.hidden=false;
                    LoginButton.innerText="Login";
                    $(".login_element").toggle("fast","swing");
                }
            };
