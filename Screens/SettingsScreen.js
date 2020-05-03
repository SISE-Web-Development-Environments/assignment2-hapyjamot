var chosen = null;
function outputUpdate(vol) {
    document.querySelector('#balls').value = vol;
}
function assignKeyBind(e){
    if(e.key === 'Escape'){
        finishKeyListening();
    }
    chosen = e.key;
    $('upKeySelectedValue').text(chosen);
    console.log(chosen)
    console.log(1)

}
function finishKeyListening(){
    document.removeEventListener('keydown', assignKeyBind,);
}
function handleKeyEvent(){
    document.addEventListener('keydown', assignKeyBind)
   
}

$(document).ready(function() {
    $("#save_settings").click(function(){
        setBallColors("favcolor5","favcolor15","favcolor25");
        showInContentByID("app"); 
    });
})