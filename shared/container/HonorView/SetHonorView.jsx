import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import { getEnabledHonors, appendInlineScripts, removeInlineScripts } from '../../util/Util';
import ContentView from '../../components/Common/ContentView';
import HonorSetComponent from '../../components/Common/HonorSetComponent';
import keygen from 'keygenerator';
import CustomModal from '../../components/Common/CustomModal';
import HonorComponent from '../../components/Common/HonorComponent';
import { updateUserHonor } from '../../service/UserService';

class SetHonorView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SetHonorView';
    this.state = {
      enabledHonors: [],
      type1Honor: null,
      type2Honor: null,
      showSettingModal: false,
      honorSetComponentsMounted: false,
    };
    this._handleOnClickHonor = this._handleOnClickHonor.bind(this);
    this._showSettingModal = this._showSettingModal.bind(this);
    this._hideSettingModal = this._hideSettingModal.bind(this);
    this._handleOnClickSet = this._handleOnClickSet.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchUserSession())
    .then(() => {
      if (this.props.honors.length === 0) return this.props.dispatch(Actions.fetchHonors());
    })
    .then(() => {
      const enabledHonors = getEnabledHonors(this.props.user, this.props.honors);
      let type1Honor = null;
      let type2Honor = null;
      if (this.props.user._honor1) type1Honor = this.props.user._honor1;
      if (this.props.user._honor2) type2Honor = this.props.user._honor2;
      this.setState({
        enabledHonors,
        type1Honor,
        type2Honor,
        honorSetComponentsMounted: true,
      });
    });
  }
  componentDidMount() {
    this.props.dispatch(Actions.setMenu('honor-set-honor'));
    const scriptSrcs = ['/js/collection-view-inline.js'];
    appendInlineScripts(scriptSrcs);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // HonorSetComponent 선택 시 HonorSetComponent의 Re-Mount 방지
    return (nextState.honorSetComponentsMounted) || ((nextState.type1Honor === this.state.type1Honor) && (nextState.type2Honor === this.state.type2Honor));
  }
  componentWillUnmount() {
    removeInlineScripts();
  }
  _handleOnClickHonor(honor) {
    // selectedHonors에 honor가 있을 경우 제거, 없을경우 추가
    // selectedHonors.length가 2 이상일 경우 팝업
    if (this.state.type1Honor && this.state.type2Honor) {
      this.props.dispatch(Actions.prepareMessageModal('칭호는 최대 2개 까지 선택 가능합니다.'));
      this.props.dispatch(Actions.showMessageModal());
    } else {
      const type1Honor = this.state.type1Honor;
      const type2Honor = this.state.type2Honor;
      if (type1Honor && type1Honor.no === honor.no) {
        this.setState({ type1Honor: null });
      } else if (type2Honor && type2Honor.no === honor.no) {
        this.setState({ type2Honor: null });
      } else {
        if (honor.type === 1) this.setState({ type1Honor: honor });
        else if (honor.type === 2) this.setState({ type2Honor: honor });
      }
    }
  }
  _handleOnClickSet() {
    updateUserHonor(this.props.user, this.state.type1Honor, this.state.type2Honor)
    .then(() => {
      this.props.dispatch(Actions.prepareMessageModal('칭호가 변경되었습니다.'));
      this.setState({ showSettingModal: false });
      this.props.dispatch(Actions.showMessageModal());
      return this.props.dispatch(Actions.fetchUserSession());
    });
  }
  _showSettingModal() {
    this.setState({ showSettingModal: true });
  }
  _hideSettingModal() {
    this.setState({ showSettingModal: false });
  }
  render() {
    const renderFunctionBar = () => {
      return (
        <div className="row function-section">
          <div className="col-xs-12 widget-container-col function-bar"
            style={{ zIndex: '999' }}
          >
            <div className="widget-box widget-box-function">
              <div className="widget-body">
                <div className="widget-main">
                  <div className="row">
                    <div className="col-sm-6 hidden-xs">
                      <h5>콜렉션타입, 속성타입 칭호 하나씩 설정 가능합니다.</h5>
                    </div>
                    <div className="col-sm-6 visible-xs-inline-block">
                      <h6>콜렉션타입, 속성타입 칭호 하나씩 설정 가능</h6>
                    </div>
                    <div
                      className="col-sm-6 text-right visible-xs-inline-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"
                    >
                      <button className="btn btn-primary hidden-xs" onClick={this._showSettingModal}>
                        <i className="ace-icon fa fa-flask"></i> 설정하기
                      </button>
                      <button
                        className="btn btn-primary btn-xs visible-xs-inline-block"
                        onClick={this._showSettingModal}
                      >
                        설정하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderHonorComponents = () => {
      if (this.state.enabledHonors.length > 0) {
        const enabledHonors = this.state.enabledHonors;
        return enabledHonors.map(honor => {
          return (
            <HonorSetComponent
              key={keygen._()}
              honor={honor}
              onClick={this._handleOnClickHonor}
              selectable={this.state.enabledHonors.length < 2}
              selected={(honor.no === (this.state.type1Honor ? this.state.type1Honor.no : 0)) || (honor.no === (this.state.type2Honor ? this.state.type2Honor.no : 0))}
            />
          );
        });
      }
    };
    const renderSettingBody = () => {
      const type1Honor = this.state.type1Honor;
      const type2Honor = this.state.type2Honor;
      if (type1Honor || type2Honor) {
        return (
          <div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <HonorComponent honor={this.state.type1Honor} secondHonor={this.state.type2Honor}/>
                <div style={{ marginBottom: '10px' }}></div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>체력</b></big>
                <b className="visible-xs">체력</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[0] : 0) + (type2Honor ? type2Honor.burf[0] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[0] : 0) + (type2Honor ? type2Honor.burf[0] : 0)}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>공격</b></big>
                <b className="visible-xs">공격</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[1] : 0) + (type2Honor ? type2Honor.burf[1] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[1] : 0) + (type2Honor ? type2Honor.burf[1] : 0)}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>방어</b></big>
                <b className="visible-xs">방어</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[2] : 0) + (type2Honor ? type2Honor.burf[2] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[2] : 0) + (type2Honor ? type2Honor.burf[2] : 0)}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>특공</b></big>
                <b className="visible-xs">특공</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[3] : 0) + (type2Honor ? type2Honor.burf[3] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[3] : 0) + (type2Honor ? type2Honor.burf[3] : 0)}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>특방</b></big>
                <b className="visible-xs">특방</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[4] : 0) + (type2Honor ? type2Honor.burf[4] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[4] : 0) + (type2Honor ? type2Honor.burf[4] : 0)}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>민첩</b></big>
                <b className="visible-xs">민첩</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>+{(type1Honor ? type1Honor.burf[5] : 0) + (type2Honor ? type2Honor.burf[5] : 0)}</b></big>
                <b className="visible-xs">+{(type1Honor ? type1Honor.burf[5] : 0) + (type2Honor ? type2Honor.burf[5] : 0)}</b>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div>칭호 설정 안함</div>
      );
    };
    const renderSettingFooter = () => {
      return (
        <div>
          <button className="btn btn-default" onClick={this._hideSettingModal}>취소</button>
          <button className="btn btn-primary" onClick={this._handleOnClickSet}>변경</button>
        </div>
      );
    };
    const renderSettingModal = () => {
      return (
        <CustomModal
          title="칭호를 변경하겠습니까?"
          bodyComponent={renderSettingBody()}
          footerComponent={renderSettingFooter()}
          show={this.state.showSettingModal}
          width="250px"
          close={this._hideSettingModal}
        />
    );
    };
    const renderContent = () => {
      return (
        <div>
          {renderFunctionBar()}
          <div className="row collection-container">
            {renderHonorComponents()}
          </div>
          {renderSettingModal()}
        </div>
      );
    };
    return (
      <ContentView
        title="칭호 설정"
        content={renderContent()}
      />
    );
  }
}

SetHonorView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  honors: store.honors,
  user: store.user,
});

SetHonorView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  honors: PropTypes.array,
  user: PropTypes.object,
};

export default connect(mapStateToProps)(SetHonorView);
