import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Image, Modal, Form } from "react-bootstrap";
import { getDetailPokemon, savePokemon, releasePokemon } from 'libraries/actions'
import { generate } from 'libraries/gacha'
import { Layout, DefaultStatus, DetailCard } from 'components';

const mapStateToProps = ({ detail, myPokemon }) => {
  return {
    pokemonDetail: detail.pokemonDetail,
    myPokemon: myPokemon.list
  }
};

const mapDispatchToProps = { getDetailPokemon, savePokemon, releasePokemon };


class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      message: "",
      success: false,
      pokemonName: "",
      owned: false
    }
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  async catchPokemon(pokemonName) {
    let randomNumber = Math.floor(Math.random() * 100);
    const catchResult = await generate(randomNumber);
    let message = "You have successfully catch this Pokémon";
    if (!catchResult) {
      message = "You failed to catch this Pokémon, please try again!";
    }
    this.setState({
      message,
      success: catchResult,
      pokemonName,
      owned: catchResult,
    })
    this.toggleModal();
  }

  componentWillUnmount() {
    this.setState({

      showModal: false,
      message: "",
      success: false,
      pokemonName: "",
      owned: false
    })
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: prevState.showModal ? false : true,
    }))
  }

  onChangeName(e) {
    this.setState({
      pokemonName: e.target.value
    })
  }

  savePokemon({ id, name }) {
    const { pokemonDetail, savePokemon } = this.props;
    const pokemon = {
      id,
      name,
      customName: this.state.pokemonName,
      sprites: pokemonDetail.sprites
    }
    console.log(pokemon)
    savePokemon(pokemon)
    this.toggleModal();

  }

  releasePokemon(name) {
    const { releasePokemon, pokemonDetail } = this.props;
    this.setState({
      // message,
      success: false,
      pokemonName: name,
      owned: false,
    })
    releasePokemon(name, pokemonDetail.id);
    // this.toggleModal();

  }

  async componentDidMount() {
    const { pokemonId, myPokemon, pokemonDetail } = this.props;
    await this.props.getDetailPokemon(pokemonId)
    let isOwned = myPokemon.findIndex(poke => {
      return poke.name === pokemonDetail.name
    })
    if (isOwned > -1) {
      console.log(myPokemon[isOwned])
      this.setState({
        myOwnPokemon: myPokemon[isOwned],
        owned: true,
        pokemonName: myPokemon[isOwned].customName
      })
    }
  }

  render() {
    const { pokemonDetail, path } = this.props;
    const { showModal, owned } = this.state;
    console.log(this.state)
    if (Object.keys(pokemonDetail).length === 0) {
      // navigate('/')
      return (
        <Layout path={path}>
          <span style={{ textAlign: 'center', fontWeight: 'bold' }}>Now loading, please wait...</span>
        </Layout>
      );
    }
    const { moves, types, stats, name, id, sprites } = pokemonDetail;
    return (
      <Layout path={path}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <Col className="text-center" xs={12} md={12}>
                <h4>
                  <strong>
                    {this.toTitleCase(
                      `${name.replace(/-/g, " ")} #${id}`
                    )}
                  </strong>
                </h4>
              </Col>
              {owned &&
                <Col className="text-center" xs={12} md={12}>
                  <h5>
                    <i>
                      <strong>{this.toTitleCase(this.state.pokemonName)}</strong>
                    </i>
                  </h5>
                </Col>
              }
              <Col xs={12} md={12} className="text-center">
                <Image
                  width={150}
                  height={150}
                  src={sprites.front_default}
                  rounded
                />
              </Col>
              {!owned &&
                <Col className="text-center" xs={12} md={12}>
                  <Button onClick={() => this.catchPokemon(this.toTitleCase(name.replace(/-/g, " ")))}>Catch!</Button>
                </Col>
              }
              {owned &&
                <Col className="text-center" xs={12} md={12}>
                  <Button onClick={() => this.releasePokemon(name)} variant="danger">Release!</Button>
                </Col>
              }
            </Col>
            <Col md={8} xs={12}>
              <DetailCard title={"Types"}>
                {types.map(item => {
                  return (
                    <Col key={item.type.name} xs={6} md={6}>
                      <strong>{this.toTitleCase(item.type.name)}</strong>
                    </Col>
                  );
                })}
              </DetailCard>
              <DetailCard title={"Default Status"}>
                {stats.map(item => {
                  return (
                    <DefaultStatus key={item.stat.name} name={this.toTitleCase(item.stat.name.replace(/-/g, " "))} baseStat={item.base_stat} />
                  );
                })}
              </DetailCard>
              <DetailCard title={"Moves"}>
                {moves.map(item => {
                  return (
                    <Col key={item.move.name} xs={6} md={6}>
                      {this.toTitleCase(item.move.name.replace(/-/g, " "))}
                    </Col>
                  );
                })}
              </DetailCard>
            </Col>
          </Row>
        </Container>

        <Modal
          size="sm"
          show={showModal}
          onHide={() => this.toggleModal()}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Gotta Catch `em All !
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>{this.state.message}</strong>
            {this.state.success &&
              <Form>
                <Form.Group controlId="pokemonName"><br />
                  <Form.Label>Name your Pokémon !</Form.Label>
                  <Form.Control
                    type="text"
                    name="pokemonName"
                    value={this.state.pokemonName}
                    onChange={(e) => this.onChangeName(e)}
                    placeholder="My Cute Pokémon" />
                </Form.Group>
                <div className="text-center">
                  <Button style={{ paddingLeft: 50, paddingRight: 50 }} onClick={() => this.savePokemon({ id, name })}>Save</Button>
                </div>
              </Form>
            }
          </Modal.Body>
        </Modal>
      </Layout >
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);