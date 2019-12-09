import { SAVE_POKEMON, RELEASE_POKEMON } from 'libraries/types'
const initialState = {
  list: []
};

const myPokemonReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POKEMON:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload
        ]
      };
    case RELEASE_POKEMON:
      let list = state.list;
      let index = list.findIndex((li) => {
        return li.name === action.name
      })
      console.log(index)
      list.splice(index, 1)
      console.log(list)
      return {
        ...state,
        list
      }

    default:
      return state;
  }
}

export default myPokemonReducers