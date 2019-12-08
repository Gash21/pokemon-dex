import { GET_POKEMON_DETAIL } from 'libraries/types'
const initialState = {
  pokemonDetail: {}
};

const detailReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload
      };

    default:
      return state;
  }
}

export default detailReducers