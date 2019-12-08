import axios from 'axios';

const fetchAPI = (api, data, option) => {
  let finish = false;
  const apiHost = 'https://pokeapi.co/api/v2';
  let apiURL = apiHost + '/' + api;
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    "Access-Control-Allow-Origin": '*'
  };
  let method = typeof option.method != undefined ? option.method : 'GET';

  return axios({
    method: method,
    url: apiURL,
    data: method === 'POST' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    headers,
  })
    .then(response => {
      if (typeof response.data == 'undefined') {
        finish = true;
        return { success: 1, payload: [], finish };
      }
      let responseData = { success: 1, response: response.data };
      return responseData;
    })
    .catch(error => {
      return { success: 0, error };
    });
}

export default fetchAPI;