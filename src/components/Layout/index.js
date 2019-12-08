import React from "react";
import { Nav } from 'react-bootstrap'

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/">Pokemon List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/my-pokemon">My Pokemon</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  }
}

export default Layout;