import React from 'react';
import { Provider } from "react-redux";
import { Router } from "@reach/router"
import { store, persistor } from "libraries/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Main, Detail, MyPokemon } from 'pages';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Detail path="/detail/:pokemonId" />
          <MyPokemon path="/my-pokemon" />
          <Main path="/:page" />
          <Main path="/" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
