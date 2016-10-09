import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import { getMissionNameFromHonor } from '../../util/Util';
import ContentView from '../../components/Common/ContentView';
import HonorComponent from '../../components/Common/HonorComponent';
import keygen from 'keygenerator';

class MissionStateView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MissionStateView';
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      if (this.props.honors.length === 0) return this.props.dispatch(Actions.fetchHonors());
    });
  }
  componentDidMount() {
    this.props.dispatch(Actions.setMenu('honor-mission-state'));
  }
  render() {
    const renderTbody = () => {
      return this.props.honors.map(honor => {
        const completed = this.props.user.completedHonors.filter(honorNo => { return honorNo === honor.no; }).length > 0;
        return (
          <tr key={keygen._()}>
            <td className="center">{getMissionNameFromHonor(honor)}</td>
            <td className="center hidden-xs">
              <span className={`badge ${completed ? 'badge-info' : 'badge-default'}`}>
                <big><i className={`fa fa-${completed ? 'check' : 'times'}`}></i>{completed ? '달성' : '미달성'}</big>
              </span>
            </td>
            <td className="center">
              포키머니 <span className={`badge badge-${completed ? 'primary' : 'default'}`}>{honor.reward}</span>
            </td>
            <td className="center">
              <HonorComponent honor={honor} disabled={!completed}/>
            </td>
          </tr>
        );
      });
    };
    const renderContent = () => {
      return (
        <div className="row">
          <div className="col-xs-12">
            <table id="simple-table" className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="center">업적명</th>
                  <th className="center hidden-xs">달성여부</th>
                  <th className="center">보상</th>
                  <th className="center">획득칭호</th>
                </tr>
              </thead>
              <tbody>
                {renderTbody()}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
    return (
      <ContentView
        title="업적달성 현황"
        content={renderContent()}
      />
    );
  }
}

MissionStateView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  honors: store.honors,
  user: store.user,
});

MissionStateView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  honors: PropTypes.array,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(MissionStateView);
