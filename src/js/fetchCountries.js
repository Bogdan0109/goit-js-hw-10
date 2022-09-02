const URL = 'https://restcountries.com/v2/name/';

export async function fetchCountries(name) {
  return fetch(
    `${URL}${name}?fields=name,official,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
