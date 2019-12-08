import React from 'react';
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap";
import { Link } from "@reach/router";
import { getListPokemon } from 'libraries/actions'
import { Layout, ListItem } from 'components';

const mapStateToProps = ({ main }) => ({
  pokemonList: main.pokemonList,
});

const mapDispatchToProps = {
  getListPokemon,
};


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getListPokemon(1, 20).then(data => {
      console.log(this.props)
    })
  }

  render() {
    const { path } = this.props
    return <Layout path={path}>
      {this.props.pokemonList.map(item => {
        return <ListItem key={item.name}>
          {item.name}
        </ListItem>
      })}
    </Layout>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);