import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MainView';
  }
  componentWillMount() {
    if (this.props.showMessageModal.message !== '') {
      this.props.dispatch(Actions.showMessageModal());
    }
  }
  render() {
    return (
      <div>
        MainView
      </div>
    );
  }
}

MainView.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    showMessageModal: store.showMessageModal,
  };
}

MainView.propTypes = {
  showMessageModal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MainView);
