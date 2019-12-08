import { GET_POKEMON_LIST } from 'libraries/types'
import fetchAPI from 'libraries/api';

export const getListPokemon = (page, limit) => {
  return dispatch => {
    const offset = (page - 1) * limit;
    return fetchAPI('pokemon/', { offset, limit }, { method: 'GET' }).then(res => {
      if (res.success === 1) {
        console.log(res.response.results)
        dispatch({
          type: GET_POKEMON_LIST,
          payload: res.response.results,
          next: res.response.next,
          previous: res.response.previous
        })
        return res.response.results
      }
    })
  }
}