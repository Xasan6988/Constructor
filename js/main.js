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
		// добавление бургер-меню

		const burger = getElement('button', ['menu-button']);
		burger.addEventListener('click', () => {
		burger.classList.toggle('menu-button-active')
		wrapper.classList.toggle('header-active');
		});
		container.append(burger);
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

	return header;
};
// функция создания главного блока сайта
const createMain = ({
	title,
	main: {genre, rating, description,	trailer, slider}
}) => {

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
		// создание слайдера
		if (slider) {
			const sliderBlock = getElement('div', ['series']);
			const swiperBlock = getElement('div', ['swiper-container']);
			const swiperWrapper = getElement('div', ['swiper-wrapper']);
			const arrow = getElement('button', ['arrow']);

			// создание отдельных слайдов
			const slides = slider.map(item => {

				const swiperSlide = getElement('div', ['swiper-slide']);
				const card = getElement('figure', ['card']);
				const cardImage = getElement('img', 'card-img', {
					src: item.img,
					alt: ((item.title || '') + ' ' + (item.subtitle || '')).trim(),
				});

				card.append(cardImage);

				if (item.title || item.subtitle) {
					const cardDescription= getElement('figcaption', ['card-description']);
					cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
					`;

					card.append(cardDescription);
				}
				swiperSlide.append(card);
				return swiperSlide;
			});

			swiperWrapper.append(...slides);
			swiperBlock.append(swiperWrapper);
			sliderBlock.append(swiperBlock, arrow);

			container.append(sliderBlock);
			// инициализация плагина слайдера
			new Swiper(swiperBlock, {
				loop: true,
				navigation: {
					nextEl: arrow,
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

		}

		return main;
};
// функция создания футера
const createFooter = ({footer: {copyright, links}}) => {
	// контейнеры
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	const content = getElement('div', ['footer-content']);
	const left = getElement('div', ['left']);
	const right = getElement('div', ['right']);

	footer.append(container);
	container.append(content);
	content.append(left, right);
	// копирайт
	if (copyright) {
		const span = getElement('span', ['copyright'], {
			textContent: copyright,
		});

		left.append(span);
	}
	// ссылки
	if (links) {
		const navList = getElement('nav', ['footer-menu']);

		const navLinks = links.map(item => {
			const link = getElement('a', ['footer-link'], {
				textContent: item.text,
				src: item.src,
			});
			return link;
		});

		navList.append(...navLinks);
		right.append(navList);
	}

	return footer;
}


// конструктор всего сайта
const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	// цвета текста и бэкраунда
	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

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
	// фавиконка
	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.slice(index + 1);


		const favicon = getElement('link', [], {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
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
	// создание футера
	if (options.footer) {
		app.append(createFooter(options));
	}
};

// Инициализация конструктора
movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	fontColor: '#ffffff',
	backgroundColor: '#141218',
	subColor: '#9029292',
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
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия №1',
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2',
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3',
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия №4',
			},
		],
	},
	footer: {
		copyright: '© 2020 The Witcher. All right reserved.',
		links: [
			{
				src: '#',
				text: 'Privacy Policy',
			},
			{
				src: '#',
				text: 'Terms of Service',
			},
			{
				src: '#',
				text: 'Legal',
			},
		],
	}
});
