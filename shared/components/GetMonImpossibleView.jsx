import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ErrorView from './Common/ErrorView';
import { Link  } from 'react-router';

class GetMonImpossibleView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'GetMonImpossibleView';
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.getCredit > 0) {
      this.context.router.push('/get-mon-ready');
    }
  }
  render() {
    return (
      <div>
        <ErrorView
          title="아직 채집을 할 수 없어."
          msg="그 동안 교배나 진화를 시켜보는 건 어때?"
          buttons={
            <Link to={`/collection/${this.props.user._id}`}>
              <button className="btn btn-primary">
                <i className="ace-icon fa fa-github-alt"></i> 내 콜렉션
              </button>
            </Link>
          }
        />
      </div>
    );
  }
}

GetMonImpossibleView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
});

GetMonImpossibleView.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(GetMonImpossibleView);
