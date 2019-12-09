import React from 'react';
import { Col } from 'react-bootstrap';

class DefaultStatus extends React.PureComponent {
  render() {
    const { name, baseStat } = this.props;
    return <>
      <Col xs={6} sm={6} md={6}>
        <strong>
          {name}
        </strong>
      </Col>
      <Col xs={6} sm={6} md={6}>
        <strong>{baseStat}</strong>
      </Col></>
  }
}

export default DefaultStatus;