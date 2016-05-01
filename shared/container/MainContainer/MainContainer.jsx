import React from 'react';
import { Button } from 'react-bootstrap';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MainContainer';
  }
  render() {
    return (
      <div>
        <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}

export default MainContainer;
