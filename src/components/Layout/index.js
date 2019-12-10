import React from "react";
import { Nav, Navbar, Container, Image } from 'react-bootstrap'
import 'components/styles.css';
import { Header } from 'components'
import { navigate } from '@reach/router'

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { children, path } = this.props
    return <div>
      <Header />
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => navigate('/')} active={path === '/' ? true : false} href="#">Pokemon List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate('/my-pokemon')} active={path === '/my-pokemon' ? true : false} href="#">My Pokemon</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="children-container">
        {children}
      </div>
      <Navbar expand="lg" variant="light" bg="light" fixed="bottom">
        <Container >
          <a className="pull-left footer" rel="noopener noreferrer" target="_blank" href="https://github.com/Gash21/pokemon-tokopedia">
            <Image src="/github-logo.png" width={20} height={20} />
            <span className="margin-text"> Github</span>
          </a>
          <a className="pull-right" rel="noopener noreferrer" target="_blank" href="https://github.com/Gash21">
            <span> by Galih Arghubi</span>
          </a>
        </Container>
      </Navbar>
    </div >
  }
}

export default Layout;