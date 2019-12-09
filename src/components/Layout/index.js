import React from "react";
import { Nav } from 'react-bootstrap'
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
    </div >
  }
}

export default Layout;