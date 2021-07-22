/*
	new Swiper('.swiper-container', {
		loop: true,
		navigation: {
			nextEl: '.arrow',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			541: {
				slidesPerView: 2,
				spaceBetween: 40
			}
		}
	});

	const menuButton = document.querySelector('.menu-button');
	const menu = document.querySelector('.header');
	menuButton.addEventListener('click', function () {
		menuButton.classList.toggle('menu-button-active');
		menu.classList.toggle('header-active');
	})
*/

// функция, возвращающая элемент, созданный по переданным аргументам
const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames);
	}
	if (attributes) {
		for (let key in attributes) {
			element[key] = attributes[key];
		}
	}
	return element;
};
// функция создания хэдера
const createHeader = ({title, header: {logo, social, menu}}) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	// лого сайта
	if (logo) {
		const logoImg = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип ' + title,
		});
		wrapper.append(logoImg);
	}
	// меню хэдера
	if (menu) {
		const navList = getElement('nav', ['menu-list']);
		for (let elem of menu) {
			const a = getElement('a', ['menu-link'], {
				href: elem.link,
				textContent: elem.title,
			});
			navList.append(a);
			wrapper.append(navList);
		}
	}
	// кнопки соцсетей
	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));

			socialLink.href = item.link;

			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);

	// добавление бургер-меню
	const burger = getElement('button', ['menu-button']);
	burger.addEventListener('click', () => {
		burger.classList.toggle('menu-button-active')
		wrapper.classList.toggle('header-active');
	});

	container.append(burger);


	return header;
};
// функция создания главного блока сайта
const createMain = ({
	title,
	main: {genre, rating, description,	trailer}}) => {

		// создание обёрток
		const main = getElement('main');
		const container = getElement('div', ['container']);
		const wrapper = getElement('div', ['main-content']);
		const content = getElement('div', ['content']);

		main.append(container);
		container.append(wrapper);
		wrapper.append(content);

		// жанр, рэйтинг, заголовок, описание
		if (genre) {
			const span = getElement('span', ['genre', 'animated', 'fadeInRight'], {
				textContent: genre,
			});
			content.append(span);
		}

		if (rating) {
			const ratingBlock = getElement('div', ['rating', 'rating', 'fadeInRight']);
			const ratingStars = getElement('div', ['rating-stars']);
			const ratingNumber = getElement('div', ['rating-number'], {
				textContent: `${rating}/10`,
			});

			for (let i = 0; i < 10; i++) {
				const star = getElement('img', ['star'], {
					alt: i ? '' : `Рейтинг ${rating} из 10`,
					src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
				});
				ratingStars.append(star);
			}

			ratingBlock.append(ratingStars, ratingNumber);
			content.append(ratingBlock);
		}

		if (title) {
			content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
				textContent: title,
			}));
		}

		if (description) {
			content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
				textContent: description,
			}));
		}
		// трейлер
		if (trailer) {
			const youtubeLink = getElement('a',
				['button', 'animated', 'fadeInRight', 'youtube-modal'], {
					href: trailer,
					textContent: 'Смотреть трейлер',
				}
			);

			const youtubeImageLink = getElement('a', ['play', 'youtube-modal'], {
				href: trailer,
				ariaLabel: 'Смотреть трейлер',
			});

			const iconPlay = getElement('img', ['play-img'], {
				src: 'img/play.svg',
				alt: 'play',
				ariaHidden: true,
			});

			content.append(youtubeLink);
			youtubeImageLink.append(iconPlay);
			wrapper.append(youtubeImageLink);
		}

		return main;
};
// конструктор всего сайта
const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	// тайтл страницы
	if (options.title) {
		document.querySelector('title').textContent = options.title;
	}
	// бэкграунд
	if (options.background) {
		app.style.backgroundImage = options.background ?
			`url("${options.background}")`:
			'';
	}

	if (options.favicon) {
		const favicon = getElement('link', [], {
			rel: 'icon',
			href: options.favicon,
		});
		document.querySelector('head').append(favicon);
	}

	// создание хэдэра
	if (options.header) {
		app.append(createHeader(options));
	}
	// создание главного блока
	if (options.main) {
		app.append(createMain(options));
	}
};

// Инициализация конструктора
movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'http://twitter.com',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'http://instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'http://facebook.com',
				image: 'witcher/social/facebook.svg',
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			},
		]
	},
	main: {
		genre: '2019,фэнтези',
		rating: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой	мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	},
});
