import { GET_POKEMON_DETAIL, CLEAR_POKEMON_DETAIL } from 'libraries/types'
import fetchAPI from 'libraries/api';

export const getDetailPokemon = (name) => {
  return dispatch => {
    dispatch({
      type: CLEAR_POKEMON_DETAIL
    })
    return fetchAPI(`pokemon/${name}`, {}, { method: 'GET' }).then(res => {
      if (res.success === 1) {
        dispatch({
          type: GET_POKEMON_DETAIL,
          payload: res.response,
        })
      }
    })
  }
}