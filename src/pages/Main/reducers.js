import { GET_POKEMON_LIST, CLEAR_POKEMON_LIST } from 'libraries/types'
const initialState = {
  pokemonList: [],
  next: null,
  previous: null,
  count: 0
};

const mainReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: action.payload,
        next: action.next,
        previous: action.previous,
        count: action.count
      };

    case CLEAR_POKEMON_LIST:
      return {
        ...state,
        pokemonList: []
      }
    default:
      return state;
  }
}

export default mainReducers