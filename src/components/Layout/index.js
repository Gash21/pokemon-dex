import React from "react";
import { Nav, Jumbotron, Navbar, Container } from 'react-bootstrap'
import './styles.css';

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { children, path } = this.props
    console.log(this.props)
    return <div>
      {/* <Jumbotron className="site-header-container">
        <h2 className="site-header-text">Ayo Tangkap Pokemon!</h2>
      </Jumbotron> */}
      <Navbar className="site-header-container" expand="lg">
        <Container className="header-image-container">
          <Navbar.Brand className="header-image-container"><img src="/icon.png" alt="/logo192.png" className="header-image" /></Navbar.Brand>
        </Container>
      </Navbar>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link active={path === '/' ? true : false} href="/">Pokemon List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={path === '/my-pokemon' ? true : false} href="/my-pokemon">My Pokemon</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        {children}
      </div>
    </div>
  }
}

export default Layout;