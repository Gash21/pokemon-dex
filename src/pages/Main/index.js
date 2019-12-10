import React from 'react';
import { connect } from 'react-redux';
import { getListPokemon } from 'libraries/actions'
import { Layout, ListItem, PokemonListContainer } from 'components';
import { Button } from 'react-bootstrap';
import { navigate } from "@reach/router";

const mapStateToProps = ({ main }) => ({
  pokemonList: main.pokemonList,
  next: main.next,
  previous: main.previous
});

const mapDispatchToProps = {
  getListPokemon,
};


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: typeof props.page === 'undefined' ? 1 : parseInt(props.page)
    }
  }

  componentWillMount() {
    const { page } = this.state
    this.props.getListPokemon(page, 20);
  }

  onPress(name) {
    navigate(`/detail/${name}`)
  }

  goToPage(page) {
    this.props.getListPokemon(page, 20);
    this.setState({ page })
    navigate(`/${page}`)
  }

  renderPokemon() {
    if (this.props.pokemonList.length === 0) {
      return <span style={{ textAlign: 'center', fontWeight: 'bold' }}>Now loading, please wait...</span>
    }
    return this.props.pokemonList.map(item => {
      return <ListItem key={item.name} onPress={() => this.onPress(item.name)}>
        {item.name}
      </ListItem>
    })
  }

  render() {
    const { path, next, previous } = this.props
    const { page } = this.state
    return <Layout path={path}>
      <PokemonListContainer>
        {this.renderPokemon()}
      </PokemonListContainer>
      <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Button variant="secondary" style={{ marginRight: 10 }} onClick={() => this.goToPage(page - 1)} disabled={previous === null ? true : false}>
          {"<< Prev"}
        </Button>
        <Button variant="secondary" style={{ marginLeft: 10 }} onClick={() => this.goToPage(page + 1)} disabled={next === null ? true : false}>
          {"Next >>"}
        </Button>
      </div>
    </Layout>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);