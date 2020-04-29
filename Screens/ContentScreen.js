$(document).ready(function(){
    appendElementByID("welcome");
})
function appendElementByID(id){
    var element = document.getElementById(id);
    $('#content_container').append(element);
}