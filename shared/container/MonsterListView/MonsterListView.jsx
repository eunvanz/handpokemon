import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import { Link } from 'react-router';

class MonsterListView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'MonsterListView';
  }
  componentDidMount() {
    if (this.props.allMons.length === 0) {
      this.props.dispatch(Actions.fetchAllMons());
    }
  }
  render() {
    return (
      <div id="monster-list-view">
        <div className="page-content">
          <div className="page-header">
            <h1>
              포켓몬 목록
            </h1>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12">
                  <table id="simple-table"
                    className="table table-striped table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>포켓몬 이름</th>
                        <th className="hidden-480">주속성</th>
                        <th className="hidden-480">부속성</th>
                        <th className="hidden-480">등급</th>
                        <th className="hidden-480">코스트</th>
                        <th>등록일</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        this.props.allMons.map(mon =>
                          <tr key={mon.monNo}>
                            <td>{mon.monNo}</td>
                            <td>
                              <Link to={`/mon-list/${mon.monNo}`}>
                                {mon.name}
                              </Link>
                            </td>
                            <td>{mon.mainAttr}</td>
                            <td>{mon.subAttr}</td>
                            <td>{mon.grade}</td>
                            <td>{mon.cost}</td>
                            <td>{mon.regDate }</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                  <div className="clearfix form-actions">
                    <div className="col-md-12 center">
                      <Link to="/register-monster">
                        <button className="btn btn-info" type="button" id="add-btn">
                          <i className="ace-icon fa fa-check bigger-110"></i> 추가
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
MonsterListView.need = [() => { return Actions.fetchAllMons(); }];
MonsterListView.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    allMons: store.allMons,
  };
}

MonsterListView.propTypes = {
  allMons: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MonsterListView);
