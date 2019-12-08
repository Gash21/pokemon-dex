import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'components/styles.css';

class Header extends React.PureComponent {
  render() {
    return (
      <Navbar className="site-header-container" expand="lg">
        <Container className="header-image-container">
          <Navbar.Brand className="header-image-container"><img src="/icon.png" alt="/logo192.png" className="header-image" /></Navbar.Brand>
        </Container>
      </Navbar>
    )
  }

}

export default Header;