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
							 '<i class="far fa-file-alt"></i>'];
let list = document.querySelectorAll(".fancy-cymbol");
let starts = {};
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
}

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
})

window.addEventListener("resize", adaptWindow);

darkBackground.addEventListener("click", function() {		//закрытие окна создания/редактирования при нажатии за его область
	hideEditWindow();
})

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
	})
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
	document.querySelector(".from-left").style.left = 0;
}

function prepareWindow(typeOfWindow) {		//функция подготовки окна создания/редактирования
	let form;
	callWindow.innerHTML += '<div></div>';
	switch (typeOfWindow) {
		case "order-call":
			callWindow.firstChild.innerHTML += '<h2 class="submit-window__header">Заказать звонок</h2>';
			callWindow.firstChild.innerHTML += '<form method="post"></form>';
			form = document.querySelector("form");
			form.innerHTML += '<label><p class="submit-window__label">Ваш номер телефона:</p><input required autofocus class="submit-window__input input_s" type="tel" name="usrtel"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Как к вам обращаться?</p><input required class="submit-window__input input_s" type="text" name="usrname"></label>';
			form.innerHTML += '<input class="submit-window__submit-button button button_purple" class="button_purple" type="submit" value="Заказать">';
			break;
		case "make-order":
			callWindow.firstChild.innerHTML += '<h2 class="submit-window__header">Заказать проект</h2>';
			callWindow.firstChild.innerHTML += '<form method="post"></form>';
			form = document.querySelector("form");
			form.innerHTML += '<label><p class="submit-window__label">Ваш номер телефона:</p><input required autofocus class="submit-window__input input_s" type="tel" name="usrtel"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Как к вам обращаться?</p><input required class="submit-window__input input_s" type="text" name="usrname"></label>';
			form.innerHTML += '<label><p class="submit-window__label">Комментарий к заказу:</p><textarea required class="submit-window__input input_m" name="commentary"></textarea></label>';
			form.innerHTML += '<input class="submit-window__submit-button button button_purple" class="button_purple" type="submit" value="Заказать проект">';
	}
	callWindow.innerHTML += '<div class="submit-window__close-button"></div>';
	document.querySelector(".submit-window__close-button").addEventListener("click", hideEditWindow);
	document.querySelector(".submit-window__submit-button").addEventListener("click", function(e) {
		evt.preventDefault();
		let formData;
		if (typeOfWindow == 'make-order') {
			formData = {
		    usrtel: document.querySelector('input[name="usrtel"]').value,
		    usrname: document.querySelector('input[name="usrname"]').value,
		    commentary: document.querySelector('input[name="commentary"]').value
		  };
		} else {
			formData = {
		    usrtel: document.querySelector('input[name="usrtel"]').value,
		    usrname: document.querySelector('input[name="usrname"]').value
		  };
		}

	  let request = new XMLHttpRequest();
	  request.addEventListener('load', function() {
	    // В этой части кода можно обрабатывать ответ от сервера
	    console.log(request.response);
	    alert('Ваша заявка успешно отправлена!');
	    form.innerHTML = '<h2>Спасибо за заявку!</h2>';
	  });
	  request.open('POST', '/send.php', true);
	  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	  request.send('name=' + encodeURIComponent(formData.usrname) + '&email=fearistoff713@gmail.com');
	})
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
	appearInfoWindow()
});

aboutMeMobile.addEventListener("click", function () {
	appearInfoWindow()
});

pricingInfo.addEventListener("click", function () {
	document.querySelector("#prices").scrollIntoView({block: "center", behavior: "smooth"});
});