import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import EntryComponent from '../../components/Common/EntryComponent';

class BattleRivalView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'BattleRivalView';
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      return this.props.dispatch(Actions.fetchRivalForLeague(this.props.user));
    });
  }
  render() {
    const renderContent = () => {
      if (this.props.user) {
        return (
          <div>
            <EntryComponent
              rivalEntry
              user={this.props.user}
            />
            <div className="row">
              <div className="col-xs-12 text-center">
                <h2 className="text-primary"><strong>VS</strong></h2>
              </div>
            </div>
            <EntryComponent
              myEntry
              user={this.props.user}
            />
          </div>
        );
      }
    };
    return (
      <ContentView
        title="출전 포켓몬 확인"
        content={renderContent()}
      />
    );
  }
}

BattleRivalView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  rival: store.rival,
});

BattleRivalView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  rival: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(BattleRivalView);
