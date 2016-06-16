import React, { PropTypes } from 'react';

class DummyView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.component}
      </div>
    );
  }
}

DummyView.propTypes = {
  component: PropTypes.element.isRequired,
};

export default DummyView;
