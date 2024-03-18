'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault(); // prevent the link button scroll up to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// sticky navigation bar using intersection observer
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// page navigation using event delegation
// create a event listener on links' parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // get #section--1
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// over the nav list, decrease the highlight of the siblings
const navHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this, e.currentTarget);
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// method1
// nav.addEventListener('mouseover', function (e) {
//   navHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   navHover(e, 1);
// });
// method2
nav.addEventListener('mouseover', navHover.bind(0.5)); // arguments need to be a function
nav.addEventListener('mouseout', navHover.bind(1)); // the bind arguement can be a list, so that multiply arguments can be passed

// button scrolling
btnScroll.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // old way to scroll to the section view
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // modern way to scroll to the section view
  section1.scrollIntoView({ behavior: 'smooth' });
});

// intersecting with sections, when you scroll down the page, sections slide up and show up
const sections = document.querySelectorAll('.section');
const hiddenSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden'); // entry.target points to the section it observes
  observer.unobserve(entry.target); // once pass the section, we do not need to observe again
};
const sectionObserver = new IntersectionObserver(hiddenSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// // lazy loading images
const lazyImgs = document.querySelectorAll('img[data-src]');
const loadLazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(loadLazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px', // delay the img loading
});
lazyImgs.forEach(img => lazyImgObserver.observe(img));

// tabbed component
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContents.forEach(c => c.classList.remove('operations__content--active'));

  // active tab and content
  if (clicked) {
    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

// slider section part
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const slideLeft = document.querySelector('.slider__btn--left');
const slideRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

// functions
const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(d => d.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// slider.style.overflow = 'visible'; // if visible, you can see the hidden pictures
// slider.style.transform = 'scale(0.3) translateX(-800px)';

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  activateDot(slide);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const preSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

// init
const init = function () {
  createDots();
  activateDot(0);
  goToSlide(0);
};
init();

//event handlers
slideRight.addEventListener('click', nextSlide);
slideLeft.addEventListener('click', preSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && preSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});

/////////////////////////////////
////////////////////////////////////
// const header = document.querySelector('.header');
// const btns = document.getElementsByTagName('button');
// console.log(btns);

// const cookies = document.createElement('div');
// cookies.classList.add('cookie-message');

// cookies.innerHTML =
//   'We used cookie for imporved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';

// header.prepend(cookies);
// // header.before(cookies);
// // header.append(cookies);
// // header.after(cookies);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', cookies.remove);

// cookies.style.backgroundColor = '#37383d';
// cookies.style.width = '120%';
// cookies.style.height =
//   Number.parseFloat(getComputedStyle(cookies).height) + 30 + 'px';

// const logo = document.querySelector('.nav__logo');
// console.log(logo.getAttribute('designer'));
// console.log(logo.dataset.versionNumber);

// event captruing and bubbling
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget); // e.target will always be the link you click
//   console.log(e.currentTarget === this);
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Links', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   },
//   false // if true, using event capturing for this event
// );

// DOM traversing
// select children
// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // get all the nodes
// console.log(h1.children); // get all the HTML collections
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //select parent
// console.log(h1.parentNode);
// console.log(h1.parentElement); //same

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //select siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) e.style.transform = 'scale(0.5)';
// }); // let all the h1's siblings be small

// Lifecycle DOM
// Dom content loaded: HTML parsed and DOM tree built
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// load: page fully loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// alert before you leave the site
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
