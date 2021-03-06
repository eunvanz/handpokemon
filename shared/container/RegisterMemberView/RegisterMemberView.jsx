import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import PageHeader from '../../components/Common/PageHeader';
import WidgetBox from '../../components/Common/WidgetBox';
import MonsterCard from '../../components/Common/MonsterCard';
import request from 'superagent';
import $ from 'jquery';

class RegisterMemberView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RegisterMemberView';
    this.state = {
      email: '',
      password: '',
      password2: '',
      nickname: '',
      introduce: '',
      recommender: '',
      pickedMons: [],
    };
    this._pickMonsters = this._pickMonsters.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  componentWillMount() {
    this._pickMonsters();
  }
  componentDidMount() {
    const scriptSrcs = ['/js/jquery.inputlimiter.1.3.1.js', '/js/fuelux/fuelux.wizard.js',
    '/js/jquery.validate.js', '/js/additional-methods.js', '/js/bootbox.js', '/js/jquery.maskedinput.js',
    '/js/inline/register-member-view.js'];
    for (const src of scriptSrcs) {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    }
  }
  componentWillUnmount() {
    while (document.body.childElementCount !== 2) {
      document.body.removeChild(document.body.lastChild);
    }
  }
  _pickMonsters() {
    this.props.dispatch(Actions.fetchBasicPickMons())
    .then(() => {
      this.setState({
        pickedMons: this.props.pickedMons,
      });
    });
  }
  _handleSubmit() {
    if ($('.btn-next').html() === '작성완료') {
      console.log('pickedMons: ' + this.state.pickedMons);
      const formData = new FormData();
      formData.append('email', this.state.email);
      formData.append('password', this.state.password);
      formData.append('nickname', this.state.nickname);
      formData.append('introduce', this.state.introduce);
      formData.append('recommender', this.state.recommender);
      formData.append('pickedMons', this.state.pickedMons);
      formData.append('img', document.getElementById('img').files[0]);
      request.post('/api/users')
      .send(formData)
      .end((err, res) => {
        console.log('저기');
        request.post(`/api/collections/basic-pick/${res._id}`)
        .send(formData)
        .end(() => {
          location.href = '/';
        });
      });
      console.log('여기');
    }
  }
  _handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const renderMonsterCardComponent = () => {
      const returnComponent = [];
      const pickedMons = this.props.pickedMons;
      if (pickedMons) {
        for (let i = 0; i < 4; i++) {
          returnComponent.push(
            <MonsterCard
              key={i}
              monster={pickedMons[i]}
            />
          );
        }
      }
      return returnComponent;
    };
    const renderBody = () => {
      return (
        <div id="fuelux-wizard-container">
          <div>
            <ul className="steps">
              <li data-step="1" className="active"><span className="step">1</span>
                <span className="title">필수정보 입력</span></li>

              <li data-step="2">
                <span className="step">2</span>
                <span className="title">선택정보 입력</span>
              </li>

              <li data-step="3">
                <span className="step">3</span>
                <span className="title">기본 콜렉션 구성</span>
              </li>
            </ul>

          </div>

          <hr />

          <div className="step-content pos-rel">
            <form className="form-horizontal" role="form" id="validation-form"
              method="post" action="/api/users"
              encType="multipart/form-data"
            >
              <div className="step-pane active" data-step="1">
                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="email"
                  > 이메일주소 </label>
                  <div className="col-xs-12 col-sm-9" id="email-div">
                    <div className="clearfix">
                      <input type="email" name="email" id="email"
                        placeholder="example@pokemon.com"
                        className="col-xs-12 col-sm-6"
                        value={this.state.email}
                        onChange={this._handleInputChange}
                      />
                    </div>
                    <div className="email-help help-block">이벤트 및 패스워드를 찾을 때 사용되니 실제 이메일 주소를 입력해주세요.</div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="password"
                  > 패스워드 </label>
                  <div className="col-xs-12 col-sm-9">
                    <div className="clearfix">
                      <input type="password" name="password" id="password"
                        placeholder="4~12자리" className="col-xs-10 col-sm-5"
                        value={this.state.password}
                        onChange={this._handleInputChange}
                      />
                    </div>
                    <div className="password-help help-block">패스워드는 암호화되어 안전하게 보관됩니다.</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="password2"
                  > 패스워드 확인 </label>
                  <div className="col-xs-12 col-sm-9">
                    <div className="clearfix">
                      <input type="password" name="password2" id="password2"
                        placeholder="패스워드 재입력" className="col-xs-10 col-sm-5"
                        value={this.state.password2}
                        onChange={this._handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="nickname"
                  > 닉네임 </label>
                  <div className="col-xs-12 col-sm-9">
                    <div className="clearfix">
                      <input type="text" name="nickname" id="nickname"
                        placeholder="8자 이하" className="col-xs-10 col-sm-5"
                        value={this.state.nickname}
                        onChange={this._handleInputChange}
                      />
                    </div>
                    <div className="nickname-help help-block">띄어쓰기 및 몇몇 특수문자는 불가합니다.</div>
                  </div>
                </div>

              </div>

              <div className="step-pane" data-step="2">
                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="img"
                  > 프로필사진 </label>
                  <div className="col-sm-7">
                    <input multiple type="file" id="img"
                      name="img"
                    />

                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="introduce"
                  > 자기소개 </label>
                  <div className="col-sm-7">
                    <textarea className="form-control limited" id="introduce"
                      maxLength="80" name="introduce"
                      value={this.state.introduce}
                      onChange={this._handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="recommender"
                  > 추천인닉네임 </label>
                  <div className="col-xs-12 col-sm-9">
                    <div className="clearfix">
                      <input type="text" name="recommender" id="recommender"
                        placeholder="8자 이하" className="col-xs-10 col-sm-5"
                        value={this.state.recommender}
                        onChange={this._handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="step-pane" data-step="3">
                <div className="row" id="pre-pick">
                  <div className="col-sm-12 center">
                    <h3>아래의 버튼을 눌러 기본 포켓몬들을 뽑아봐!</h3>
                    <div className="space"></div>
                    <button type="button" className="btn btn-info btn-lg" id="pick-btn"><i className="fa fa-github-alt"></i> 포켓몬 뽑기</button>
                  </div>
                </div>
                <div className="row" id="post-pick">
                  <div className="col-sm-12 center">
                    {renderMonsterCardComponent()}
                  </div>
                  <div className="col-sm-12 align-center" style={{ marginTop: '40px' }}>
                  <button className="btn btn-info btn-sm" id="repick" onClick={this._pickMonsters}>
                    <i className="fa fa-refresh"></i> 다시뽑기
                  </button>
                  <input className="btn btn-info btn-sm" id="submit-btn"
                    type="submit" value="제출" style={{ display: 'none' }}
                  />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <hr />
          <div className="wizard-actions">
            <button className="btn btn-prev">
              <i className="ace-icon fa fa-arrow-left"></i> 이전단계
            </button>

            <button className="btn btn-success btn-next" data-last="작성완료" onClick={this._handleSubmit}>
              다음단계 <i className="ace-icon fa fa-arrow-right icon-on-right"></i>
            </button>

          </div>
        </div>
      );
    };
    return (
      <div id="register-member-view">
        <div className="page-content">
          <PageHeader title="회원가입" />
          <WidgetBox title="포켓몬 라이센스 등록 신청서"
            body={
              renderBody()
            }
          />
        </div>
      </div>
    );
  }
}

RegisterMemberView.need = [
  () => { return Actions.fetchBasicPickMons(); },
];

RegisterMemberView.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    pickedMons: store.pickedMons,
  };
}

RegisterMemberView.propTypes = {
  pickedMons: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    monNo: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainAttr: PropTypes.string.isRequired,
    subAttr: PropTypes.string.isRequired,
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
    hp: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    armor: PropTypes.number.isRequired,
    specialPower: PropTypes.number.isRequired,
    specialArmor: PropTypes.number.isRequired,
    dex: PropTypes.number.isRequired,
    skillName: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    beforeNo: PropTypes.number,
    desc: PropTypes.string,
    regDate: PropTypes.Strin,
    designer: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredPiece: PropTypes.number,
    point: PropTypes.number,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RegisterMemberView);
