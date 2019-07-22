'use strict'


const searchUrl = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'OBoYtleJTQuFhmSZlppDbmXOHqedhKvH1TTE3Lhi';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i<responseJson.data.length; i++) {
    $('#results-list').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
      `)
  };
  $('#results').removeClass('hidden');
}

function getNationalParkInfo(stateArr,limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: stateArr,
    limit: limit-0,
     
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateArr = $('#js-search-term').val().split(",");
    const limit = $('#js-max-results').val();
    getNationalParkInfo(stateArr,limit);
  });
}

$(watchForm);

