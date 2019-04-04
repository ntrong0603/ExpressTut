document.getElementById("open-menu").addEventListener("click", function(e) {
  e.stopPropagation();
  var menu = this.parentNode.childNodes[1];
  menu.classList.remove("close-menu");
  menu.classList.add("show-menu");
});
document.getElementById("close-menu").addEventListener("click", function() {
  var menu = this.parentNode.parentNode;
  menu.classList.remove("show-menu");
  menu.classList.add("close-menu");
});
document.addEventListener("click", function() {
  var menu = document.getElementById("main-menu");
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    menu.classList.add("close-menu");
  }
});

//select box
var tagSelect, i, j, selElmnt, objCheck, selectNew, itemSelectNew;
/*look for any elements with the class "custom-select":*/
tagSelect = document.getElementsByClassName("custom-select-not-bootstrap");
for (i = 0; i < tagSelect.length; i++) {
  selElmnt = tagSelect[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  objCheck = document.createElement("DIV");
  objCheck.setAttribute("class", "select-selected");
  objCheck.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  tagSelect[i].appendChild(objCheck);
  /*for each element, create a new DIV that will contain the option list:*/
  selectNew = document.createElement("DIV");
  selectNew.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    itemSelectNew = document.createElement("DIV");
    itemSelectNew.innerHTML = selElmnt.options[j].innerHTML;
    itemSelectNew.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    selectNew.appendChild(itemSelectNew);
  }
  tagSelect[i].appendChild(selectNew);
  objCheck.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var select_Items,
    select_Item_Selected,
    i,
    arrNo = [];
  select_Items = document.getElementsByClassName("select-items");
  select_Item_Selected = document.getElementsByClassName("select-selected");
  for (i = 0; i < select_Item_Selected.length; i++) {
    if (elmnt == select_Item_Selected[i]) {
      arrNo.push(i);
    } else {
      select_Item_Selected[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < select_Items.length; i++) {
    if (arrNo.indexOf(i)) {
      select_Items[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

$(document).on("ready", function() {
  $(".conten-slider").slick({
		dots: false,

		arrows: true
  });
});
