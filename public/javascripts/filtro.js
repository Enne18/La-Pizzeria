'use strict';

const cityNames = ['City1', 'City2', 'City3', 'City4'];

cityNames.sort();

const cityFilter = document.getElementById('city-filter');

const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = 'All cities';
cityFilter.appendChild(defaultOption);

cityNames.forEach(city => {
  const option = document.createElement('option');
  option.value = city;
  option.textContent = city;
  cityFilter.appendChild(option);
});

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', () => {
  const selectedCity = cityFilter.value;
});