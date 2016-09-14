import React, { Component } from 'react';

export default (ComposedComponent) => {
  class Remountable extends Component {
    constructor(props) {
      super(props);
      this.displayName = 'Remountable';
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Remountable;
};
