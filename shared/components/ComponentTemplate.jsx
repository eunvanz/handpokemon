import React from 'react';

class ComponentName extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ComponentName';
  }
  render() {
    return (
      <div></div>
    );
  }
}

ComponentName.contextTypes = {
  router: React.PropTypes.object,
};

export default ComponentName;
