import React from 'react';
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap";
import { Link } from "@reach/router";
import { Layout } from 'components';

const mapStateToProps = ({ main }) => ({
  pokemonList: main.pokemonList,
});

const mapDispatchToProps = {};


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { path } = this.props
    return <Layout path={path}>
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This example
          text is going to run a bit longer so that you can see how spacing within an
          alert works with this kind of content.
    </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things nice
          and tidy.
    </p>
        <Link to="/my-pokemon">Go to My Pokemon</Link><br />
        <Link to="/detail/1">Go to My Detail Pokemon</Link>
      </Alert>
    </Layout>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Main);