import React, { PropTypes } from 'react';
import { workshopImgRoute } from '../../util/constants';
import CustomModal from '../Common/CustomModal';
import { updateOneLikes } from '../../service/WorkshopService';

class WorkshopComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'WorkshopComponent';
    this.state = {
      showModal: false,
      likes: this.props.workshop.likes.length,
    };
    this._showModal = this._showModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._handleOnClickLikes = this._handleOnClickLikes.bind(this);
    this._handleOnClickDelete = this._handleOnClickDelete.bind(this);
  }
  _showModal() {
    this.setState({
      showModal: true,
    });
  }
  _hideModal() {
    this.setState({
      showModal: false,
    });
  }
  _handleOnClickLikes() {
    if (this.props.workshop.likes.indexOf(this.props.user._id) !== -1) {
      alert('이미 추천 했습니다.') // eslint-disable-line
      return;
    }
    updateOneLikes(this.props.workshop, this.props.user)
    .then(() => {
      this.setState({
        likes: this.state.likes + 1,
      });
    });
  }
  _handleOnClickDelete() {
    const confirm = window.confirm('정말 삭제하겠습니까?'); // eslint-disable-line
    if (confirm) {
      this.props.onClickDelete(this.props.workshop);
      this._hideModal();
    }
  }
  render() {
    const workshop = this.props.workshop;
    const renderRegisterInfo = () => {
      if (workshop.registered) {
        return <span className="label label-info arrowed-in-right label-level">등록완료</span>;
      }
    };
    const renderLikesInfo = () => {
      let className = '';
      if (this.state.likes < 10) className = 'label-primary';
      else if (this.state.likes < 20) className = 'label-warning';
      else if (this.state.likes < 30) className = 'label-danger';
      else if (this.state.likes < 40) className = 'label-pink';
      else if (this.state.likes < 50) className = 'label-purple';
      else className = 'label-inverse';
      return <p><span className={`label label-lg ${className} arrowed-in arrowed-in-right`}><i className="fa fa-thumbs-up"></i> {this.state.likes}</span></p>;
    };
    const renderBodyComponent = () => {
      return (
        <div className="row">
          <div className="col-xs-12 align-center">
            <p>
              <img src={`${workshopImgRoute}/${workshop.img}`} style={{ width: '250px', height: '250px' }}/>
            </p>
            {renderLikesInfo()}
            <h4 className="text-primary">{workshop.title}</h4>
            <p>
              designed by <span className="badge badge-grey">{workshop.nickname}</span>
            </p>
            <p>{workshop.regDateString} 등록</p>
          </div>
        </div>
      );
    };
    const renderFooterComponent = () => {
      const returnComponent = [];
      if (this.props.user) {
        returnComponent.push(<button key="1" className="btn btn-primary like-btn" onClick={this._handleOnClickLikes}><i className="fa fa-thumbs-up"></i> 좋아요</button>);
      }
      if (this.props.user && this.props.user._id === this.props.workshop._user._id) {
        returnComponent.push(<button key="2" className="btn btn-warning" onClick={this._handleOnClickDelete}>삭제</button>);
      }
      returnComponent.push(<button key="3" className="btn btn-grey" onClick={this._hideModal}>닫기</button>);
      return <div>{returnComponent}</div>;
    };
    return (
      <div className="col-xs-6 col-sm-3 collection-item text-center">
        <div className="profile-picture" style={{ margin: '10px', width: '80%' }}>
          <div className="picks-image-container">
            <p>
              <img
                className="picks"
                src={`${workshopImgRoute}/${workshop.img}`}
                width="100%"
                onClick={this._showModal}
              />
            </p>
          </div>
          {renderRegisterInfo()}
          {renderLikesInfo()}
          <h5 className="text-primary">{workshop.title}</h5>
          <p>
            designed by <br/><span className="badge badge-grey">{workshop.nickname}</span>
          </p>
        </div>
        <CustomModal
          title="작품 정보"
          bodyComponent={renderBodyComponent()}
          footerComponent={renderFooterComponent()}
          show={this.state.showModal}
          close={this._hideModal}
          width={'450px'}
        />
      </div>
    );
  }
}

WorkshopComponent.contextTypes = {
  router: React.PropTypes.object,
};

WorkshopComponent.propTypes = {
  workshop: PropTypes.object,
  user: PropTypes.object,
  onClickDelete: PropTypes.func,
};

export default WorkshopComponent;
