import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Image, Button, Container } from "react-bootstrap";
import { navigate } from "@reach/router";
import { Layout } from 'components'
import { releasePokemon } from "libraries/actions";

const mapStateToProps = ({ myPokemon }) => {
  return { myPokemon: myPokemon.list }
};

const mapDispatchToProps = { releasePokemon };


class MyPokemon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myPokemon: props.myPokemon
    }
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  componentDidMount() {
    this.setState({
      myPokemon: this.props.myPokemon
    })
  }

  render() {
    const { path, releasePokemon, myPokemon } = this.props;
    return <Layout path={path}>
      <Container>
        {
          myPokemon.map(item => {
            const { customName, name, id, sprites } = item;
            console.log(item);
            return <Card key={item.id} style={{ marginTop: 10, marginBottom: 10 }}>
              <Row>
                <Col sm={4} xs={4} md={4}>
                  <Image src={sprites.front_default}></Image>
                </Col>
                <Col sm={8} xs={8} md={8} style={{ flexDirection: "row", padding: 10, }}>
                  <i>
                    <strong>
                      {`${this.toTitleCase(customName.replace(/-/g, ' '))}`}
                    </strong>
                  </i><br />
                  <strong style={{ fontSize: 14 }}>
                    {`#${id} ${this.toTitleCase(name.replace(/-/g, ' '))}`}
                  </strong><br />
                  <br />
                  <Button size="sm" style={{ marginRight: 15 }} onClick={() => navigate(`/detail/${name}`)}>View Detail</Button>
                  <Button size="sm" variant="danger" onClick={() => {
                    releasePokemon(name, id)
                    navigate('/my-pokemon')
                  }}>Release</Button>
                </Col>

              </Row>
            </Card>
          })
        }
      </Container>
    </Layout>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);