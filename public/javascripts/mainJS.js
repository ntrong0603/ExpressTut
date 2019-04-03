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


$(document).ready(function(){
	//Lấy danh sách slider
	$(".slideshow-container").filter(function(){
		var thisEl=$(this);
		var itemList=thisEl.find(".conten-slider .mySlides");
		var lastHover=0;
		
		//mac dinh doi tuong dau tien hien thi
		//duyet qua cac phan tu
		$.each(itemList, function(i){
			if(i==0){
				$(this).addClass("active");
			}
		});
		//function su ly su kien chuyen anh
		function navigate(type,next){
			//tim phan tu co class la active
			var active=thisEl.find(".conten-slider .active");
			if(next.length<1){
				if(type=="next"){
					//Tiếp
					// lay phan tu cung cap tiep theo
					var next=active.next();
					//neu khong co doi tuong tiep theo thi mac dinh next la doi tuong dau tien
					if(!next.length>0){
						// neu next.length = 0 (khong co doi tuong tiep) thi thuc hien cau lenh duoi
						// 0 > 0 = false phu dinh la true thuc thi cau lenh duoi
						var next=itemList.first();
					}
				}else{
					//Trước
					// lay phan tu cung cap dung truoc
					var next=active.prev();
					if(!next.length>0){
						var next=itemList.last();
					}
				}
			}
			if(next.index()==active.index()){ console.log('aaaa'); return; }
			if(type == 'next') 
			{  
				var opent = 'opennext';
				var close = 'closeprev';
			}else{ 
				var opent = 'openprev';
				var close = 'closenext';
			}
			//Hiệu ứng trượt trái<>phải
			active.addClass(close);
			
			next.addClass(opent);
			next.addClass('active');
			setTimeout(function () {
				active.removeClass();
				active.addClass("mySlides");
				next.removeClass().addClass("mySlides").addClass('active');
			}, 1000);
		}
		//ấn nút tiếp
		thisEl.on("click",".next", function(){
			navigate("next","");
		});

		//ấn nút trước
		thisEl.on("click",".prev", function(){
			navigate("prev","");
		});
		
		//Vuốt để chuyển ảnh
		swipeDetect(thisEl, function(swipe){
			if(swipe=="left"){
				navigate("next","");
			}
			if(swipe=="right"){
				navigate("prev","");
			}
		});

	});
	
	function swipeDetect(el, callback){// doi tuong, ham thuc thi
		var swipedir,startX,startY,distX,distY,
    	threshold = 100, //Khoảng cách tối thiểu để xem là vuốt
    	restraint = 300, // Khoảng cách tối đa khi vuốt
    	allowedTime = 500, //Thời gian tối đa giữ vuốt
    	elapsedTime,startTime,
    	returnSwipe = callback || function(swipedir){}

    	function swipeAction(e){
    		if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
    			var position = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    		} else{
    			e.preventDefault();
    			var position = e;
    		}
    		return position;
    	}
		//su kien nhan chuot
    	el.on("touchstart mousedown", function(e){
    		var position = swipeAction(e);
    		swipedir = 'none';
    		dist = 0;
    		startX = position.pageX;
    		startY = position.pageY;
    		startTime = new Date().getTime();
    	});

		//su kien nha chuot
    	el.on("touchend mouseup", function(e){
    		var position = swipeAction(e);
    		distX = position.pageX - startX;
    		distY = position.pageY - startY;
    		elapsedTime = new Date().getTime() - startTime;
    		if (elapsedTime <= allowedTime){
    			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
    				swipedir = (distX < 0)? 'left' : 'right';
    			}
    			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
    				swipedir = (distY < 0)? 'up' : 'down';
    			}
    		}
			// thuc thi ham callback
    		returnSwipe(swipedir);
    	});
    }
});
