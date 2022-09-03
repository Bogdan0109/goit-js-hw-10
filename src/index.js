import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onEventInput, DEBOUNCE_DELAY));

function onEventInput(e) {
  e.preventDefault();
  const searchText = e.target.value.trim();

  if (searchText === '') {
    return clearCountries();
  }

  fetchCountries(searchText)
    .then(renderCountries)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      console.log('catch сработал');
      console.error(error);
    });
}

function renderCountries(countries) {
  if (countries.length > 10) {
    clearCountries();
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  const markup = countries
    .map(({ name, capital, population, flags, languages }) => {
      if (countries.length === 1) {
        return `<li class="item">
        <div class="flags-countries">
        <img src="${
          flags.svg
        }" alt="flag of ${name}" width="32" height="32"></img>
        <h1>${name}</h1>
        </div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages.map(({ name }) => name).join(', ')}</p>
        </li>`;
      } else {
        return `<li class="item">
        <div class="flags-countries">
        <img src="${flags.svg}" alt="flag of ${name}" width="32" height="32"></img>
        <h1>${name}</h1>
        </div>
        </li>`;
      }
    })
    .join('');
  refs.list.innerHTML = markup;
}

function clearCountries() {
  refs.list.innerHTML = '';
}
