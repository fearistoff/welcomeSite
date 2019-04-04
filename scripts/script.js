let isMenuShowing = false;
let fancyPlace = document.querySelector(".info");
let tagsLib = ["&lt;div&gt;", "&lt;\/&gt;", "#"];
let list = document.querySelectorAll(".fancy-cymbol");
let starts = {};

function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

appendFancyCymbols();
setInterval(appendFancyCymbols, 5000);

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