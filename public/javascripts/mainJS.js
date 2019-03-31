document.getElementById("open-menu").addEventListener("click", function(){
    menu = this.parentNode.childNodes[1];
    menu.classList.add("show-menu");
});
document.getElementById("close-menu").addEventListener("click", function(){
    menu = this.parentNode.parentNode;
    menu.classList.remove("show-menu");
});