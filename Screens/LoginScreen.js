localStorage.setItem("p","{\"password\":\"p\"}");
$(document).ready(function(){
    $("#login_button_id").click(function(){
         $(".login_element").toggle("slow","swing");
    });
    $("#send_button").click(function(){
         authenticate(
        document.getElementById("login_username_id").value,
        document.getElementById("login_password_id").value);
    });
});
function authenticate(userName,password){
    var UserLabel = document.getElementById("after_login_label");  
    var LoginButton = document.getElementById("send_button");
    var details = localStorage.getItem(userName);           
    if(details!=null){
        var insertedPassword = details.split("\"")[3];
        if(insertedPassword==password){
            UserLabel.innerText="Welcome, ";
            UserLabel.append(userName);
            UserLabel.hidden=false;
            document.getElementById("login_username_id").value="";
            document.getElementById("login_password_id").value="";
            LoginButton.innerText="Switch Account";
        }
        else{
            alert("Wrong user details, please try again.")
        }
    }
    else{
        UserLabel.innerText="Welcome, ";
        LoginButton.innerText="Login";
        alert("Wrong user details, please try again.")
    }
};
