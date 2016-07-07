import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import LoadingView from '../../components/Common/LoadingView';
import $ from 'jquery';

const scratchStyle = {
  width: '200px',
  height: '200px',
  backgroundImage: 'url("/img/common/scratchbg.png")',
  margin: '0 auto',
};

class GetMonView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'GetMonView';
  }
  componentDidMount() {
    const user = this.props.user;
    this.props.dispatch(Actions.fetchOneMonWhenGet())
    .then(() => {
      return new Promise((resolve) => {
        const isNewMon = this.props.mon.level === 1;
        // 새로운 포켓몬일 경우 유저 콜렉션 점수 증가
        if (isNewMon) user.colPoint += this.props.mon._mon.point;
        // 유저 크레딧 차감
        const interval = Date.now() - user.lastGetTime;
        const credit = Math.floor(interval / user.getInterval);
        user.getCredit += credit;
        if (user.getCredit > user.maxGetCredit) user.getCredit = user.maxGetCredit;
        user.getCredit--;
        user.lastGetTime = Date.now();
        console.log('user.lastGetTime: ' + user.lastGetTime);
        // db에 유저정보 업데이트
        // console.log('JSON.stringify(): ' + JSON.stringify(user));
        $.ajax({
          url: `/api/users/${user._id}`,
          method: 'put',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
          data: { user: JSON.stringify(user) },
          success: () => {
            this.props.dispatch(Actions.fetchUserSession())
            .then(resolve());
          },
        });
      });
    })
    .then(() => {
      const scriptSrcs = ['/js/wScratchpad.min.js', '/js/common-getmon.js', '/js/getmon-ev.js', '/js/get-mon-view-inline.js'];
      for (const src of scriptSrcs) {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
      }
    });
  }
  componentWillUnmount() {
    while (document.body.childElementCount !== 2) {
      document.body.removeChild(document.body.lastChild);
    }
  }
  render() {
    const renderLevelInfo = () => {
      let returnComponent = null;
      const isNewMon = this.props.mon.level === 1;
      if (isNewMon) {
        returnComponent = (<div className="col-xs-12 align-center">
          <p>
            <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
              <b>새로운 포켓몬</b>
            </span>
          </p>
          <h5>
            콜렉션점수 : <span className="badge badge-warning">{`+${this.props.mon._mon.point}`}</span>
          </h5>
        </div>);
      } else {
        returnComponent = (
          <div className="col-xs-12 align-center">
            <p>
              <span className="label label-xlg label-danger arrowed-in arrowed-in-right">
                <b>레벨 업</b>
              </span>
            </p>
            <h5>
              <span className="label label-info arrowed-in-right">{`LV. ${this.props.mon.level}`}</span> 이(가) 되었다!
              <button className="btn btn-primary btn-minier ev-btn" id="ev-btn">
                <i className="ace-icon fa fa-flash"></i> 진화하기
              </button>
            </h5>
          </div>
        );
      }
      return returnComponent;
    };
    const renderGetResult = () => {
      let returnComponent = null;
      if (this.props.mon) {
        returnComponent = (
          <div id="get-mon-view">
            <div className="page-content">
              <div className="page-header">
                <h1>포켓몬 채집</h1>
              </div>
              <div className="row">
                <div className="space hidden-xs"></div>
                <div className="space hidden-xs"></div>
                <div className="space hidden-xs"></div>
                <div className="col-xs-12 align-center">
                  <p>
                    <big>야호! 새로운 포켓몬 친구를 발견했어!<br/>과연 어떤 친구일까?</big>
                  </p>
                  <div className="scratch-container">
                    <div id="demo2" className="scratchpad" style={scratchStyle}></div>
                    <input type="hidden" id="monImg" value={this.props.mon._mon.img}/>
                  </div>
                  <div className="space"></div>
                  <div className="info-container">
                    <div className="monster-info" style={{ display: 'none', width: '280px', margin: '0 auto' }}>
                      <div className="row">
                        {renderLevelInfo()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        returnComponent = <LoadingView/>;
      }
      return returnComponent;
    };
    return (
      <div>{renderGetResult()}</div>
    );
  }
}

GetMonView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  mon: store.mon,
  user: store.user,
});

GetMonView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mon: PropTypes.object,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(GetMonView);
