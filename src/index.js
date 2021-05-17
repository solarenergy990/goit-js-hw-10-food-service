import './sass/main.scss';
import cards from './menu.json';
import menuMarkupTpl from '../src/templates/menu-markup.hbs';

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
  } else {
    refs.bodyContainer.classList.add(Theme.LIGHT);
  }
};

const saveSwitcherPosition = () => {
  const savedValue = localStorage.getItem('theme');
  if (savedValue === Theme.DARK) {
    refs.themeSwitcher.checked = true;
  } else {
    refs.themeSwitcher.checked = false;
  }
};

saveTheme();
saveSwitcherPosition();

let currentTheme = Theme.LIGHT;

const onCheckBoxChange = () => {
  if (currentTheme === Theme.LIGHT) {
    replaceTheme(Theme.LIGHT, Theme.DARK);
    currentTheme = Theme.DARK;
  } else if (currentTheme === Theme.DARK) {
    replaceTheme(Theme.DARK, Theme.LIGHT);
    currentTheme = Theme.LIGHT;
  }

  console.log(refs.themeSwitcher.checked);
  localStorage.setItem('theme', currentTheme);
};

const replaceTheme = (oldTheme, newTheme) => {
  refs.bodyContainer.classList.remove(oldTheme);
  refs.bodyContainer.classList.add(newTheme);
};

refs.themeSwitcher.addEventListener('change', onCheckBoxChange);
