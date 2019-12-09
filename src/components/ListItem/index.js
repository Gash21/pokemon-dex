import React from 'react';
import 'components/styles.css';
import { Button } from 'react-bootstrap';

class ListItem extends React.PureComponent {
  render() {
    const { children, onPress } = this.props;
    return (
      <Button className="pokemon-list" variant="light" onClick={() => onPress()}>
        {children.toUpperCase()}
      </Button>
    )
  }
}

export default ListItem;