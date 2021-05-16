import './sass/main.scss';
import cards from './menu.json';
import menuMarkupTpl from '../src/templates/menu-markup.hbs';

menuMarkupTpl([]);

const refs = {
  menuContainer: document.querySelector('.js-menu'),
  themeSwitcher: document.querySelector('#theme-switch-toggle'),
  bodyContainer: document.querySelector('body'),
};

const createMenuCardsMarkup = cards => {
  return menuMarkupTpl(cards);
};

const cardsMarkup = createMenuCardsMarkup(cards);
refs.menuContainer.insertAdjacentHTML('beforeend', cardsMarkup);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const saveTheme = () => {
  const savedValue = localStorage.getItem('theme');

  if (savedValue) {
    refs.bodyContainer.classList.remove(currentTheme);
    refs.bodyContainer.classList.add(savedValue);
  }
  if (savedValue === Theme.DARK) {
    refs.themeSwitcher.checked = true;
  }
};

saveTheme();

refs.bodyContainer.classList.add(Theme.LIGHT);
let currentTheme = refs.bodyContainer.classList.value;

const onCheckBoxChange = () => {
  if (currentTheme === Theme.LIGHT) {
    refs.bodyContainer.classList.remove(Theme.LIGHT);
    refs.bodyContainer.classList.add(Theme.DARK);
    currentTheme = refs.bodyContainer.classList.value;
  } else {
    refs.bodyContainer.classList.remove(Theme.DARK);
    refs.bodyContainer.classList.add(Theme.LIGHT);
    currentTheme = refs.bodyContainer.classList.value;
  }

  localStorage.setItem('theme', currentTheme);
};

refs.themeSwitcher.addEventListener('change', onCheckBoxChange);
