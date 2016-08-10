import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MainView';
  }
  componentWillMount() {
    this.props.dispatch(Actions.showLoading());
    if (this.props.showMessageModal.message !== '') {
      this.props.dispatch(Actions.showMessageModal());
    }
  }
  render() {
    const renderTemp = () => {
      if (this.props.user) {
        return <div>{ JSON.stringify(this.props.user) }</div>;
      }
    };
    return (
      <div>
        MainView
        { renderTemp() }
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
    user: store.user,
  };
}

MainView.propTypes = {
  showMessageModal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(MainView);
