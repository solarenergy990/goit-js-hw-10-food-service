import './sass/main.scss';
import cards from './menu.json';
import menuMarkupTpl from '../src/templates/menu-markup.hbs';

const refs = {
  menuContainer: document.querySelector('.js-menu'),
  themeSwitcher: document.querySelector('#theme-switch-toggle'),
  bodyContainer: document.querySelector('body'),
};

const cardsMarkup = menuMarkupTpl(cards);

refs.menuContainer.insertAdjacentHTML('beforeend', cardsMarkup);

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const saveTheme = () => {
  const savedValue = localStorage.getItem('theme');
  if (savedValue === Theme.DARK) {
    refs.bodyContainer.classList.add(savedValue);
    refs.themeSwitcher.checked = true;
  } else {
    refs.bodyContainer.classList.add(Theme.LIGHT);
  }
};

saveTheme();

let currentTheme = Theme.LIGHT;

const onCheckBoxChange = evt => {
  if (evt.target.checked) {
    replaceTheme(Theme.LIGHT, Theme.DARK);
    currentTheme = Theme.DARK;
  } else {
    replaceTheme(Theme.DARK, Theme.LIGHT);
    currentTheme = Theme.LIGHT;
  }

  localStorage.setItem('theme', currentTheme);
};

const replaceTheme = (oldTheme, newTheme) => {
  refs.bodyContainer.classList.remove(oldTheme);
  refs.bodyContainer.classList.add(newTheme);
};

refs.themeSwitcher.addEventListener('change', onCheckBoxChange);
