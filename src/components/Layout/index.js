import React from "react";
import { Nav } from 'react-bootstrap'
import 'components/styles.css';
import { Header } from 'components'

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
          <Nav.Link active={path === '/' ? true : false} href="/">Pokemon List</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={path === '/my-pokemon' ? true : false} href="/my-pokemon">My Pokemon</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        {children}
      </div>
    </div >
  }
}

export default Layout;