"use strict";

let isMenuShowing = false;
let fancyPlace = document.querySelector(".info");
let tagsLib = ["&lt;div&gt;", "&lt;\/&gt;", "#", 
							 '<i class="fas fa-terminal"></i>', 
							 '<i class="fab fa-css3"></i>',
							 '<i class="fas fa-code-branch"></i>',
							 '<i class="fas fa-laptop-code"></i>',
							 '<i class="far fa-file-code"></i>',
							 '<i class="far fa-window-restore"></i>',
							 '<i class="fas fa-qrcode"></i>',
							 '<i class="fas fa-sitemap"></i>',
							 '<i class="far fa-keyboard"></i>',
							 '<i class="fas fa-bug"></i>',
							 '<i class="far fa-folder"></i>',
							 '<i class="far fa-file-alt"></i>',
							 '<i class="fab fa-html5"></i>',
							 '<i class="fab fa-js"></i>',
							 '<i class="fab fa-font-awesome-flag"></i>'];
let list = document.querySelectorAll(".fancy-cymbol");
let starts = {};
let currentCarousellItem = 0;
let windowIdentificator;
let headerOrderCallButton = document.querySelector(".header__call-button");
let headerOrderCallButtonMobile = document.querySelector(".header__call-button-small");
let footerOrderCallButton = document.querySelector(".footer__button");
let callWindow = document.querySelector(".submit-window");
let darkBackground = document.querySelector(".dark-background");
let makeOrder = document.querySelector(".carousell__button");
let pricingInfo = document.querySelector(".flex-list__button");
let aboutMe = document.querySelector(".infopanel__button");
let aboutMeMobile = document.querySelector(".infopanel__mobile-button");
let aboutMeBack = document.querySelector(".from-left__button");
let carousellLeft = document.querySelector(".arrow_left");
let carousellRight = document.querySelector(".arrow_right");
let carousell = document.querySelector(".carousell__main-list");
let itemWidth = document.querySelector('.carousell__main-item').clientWidth;



function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideEditWindow() {		//функция скрытия окна создания/редактирования элементов
	document.querySelector("body").style.overflow = "";
	document.querySelector(".dark-background").style.opacity = "";
	document.querySelector(".submit-window").style.opacity = "";
	document.querySelector(".submit-window").style.transform = "";
	setTimeout(function() {
		document.querySelector(".submit-window").style.transform = "";
		document.querySelector(".submit-window").style.display = "";
		document.querySelector(".dark-background").style.display = "";
		document.querySelector(".submit-window").innerHTML = "";
		callWindow.style.height = "";
		callWindow.style.overflow = "";
	}, 550);
}

document.onkeyup = function(e) {		//обработка нажатия клавиш
	if (e.keyCode == 13) {
		//enter
	}
	if ((e.keyCode == 27 || e.keyCode == 4) && isMenuShowing) {
		hideEditWindow();  //escape
	}
};

document.querySelector(".header__menu-opener").addEventListener("click", function() {
	if (isMenuShowing) {
		isMenuShowing = false;
		document.querySelector(".header__moblie-menu").style.top = "";
		document.querySelector(".header__menu-opener").style.transform = "";
		document.querySelector(".header__menu-opener").style.backgroundImage = "";
	} else {
		isMenuShowing = true;
		document.querySelector(".header__moblie-menu").style.top = document.querySelector(".header__main-container").clientHeight + "px";
		document.querySelector(".header__menu-opener").style.transform = "rotate(180deg)";
		document.querySelector(".header__menu-opener").style.backgroundImage = "url(img/menu_show.png)";
	}
});

window.addEventListener("resize", adaptWindow);

darkBackground.addEventListener("click", function() {		//закрытие окна создания/редактирования при нажатии за его область
	hideEditWindow();
});

appendFancyCymbols();
setInterval(appendFancyCymbols, 3000);

function appendFancyCymbols() {
	list.forEach(function(item, index) {
		setTimeout(function() {
			item.style.transition = "none";
			item.innerHTML = tagsLib[getRandomFromRange(0, tagsLib.length - 1)];
			item.style.fontSize = getRandomFromRange(20, 40) + "px";
			item.style.top = getRandomFromRange(0, item.parentElement.clientHeight - parseInt(item.style.fontSize)) + "px";
			let multiplier = parseInt(item.style.top)/item.parentElement.clientHeight;
			item.style.color = "rgb(" + (55 + 145*multiplier) + "," + (200 - 145*multiplier) + ",255)";
			item.style.left = getRandomFromRange(0, item.parentElement.clientWidth - window.innerWidth*(1/5)) + "px";
			let start = getRandomFromRange(-50, 50);
			item.style.transform = "rotate(" + start + "deg)";
			setTimeout(function() {
				item.style.opacity = "1";
				item.style.transition = "";
				item.style.transform = "rotate(" + (start + 20*Math.pow(-1, getRandomFromRange(1,4))) + "deg)";
			}, 10);
			setTimeout(function() {
				item.style.opacity = "";
			}, 1500);
		}, 500*index);
	});
}

function adaptWindow() {
	callWindow.style.left = (window.innerWidth*0.5 - callWindow.clientWidth*0.5 - 1) + "px";
	if (window.innerWidth <= 550 || callWindow.clientHeight >= 0.8*window.innerHeight) {
		callWindow.style.top = 0;
	} else {
		callWindow.style.top = '105px';
	}
	if (callWindow.clientHeight >= window.innerHeight) {
		callWindow.style.height = "calc(100% - 42px)";
		callWindow.firstChild.style.overflow = "scroll";
		callWindow.lastChild.style.position = "fixed";
	}
}

function appearEditWindow() {		//функция появления окна создания/редактирования элементов
	document.querySelector("body").style.overflow = "hidden";		//костыли для блока скроллинга
	document.querySelector(".submit-window").style.display = "flex";
	document.querySelector(".dark-background").style.display = "block";
	adaptWindow();
	setTimeout(function() {
		document.querySelector(".dark-background").style.opacity = "0.5";
		document.querySelector(".submit-window").style.opacity = "1";
		document.querySelector(".submit-window").style.transform = "scale(1)";
	}, 50);
}

function appearInfoWindow() {		//функция появления окна создания/редактирования элементов
	document.querySelector(".move").style.marginLeft = "-100%";
}

function hideInfoWindow() {
	document.querySelector(".move").style.marginLeft = "";
};

function prepareWindow(typeOfWindow) {		//функция подготовки окна создания/редактирования
	let form;
	callWindow.innerHTML += '<div></div>';
	switch (typeOfWindow) {
		case "order-call":
			callWindow.firstChild.innerHTML += '<h2 class="submit-window__header">Заказать звонок</h2>';
			callWindow.firstChild.innerHTML += '<form action="send.php" method="post"></form>';
			form = document.querySelector("form");
			form.innerHTML += '<label><p class="submit-window__label">Ваш номер телефона:</p><input required autofocus class="submit-window__input input_s" type="tel" name="usrtel"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Как к вам обращаться?</p><input required class="submit-window__input input_s" type="text" name="usrname"></label>';
			form.innerHTML += '<input class="submit-window__submit-button button button_purple" class="button_purple" type="submit" value="Заказать">';
			break;
		case "make-order":
			callWindow.firstChild.innerHTML += '<h2 class="submit-window__header">Заказать проект</h2>';
			callWindow.firstChild.innerHTML += '<form action="send.php" method="post"></form>';
			form = document.querySelector("form");
			form.innerHTML += '<label><p class="submit-window__label">Ваш номер телефона:</p><input required autofocus class="submit-window__input input_s" type="tel" name="usrtel"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Как к вам обращаться?</p><input required class="submit-window__input input_s" type="text" name="usrname"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Комментарий к заказу:</p><textarea class="submit-window__input input_m" name="commentary"></textarea></label>';
			form.innerHTML += '<input class="submit-window__submit-button button button_purple" class="button_purple" type="submit" value="Заказать проект">';
	}
  form.innerHTML += '<input type="hidden" name="admin_email" value="fearistoff713@gmail.com">';
  form.innerHTML += '<input type="hidden" name="form_subject" value="Заявка с сайта">';
	callWindow.innerHTML += '<div class="submit-window__close-button"></div>';
	document.querySelector(".submit-window__close-button").addEventListener("click", hideEditWindow);
	$("form").submit(function(e) { //Change
		e.preventDefault();
    var mobile = $('input[name="usrtel"]');
    var name = $('input[name="usrname"]');
      if(!mobile.val() || !name.val()){
      	$('.submit-window__submit-button').text('Заполните поля!');
        $('.submit-window__submit-button').css('color','white');
        $('.submit-window__submit-button').css('background-color','#b90d03');
        return false;
      } else {
        var th = $(this);
        $.ajax({
          type: "POST",
          url: "/mail.php", //Change
          data: th.serialize()
        }).done(function() {
          $('.submit-window__submit-button').text('Заявка отправлена!');
          $('.submit-window__submit-button').css('color','white');
          $('.submit-window__submit-button').css('background-color','#05cc47');
          setTimeout(function(){
            hideEditWindow();
          },2000);
          th.trigger("reset");
        });
      }
    return false;
  });
}

headerOrderCallButton.addEventListener("click", function () {
	prepareWindow("order-call");
	appearEditWindow();
});

headerOrderCallButtonMobile.addEventListener("click", function () {
	prepareWindow("order-call");
	appearEditWindow();
});

makeOrder.addEventListener("click", function () {
	prepareWindow("make-order");
	appearEditWindow();
});

footerOrderCallButton.addEventListener("click", function () {
	prepareWindow("order-call");
	appearEditWindow();
});

aboutMe.addEventListener("click", function () {
	appearInfoWindow();
});

aboutMeMobile.addEventListener("click", function () {
	appearInfoWindow();
});

aboutMeBack.addEventListener("click", function () {
	hideInfoWindow();
});

pricingInfo.addEventListener("click", function () {
	document.querySelector("#prices").scrollIntoView({block: "center", behavior: "smooth"});
});

carousellLeft.addEventListener("click", function () {
	scrollCarousell(-1);
})

carousellRight.addEventListener("click", function () {
	scrollCarousell(1);
})

// .dot_selected {
// 	background-color: rgb(200, 55, 255);
// }

carousell.addEventListener("scroll", function() {
	paintDot();
})

function paintDot(argument) {
	setTimeout(function() {
		let indexPosition = Math.round(carousell.scrollLeft/document.querySelector('.carousell__main-item').clientWidth);
		document.querySelectorAll('.carousell__dot').forEach(function(item, index) {
			if (index != indexPosition) {
				item.style.backgroundColor = '';
			} else {
				item.style.backgroundColor = 'rgb(200, 55, 255)';
			}
		})
	},10)
}

paintDot();

dotsSelecting();

function dotsSelecting() {
	let carousellNavigator = document.querySelector('.carousell__dot-navigator');
	let dotsCount = document.querySelectorAll('.carousell__main-item').length;
	carousellNavigator.innerHTML = '';
	for (var i = 0; i < dotsCount; i++) {
		carousellNavigator.innerHTML += '<div class="carousell__dot"></div>';
	}
	let dots = document.querySelectorAll('.carousell__dot');
	dots.forEach(function(item, index) {
		item.addEventListener("click", function() {
			let pathAndDirection = itemWidth*index - carousell.scrollLeft;
			let moveCounter = 0;
			let delta = 0;
			let timerId = setInterval(function() {
				delta = Math.abs(carousell.scrollLeft);
				carousell.scrollLeft += 0.010*pathAndDirection;
				delta -= Math.abs(carousell.scrollLeft);
				if (carousell.scrollLeft >= itemWidth*index - 5 && carousell.scrollLeft <= itemWidth*index + 5 || delta == 0) {
					clearInterval(timerId);
				}
			}, 1);
		})
	})
}

//x*a = y

function scrollCarousell(direct) {
	let moveCounter = 0;
	//document.querySelectorAll(".carousell__main-item")[currentCarousellItem--]scrollIntoView({block: "center", behavior: "smooth"});
	let timerId = setInterval(function() {
		carousell.scrollLeft += 7*direct;
		if (++moveCounter >= itemWidth/7) {
			clearInterval(timerId);
		}
	}, 1);
}