import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import ContentView from '../../components/Common/ContentView';
import CustomModal from '../../components/Common/CustomModal';
import WorkshopComponent from '../../components/Workshop/WorkshopComponent';
import { appendInlineScripts, removeInlineScripts } from '../../util/Util';
import request from 'superagent';
import $ from 'jquery';
import { deleteWorkshop } from '../../service/WorkshopService';
import keygen from 'keygenerator';

class WorkshopView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'WorkshopView';
    this.state = {
      showWriteModal: false,
      title: '',
      refreshFlag: false,
    };
    this._showWriteModal = this._showWriteModal.bind(this);
    this._hideWriteModal = this._hideWriteModal.bind(this);
    this._handleOnClickRegister = this._handleOnClickRegister.bind(this);
    this._handleOnChangeInput = this._handleOnChangeInput.bind(this);
    this._handleOnClickDelete = this._handleOnClickDelete.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchWorkshopItems());
  }
  componentWillUnmount() {
    removeInlineScripts();
  }
  _showWriteModal() {
    this.setState({
      showWriteModal: true,
    });
    const scripts = ['/js/inline/workshop-view.js'];
    appendInlineScripts(scripts);
  }
  _hideWriteModal() {
    this.setState({
      showWriteModal: false,
    });
  }
  _handleOnClickRegister() {
    if (this.state.title.length > 10) {
      alert('포켓몬 이름은 10자를 넘어갈 수 없습니다.'); // eslint-disable-line
      return;
    }
    if (this.state.title.length === 0 || !$('#img').val()) {
      alert('포켓몬 이름 입력과 이미지 파일 첨부는 필수입니다.'); // eslint-disable-line
      return;
    }
    $('.register-btn').attr('disabled', 'disabled');
    const formData = new FormData();
    const file = document.getElementById('img').files[0];
    formData.append('_user', this.props.user._id);
    formData.append('title', $('#title').val());
    formData.append('nickname', this.props.user.nickname);
    formData.append('img', file);
    request.post('/api/workshops')
    .send(formData)
    .end(() => {
      this._hideWriteModal();
      this.props.dispatch(Actions.prepareMessageModal('등록이 완료되었습니다.'));
      this.props.dispatch(Actions.showMessageModal());
      return this.props.dispatch(Actions.fetchWorkshopItems());
    });
  }
  _handleOnChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  _handleOnClickDelete(workshop) {
    deleteWorkshop(workshop)
    .then(() => {
      this.props.dispatch(Actions.fetchWorkshopItems());
    });
  }
  render() {
    const renderWriteBtn = () => {
      if (this.props.user) {
        const renderBodyComponent = () => {
          return (
            <div>
              <div className="row">
                <div className="col-xs-3 align-right">
                  <h5 className="text-primary">
                    <b>포켓몬 이름</b>
                  </h5>
                </div>
                <div className="col-xs-9 align-right">
                  <input type="text" name="title" id="title" className="col-xs-10" onChange={this._handleOnChangeInput}/>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-3 align-right">
                  <h5 className="text-primary">
                    <b>파일 선택</b>
                  </h5>
                </div>
                <div className="col-xs-9 align-left">
                  <input multiple="" type="file" name="img" id="img"/>
                  <p>250 * 250 사이즈의 PNG 파일로 등록해주세요. 사이즈가 안맞을 경우 임의 삭제됩니다.</p>
                </div>
              </div>
            </div>
          );
        };
        const renderFooterComponent = () => {
          return (
            <div className="text-right">
              <button className="btn btn-grey" style={{ marginRight: '4px' }} onClick={this._hideWriteModal}>닫기</button>
              <button className="btn btn-primary register-btn" onClick={this._handleOnClickRegister}>등록</button>
            </div>
          );
        };
        return (
          <div className="col-xs-12 text-right">
            <button className="btn btn-info" onClick={this._showWriteModal}>
              <i className="fa fa-paint-brush"></i> 작품 등록
            </button>
            <CustomModal
              title="작품 등록"
              bodyComponent={renderBodyComponent()}
              footerComponent={renderFooterComponent()}
              show={this.state.showWriteModal}
              close={this._hideWriteModal}
              width={'450px'}
            />
          </div>
        );
      }
    };
    const renderWorkshopComponents = () => {
      if (this.props.workshops) {
        const workshops = this.props.workshops;
        return workshops.map(workshop =>
          <WorkshopComponent
            workshop={workshop}
            user={this.props.user}
            key={keygen._()}
            onClickDelete={this._handleOnClickDelete}
          />
        );
      }
    };
    const renderContent = () => {
      return (
        <div className="row collection-container">
          {renderWriteBtn()}
          {renderWorkshopComponents()}
        </div>
      );
    };
    return (
      <ContentView
        key={this.state.refreshFlag}
        title="포켓몬 공작소"
        content={renderContent()}
      />
    );
  }
}

WorkshopView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  user: store.user,
  workshops: store.workshops,
});

WorkshopView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  workshops: PropTypes.array,
};

export default connect(mapStateToProps)(WorkshopView);
