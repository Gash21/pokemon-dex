import { SAVE_POKEMON, RELEASE_POKEMON } from 'libraries/types'
const initialState = {
  list: []
};

const myPokemonReducers = (state = initialState, action) => {
  let list = state.list;
  let index;
  switch (action.type) {
    case SAVE_POKEMON:
      index = list.findIndex((li) => {
        return li.name === action.payload.name
      })
      if (index > -1) {
        list[index] = action.payload;
        return {
          ...state,
          list
        };
      }

      return {
        ...state,
        list: [
          ...state.list,
          action.payload
        ]
      };
    case RELEASE_POKEMON:
      index = list.findIndex((li) => {
        return li.name === action.name
      })
      list.splice(index, 1)
      return {
        ...state,
        list
      }

    default:
      return state;
  }
}

export default myPokemonReducers