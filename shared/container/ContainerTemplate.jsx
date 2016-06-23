import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class ContainerName extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'ContainerName';
  }
  render() {
    return (
      <div></div>
    );
  }
}

ContainerName.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  propName: store.propName,
});

ContainerName.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ContainerName);
