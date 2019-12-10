import { GET_POKEMON_LIST, CLEAR_POKEMON_LIST } from 'libraries/types'
import fetchAPI from 'libraries/api';

export const getListPokemon = (page, limit) => {
  return dispatch => {
    const offset = (page - 1) * limit;

    dispatch({
      type: CLEAR_POKEMON_LIST
    })
    return fetchAPI('pokemon/', { offset, limit }, { method: 'GET' }).then(res => {
      if (res.success === 1) {
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