// MENU
console.log('MENU')
const menu = document.querySelector('.menu');
if (menu) {
	let isOpen = false;
	const burger = menu.querySelector('.menu-aside__burger');
	let timeMenuOpen = 2000;
	if (document.body.clientWidth < 768) {
		timeMenuOpen = 1000;
	}
	const menuLinks = menu.querySelectorAll('.menu-main__nav a');
	burger.addEventListener('click', (e) => {
		burger.disabled = true;
		menu.classList.toggle('active');
		document.body.classList.toggle('no-scroll');
		if (isOpen) {
			for (let i = menuLinks.length - 1; i >= 0; i--) {
				setTimeout(() => {
					menuLinks[i].classList.remove('show');
					if (i === 0) {
						burger.disabled = false;
					}
				}, (120 * (menuLinks.length - i)))
			}
			isOpen = false;
		}
		else {
			menuLinks.forEach((menuLink, index) => {
				setTimeout(() => {
					menuLink.classList.add('show');
					if (index === menuLinks.length - 1) {
						burger.disabled = false;
					}
				}, (timeMenuOpen + 120 * index))
			})
			isOpen = true;
		}
	})
	// контейнер списка меню
	const menuNavWrap = menu.querySelector('.menu-main__nav-wrap');
	const menuNav = menu.querySelector('.menu-main__nav');

	if (menuNavWrap.clientHeight < menuNav.clientHeight) {
		menuNavWrap.classList.add('overflow');
	}
}
