import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class DetailCard extends React.PureComponent {
  render() {
    return (
      <Card style={{ padding: 10, marginTop: 10 }}>
        <Row>
          <Col xs={12} md={12}>
            <h5>
              <strong>{this.props.title}</strong>
            </h5>
          </Col>
          {this.props.children}
        </Row>
      </Card>
    )
  }
}

export default DetailCard;