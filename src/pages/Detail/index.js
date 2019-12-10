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
    let message = "Congratulations! \nYou have successfully catch this Pokémon";
    let title = "Gotcha!!";
    if (!catchResult) {
      message = "You failed to catch this Pokémon, please try again!";
      title = "I'm sorry..."
    }
    this.setState({
      message,
      title,
      success: catchResult,
      pokemonName,
      owned: catchResult,
    })
    this.toggleModal();
    if (catchResult) {
      const { pokemonDetail, savePokemon } = this.props;
      const pokemon = {
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        customName: pokemonDetail.name,
        sprites: pokemonDetail.sprites
      }
      savePokemon(pokemon)
    }
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
    savePokemon(pokemon)
    this.toggleModal();

  }

  releasePokemon(name) {
    const { releasePokemon, pokemonDetail } = this.props;
    this.setState({
      success: false,
      pokemonName: name,
      owned: false,
    })
    releasePokemon(name, pokemonDetail.id);

  }

  async componentDidMount() {
    const { pokemonId, myPokemon } = this.props;
    await this.props.getDetailPokemon(pokemonId)
    let isOwned = myPokemon.findIndex(poke => {
      return poke.name === pokemonId
    })
    if (isOwned > -1) {
      this.setState({
        myOwnPokemon: myPokemon[isOwned],
        owned: true,
        pokemonName: myPokemon[isOwned].customName
      })
    }
  }

  render() {
    const { pokemonDetail, path } = this.props;
    const { showModal, owned, title, message } = this.state;
    if (Object.keys(pokemonDetail).length === 0) {
      // navigate('/')
      return (
        <Layout path={path}>
          <Container>
            <div className="text-center">
              <span style={{ textAlign: 'center', fontWeight: 'bold' }}>Now loading, please wait...</span>
            </div>
          </Container>
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
          show={showModal}
          onHide={() => this.toggleModal()}
          aria-labelledby="example-modal-sizes-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>{message}</strong>
            {this.state.success &&
              // <Form inline={true}>
              <>
                <Form.Group><br />
                  <Form.Label>Name your Pokémon !</Form.Label>
                  <Form.Control
                    type="text"
                    name="pokemonName"
                    value={this.state.pokemonName}
                    onKeyPress={(e) => {
                      if (e.charCode === 13) {
                        this.savePokemon({ id, name })
                        return true;
                      }
                    }}
                    onChange={(e) => this.onChangeName(e)}
                    placeholder="My Cute Pokémon" />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" style={{ paddingLeft: 50, paddingRight: 50 }} onClick={() => this.savePokemon({ id, name })}>Save</Button>
                </div>
              </>
              // </Form>
            }
          </Modal.Body>
        </Modal>
      </Layout >
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);