// ACCORDION
console.log('ACCORDION')
const accordions = document.querySelectorAll('.accordion');
if(accordions.length){
	accordions.forEach(accordion => {
		const accordionItems = accordion.querySelectorAll(".accordion__question");
		if(accordion.dataset.effect === 'alwaysOpen'){
			accordionItems[0].classList.add('active');
			let itemContent = accordionItems[0].nextElementSibling;
			itemContent.style.height = 'auto';
			let height = itemContent.clientHeight + 'px';
			setTimeout(function () {
				itemContent.style.height = height;
			}, 100);
		}

		accordionItems.forEach(function(item){
			item.addEventListener("click", function (e) {
				if (!item.classList.contains('active')) {
					// Закрываем другие пункты
					let allItems = accordion.querySelectorAll(".accordion__question.active");
					allItems.forEach(function(item){
						item.classList.remove('active');
						let height = item.nextElementSibling.clientHeight + 'px';
						item.nextElementSibling.style.height = height;
						setTimeout(function () {
							item.nextElementSibling.style.height = '0px';
						}, 0);
					});
					// Открываем выбранный пункт
					item.classList.add("active");
					let itemContent = item.nextElementSibling;
					itemContent.style.height = 'auto';
					let height = itemContent.clientHeight + 'px';
					itemContent.style.height = '0px';
					setTimeout(function () {
						itemContent.style.height = height;
					}, 0);
	
				}else if(accordion.dataset.effect !== 'alwaysOpen'){
					// Закрываем выбранный пункт
					item.classList.remove("active");
					let height = item.nextElementSibling.clientHeight + 'px';
					item.nextElementSibling.style.height = height;
					setTimeout(function () {
						item.nextElementSibling.style.height = '0px';
					}, 0);
				};
			});
		});
	})
}
