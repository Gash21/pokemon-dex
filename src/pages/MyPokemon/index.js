import React from 'react';
import { connect } from 'react-redux';
import { Alert } from "react-bootstrap";
import { Link } from "@reach/router";

const mapStateToProps = state => ({ detail: state.detail });

const mapDispatchToProps = {};


class MyPokemon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Alert variant="success">
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
      <Link to="/">Go to Index</Link>
    </Alert>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);