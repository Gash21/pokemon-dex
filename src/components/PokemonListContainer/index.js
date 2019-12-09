import React from 'react';

class PokemonListContainer extends React.PureComponent {
  render() {
    return <div className="pokemon-list-container">{this.props.children}</div>
  }
}

export default PokemonListContainer;