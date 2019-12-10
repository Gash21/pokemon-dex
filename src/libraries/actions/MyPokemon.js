import { SAVE_POKEMON, RELEASE_POKEMON } from "libraries/types"

export const savePokemon = (pokemon) => {
  return dispatch => {
    dispatch({
      type: SAVE_POKEMON,
      payload: pokemon
    })
  }
}

export const releasePokemon = (name, id) => {
  return dispatch => {
    dispatch({
      type: RELEASE_POKEMON,
      name,
      id
    })
  }
}

