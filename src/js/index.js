// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import noUiSlider from 'nouislider';
// console.log('Varvara here');

const bodyWidth = document.body.clientWidth;
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const isFront = document.body.classList.contains('front');
let space = (bodyWidth - 1440) / 2;
if (bodyWidth < 1640) { space = 100; }
if (bodyWidth < 1200) { space = 80; }
if (bodyWidth < 768) { space = 15; }
if (bodyWidth < 411) { space = 10; }

// TICKER
const tickers = document.querySelectorAll('.ticker');
if(tickers.length){
  tickers.forEach((ticker) => {
	if(ticker.dataset.orientation === 'vertical' && bodyWidth > 1199){
		ticker.style.width = window.innerHeight + 'px';
	}
	const tickerContent = ticker.querySelector('.ticker-content');
    const tickerWidth = ticker.clientWidth;
    const tickerContentWidth = tickerContent.scrollWidth;
    const tickerWrapper = document.createElement('div');
    tickerWrapper.classList.add('ticker-wrapper');
	// console.log(`${tickerContent.textContent}  -  ${tickerContentWidth}`);
	if(tickerContentWidth <= tickerWidth){
		let countTicker = Math.ceil(tickerWidth / tickerContentWidth);
		for(let i = 0; i < countTicker + 1; i++){
			tickerWrapper.innerHTML += ticker.innerHTML;
		}
	}
	else{
		tickerContent.style.width = tickerContentWidth + 'px';
		tickerWrapper.innerHTML += ticker.innerHTML;
	}
    ticker.innerHTML = '';
    ticker.append( tickerWrapper );
    ticker.innerHTML += ticker.innerHTML;
	ticker.querySelectorAll('.ticker-wrapper').forEach((i) => {
		i.style.animation = 'scroll 15s infinite linear';
	})
  })
}


// MAIN PAGE
if (isFront) {
	let step = 1;
	let translateX = 0;
	const 
		mainWindow = document.querySelector('.main-window'),
		mainWindowWrap = mainWindow.querySelector('.main-window__body'),
		mainWindowArrow = mainWindow.querySelector('.main-window__arrow'),
		heroSection = mainWindow.querySelector('.main-hero'),
		architectureSection = mainWindow.querySelector('.main-architecture'),
		territorySection = mainWindow.querySelector('.main-territory'),
		chooseSection = mainWindow.querySelector('.main-choose');

	const menuAsideLogo = document.querySelector('.menu-aside__logo');

	// начальные настройки
	let stopScrolling = true;
	document.body.classList.add('no-scroll');
	menuAsideLogo.classList.add('hidden');
	if (bodyWidth >= 1200) {
		footer.classList.add('hidden');
	}
	else {
		setTimeout(() => {
			document.body.classList.remove('no-scroll');
		}, 2500);
	}
	setTimeout(() => {
		document.querySelector('.main').style.overflow = 'initial';
		stopScrolling = false;
	}, 3500);

	// адаптив настройка высоты
	if (bodyWidth < 768) {
		heroSection.style.height = window.innerHeight + 'px';
		menuAsideLogo.classList.remove('hidden');
	}
	// слайдер блока архитектура
	if (architectureSection) {
		const architectureSliderWrap = architectureSection.querySelector('.main-architecture__slider-wrap');
		const architectureSlider = architectureSection.querySelector('.main-architecture__slider');
		architectureSliderWrap.style.marginLeft = - space + 'px';
		const architectureSwiper = new Swiper(architectureSlider, {
			modules: [Navigation, Pagination, Autoplay],
			speed: 1000,
			loop: true,
			navigation: {
				nextEl: ".main-architecture__slider-next",
				prevEl: ".main-architecture__slider-prev",
			},
			pagination: {
				el: ".main-architecture__slider-pagination",
				type: "fraction",
			},
			autoplay: {
				delay: 3000,
			},
		})
	}
	// функция навигации по главной странице
	function navigation(e) {
		// определение направления
		let direction = 'right';
		if (e.deltaY) {
			var delta = e.deltaY;
			var deltaIE = e.wheelDelta;
			if ((delta > 0 || deltaIE < 0)) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		} else if (e.key) {
			if (e.key == "ArrowRight") {
				direction = 'right';
			}
			if (e.key == "ArrowLeft") {
				direction = 'left';
			}
		} else if (e.target.classList.contains('.main-window__arrow')) {
			direction = 'right';
		}
		if (!stopScrolling) {
			if (direction === 'right') {
				// скролл вниз/вправо
				if (step === 1) {
					heroSection.classList.remove('active');
					header.classList.add('black');
					mainWindowArrow.classList.add('black');
					step = 2;
					stopScrolling = true;
					menuAsideLogo.classList.remove('hidden');
					setTimeout(() => {
						stopScrolling = false;
					}, 2000);
				}
				else if (step === 2) {
					translateX = translateX + 50;
					mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
					step = 3;
				}
				else if (step === 3) {
					translateX = translateX + 50;
					if (translateX > architectureSection.clientWidth + chooseSection.clientWidth) {
						translateX = architectureSection.clientWidth + chooseSection.clientWidth;
						step = 4;
					}
					mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
				}
				else if (step === 4) {
					mainWindow.style.width = bodyWidth + 'px';
					document.body.classList.remove('no-scroll');
					footer.classList.remove('hidden');
					mainWindowArrow.classList.add('down');
					step = 5;
				}
			}
			else if (direction === 'left') {
				// скролл вверх/влево
				if (step === 2) {
					heroSection.classList.add('active');
					header.classList.remove('black');
					mainWindowArrow.classList.remove('black');
					step = 1;
					stopScrolling = true;
					menuAsideLogo.classList.add('hidden');
					setTimeout(() => {
						stopScrolling = false
					}, 2000)
				}
				else if (step === 3) {
					translateX = translateX - 50;
					if (translateX < 0) {
						translateX = 0;
						step = 2;
						stopScrolling = true;
						setTimeout(() => {
							stopScrolling = false;
						}, 1000)
					}
					mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
				} else if (step === 4) {
					mainWindow.style.width = '100vw';
					step = 3
					document.body.classList.add('no-scroll');
					footer.classList.add('hidden');
					mainWindowArrow.classList.remove('down');
				} else if (step === 5) {
					if (territorySection.getBoundingClientRect().top === 0) {
						step = 4;
					}
				}
			}
		}
	}
	// вызов функции навигации
	if (bodyWidth >= 1200) {
		document.addEventListener('wheel', (e) => {
			navigation(e);
		});
		document.addEventListener("keydown", function (e) {
			if (e.key == "ArrowRight") {
				navigation(e);
			}
			if (e.key == "ArrowLeft") {
				navigation(e);
			}
		});
	}
	// навигация при нажатии на крутящуюся кнопку
	mainWindowArrow.addEventListener('click', (e) => {
		if (!stopScrolling) {
			if (step === 1) {
				heroSection.classList.remove('active');
				header.classList.add('black');
				mainWindowArrow.classList.add('black');
				step = 2;
				stopScrolling = true;
				setTimeout(() => {
					mainWindowWrap.classList.add('smooth');
					stopScrolling = false;
				}, 1500)
			}
			else if (step === 2) {
				mainWindowWrap.classList.add('smooth');
				translateX = architectureSection.clientWidth;
				mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
				step = 3;
				stopScrolling = true;
				setTimeout(() => {
					mainWindowWrap.classList.remove('smooth');
					stopScrolling = false;
				}, 1000)
			}
			else if (step === 3) {
				mainWindowWrap.classList.add('smooth');
				if (translateX < architectureSection.clientWidth) {
					translateX = architectureSection.clientWidth;
					mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
					stopScrolling = true;
				}
				else if (translateX < architectureSection.clientWidth + territorySection.clientWidth) {
					translateX = architectureSection.clientWidth + territorySection.clientWidth;
					mainWindowWrap.style.transform = `translateX(-${translateX}px)`;
					stopScrolling = true;
					step = 5;
					document.body.classList.remove('no-scroll');
					footer.classList.remove('hidden');
					mainWindowArrow.classList.add('down');
				}
				setTimeout(() => {
					mainWindowWrap.classList.remove('smooth');
					stopScrolling = false;
				}, 1000)
			}
			else if (step === 5) {
				window.scrollBy({
					top: window.innerHeight,
					behavior: 'smooth',
				})
			}
		}
	})
}
const noUiSliderParams = [
	{
		title: 'Площадь квартиры (м2)',
		selector: '.flats-filter__area .filter-slider',
		step: 1,
	},
	{
		title: 'Стоимость (руб.)',
		selector: '.flats-filter__price .filter-slider',
		step: 10000,
	},
];

noUiSliderParams.forEach((noUiSliderObj)=>{
	const noUiSliderElem = document.querySelector(noUiSliderObj.selector);
	if(noUiSliderElem){
		let valMinEl = noUiSliderElem.querySelector(".filter-slider-from-value");
		let valMin = parseInt(valMinEl.dataset.min);
		let valLeft = parseInt(valMinEl.innerText);

		let valMaxEl = noUiSliderElem.querySelector(".filter-slider-to-value");
		let valMax = parseInt(valMaxEl.dataset.max);
		let valRight = parseInt(valMaxEl.innerText);

		const sliderLine = noUiSliderElem.querySelector('.filter-slider-line');
		noUiSlider
			.create(sliderLine, {
				start: [valLeft, valRight],
				step: noUiSliderObj.step,
				connect: true,
				range: {
					min: valMin,
					max: valMax,
				},
			})
			.on("update", function (e) {
				if(noUiSliderObj.step >= 1){
					let min = Math.round(e[0]);
					let max = Math.round(e[1]);
					if(!isNaN(min) && !isNaN(max)){
						valMinEl.innerText = new Intl.NumberFormat('ru-RU').format(min);
						valMaxEl.innerText = new Intl.NumberFormat('ru-RU').format(max);
					}
				}
				else{
					let min = e[0];
					let max = e[1];
					if(!isNaN(min) && !isNaN(max)){
						valMinEl.innerText = min;
						valMaxEl.innerText = max;
					}
				}

				// let inp = context.querySelector("#flats_filters input[name=field_floor__field_number");
				// inp.value = ""+min+"_"+max;
				// if (min != valLeft || max != valRight) {
				// 	inp.dispatchEvent(new Event("change"));
				// }
			});
	}
})
