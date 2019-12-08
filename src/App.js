import React from 'react';
import { Provider } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from 'react-router-dom'

import { Router } from "@reach/router"
import { store } from "libraries/store";
import { Main, Detail, MyPokemon } from 'pages'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Detail path="/detail/:pokemonId" />
        <MyPokemon path="/my-pokemon" />
        <Main path="/" />
      </Router>
    </Provider>
  );
}

export default App;
