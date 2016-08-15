import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import GetMonView from './GetMonView';

class GetMonViewWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'GetMonViewWrapper';
  }
  componentWillMount() {
    this.props.fetchUserSession();
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

GetMonViewWrapper.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  propName: store.propName,
});

GetMonViewWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GetMonViewWrapper);
