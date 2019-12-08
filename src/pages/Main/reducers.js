import { GET_POKEMON_LIST } from 'libraries/types'
const initialState = {
  pokemonList: []
};

const mainReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: action.payload
      };

    default:
      return state;
  }
}

export default mainReducers