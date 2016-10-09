import React, { PropTypes } from 'react';

class ViewName extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ViewName';
  }
  render() {
    return (
      <div></div>
    );
  }
}

ViewName.propTypes = {
  propName: PropTypes.object,
};

export default ViewName;
