import React from 'react';
import 'components/styles.css';
import { Button } from 'react-bootstrap';

class ListItem extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Button variant="light">
        {children.toUpperCase()}
      </Button>
    )
  }
}

export default ListItem;