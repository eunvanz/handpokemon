import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import request from 'superagent';
import $ from 'jquery';

class RegisterMonsterView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RegisterMonsterView';
    let mode = 'post';
    if (location.pathname.split('/')[2]) {
      mode = 'put';
    }
    this.state = {
      mode,
      name: '',
      monNo: '',
      mainAttr: '노말',
      subAttr: '없음',
      hp: '',
      power: '',
      armor: '',
      specialPower: '',
      specialArmor: '',
      dex: '',
      skillName: '',
      grade: 'b',
      cost: '1',
      beforeNo: '0',
      desc: '',
      requiredPiece: '',
      designer: '',
      point: '',
      suggestCost: '',
    };
    this._handleInputChange = this._handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  componentWillMount() {
    if (this.props.baseMons.length === 0) {
      this.props.dispatch(Actions.fetchBaseMons());
    }
    if (location.pathname.split('/')[2]) {
      this.props.dispatch(Actions.fetchOneMon(location.pathname.split('/')[2]));
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) this.setState(nextProps.mon);
  }
  componentWillUnmount() {
    if (this.props.mon) {
      this.props.dispatch(Actions.resetMon());
    }
  }
  _handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.hp && this.state.power && this.state.armor && this.state.specialPower && this.state.specialArmor && this.state.dex) {
      const total = Number(this.state.hp) + Number(this.state.power) +
        Number(this.state.armor) + Number(this.state.specialPower) +
        Number(this.state.specialArmor) + Number(this.state.dex);
      if (total <= 250) {
        this.setState({ suggestCost: 1 });
      } else if (total <= 300) {
        this.setState({ suggestCost: 2 });
      } else if (total <= 350) {
        this.setState({ suggestCost: 3 });
      } else if (total <= 400) {
        this.setState({ suggestCost: 4 });
      } else if (total <= 450) {
        this.setState({ suggestCost: 5 });
      } else if (total <= 500) {
        this.setState({ suggestCost: 6 });
      } else if (total <= 550) {
        this.setState({ suggestCost: 7 });
      } else if (total <= 600) {
        this.setState({ suggestCost: 8 });
      } else if (total <= 650) {
        this.setState({ suggestCost: 9 });
      } else if (total <= 700) {
        this.setState({ suggestCost: 10 });
      }
    }
  }
  _handleSubmit() {
    let requestType = request.post('/api/monsters');
    if (this.state.mode === 'put') {
      requestType = request.put('/api/monsters');
    }
    const formData = new FormData();
    formData.append('_id', $('#_id').val());
    formData.append('name', $('#name').val());
    formData.append('monNo', $('#monNo').val());
    formData.append('mainAttr', $('#mainAttr').val());
    formData.append('subAttr', $('#subAttr').val());
    formData.append('hp', $('#hp').val());
    formData.append('power', $('#power').val());
    formData.append('armor', $('#armor').val());
    formData.append('specialPower', $('#specialPower').val());
    formData.append('specialArmor', $('#specialArmor').val());
    formData.append('dex', $('#dex').val());
    formData.append('skillName', $('#skillName').val());
    formData.append('grade', $('#grade').val());
    formData.append('cost', $('#cost').val());
    formData.append('beforeNo', $('#beforeNo').val());
    formData.append('desc', $('#desc').val());
    formData.append('requiredPiece', $('#requiredPiece').val());
    formData.append('designer', $('#designer').val());
    formData.append('point', $('#point').val());
    formData.append('img', document.getElementById('img').files[0]);
    requestType
    .send(formData)
    .end(() => {
      $(location).attr('href', '/mon-list');
    });
  }
  render() {
    const renderAttrOption = (type) => {
      let attrs = [];
      if (type === 'main') {
        attrs = ['노말', '불꽃', '물', '전기', '풀', '얼음', '비행', '요정', '땅', '독', '격투', '염력', '벌레', '바위',
      '유령', '용', '악', '강'];
      } else {
        attrs = ['없음', '노말', '불꽃', '물', '전기', '풀', '얼음', '비행', '요정', '땅', '독', '격투', '염력', '벌레', '바위',
      '유령', '용', '악', '강'];
      }
      return attrs.map(attr => <option key={attr} value={attr}>{attr}</option>);
    };
    const renderGradeOption = () => {
      const grades = ['b', 'r', 'a', 'ar', 'e', 'l'];
      return grades.map(grade => <option key={grade} value={grade}>{grade}</option>);
    };
    const renderCostOptions = () => {
      const resultComponents = [];
      for (let i = 1; i <= 10; i++) {
        resultComponents.push(<option key={i} value={i}>{i}</option>);
      }
      return resultComponents;
    };
    const renderBeforeNoOptions = () => {
      const resultComponents = [];
      resultComponents.push(<option key="0" value="0">없음</option>);
      if (this.props.baseMons) {
        resultComponents.push(this.props.baseMons.map(mon => <option key={mon.monNo} value={mon.monNo}>{mon.name}</option>));
      }
      return resultComponents;
    };
    return (
      <div id="register-monster-view">
        <div className="page-content">
          <div className="page-header">
            <h1>포켓몬 등록</h1>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <form className="form-horizontal" role="form" name="monster-form"
                method="post" action="/api/monsters"
                encType="multipart/form-data"
              >

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="mon-name"
                  > _id </label>

                  <div className="col-sm-9">
                    <input type="text" id="_id" name="_id"
                      className="col-xs-10 col-sm-5"
                      disabled="disabled"
                      value={this.props.mon ? this.props.mon._id : ''}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="name"
                  > 포켓몬 이름 </label>

                  <div className="col-sm-9">
                    <input type="text" id="name" name="name"
                      className="col-xs-10 col-sm-5"
                      value={this.state ? this.state.name : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="monNo"
                  > 도감번호 </label>

                  <div className="col-sm-9">
                    <input type="text" id="monNo" name="monNo"
                      className="col-xs-10 col-sm-5"
                      value={this.state ? this.state.monNo : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="mainAttr"
                  > 주속성 </label>
                  <div className="col-sm-9">
                    <select className="form-control" id="mainAttr" name="mainAttr"
                      value={this.state ? this.state.mainAttr : '노말'}
                      onChange={this._handleInputChange}
                    >
                      { renderAttrOption('main') }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="subAttr"
                  > 부속성 </label>
                  <div className="col-sm-9">
                    <select className="form-control" id="subAttr" name="subAttr"
                      value={this.state ? this.state.subAttr : '없음'}
                      onChange={this._handleInputChange}
                    >
                      { renderAttrOption('sub') }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="img"
                  > 이미지 </label>

                  <div className="col-sm-9">
                    <input type="file" id="img" name="img" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="hp"
                  > 체력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="hp" name="hp"
                      value={this.state ? this.state.hp : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="power"
                  > 공격력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="power" name="power"
                      value={this.state ? this.state.power : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="armor"
                  > 방어력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="armor" name="armor"
                      value={this.state ? this.state.armor : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="specialPower"
                  > 특수공격력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="specialPower" name="specialPower"
                      value={this.state ? this.state.specialPower : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="specialArmor"
                  > 특수방어력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="specialArmor" name="specialArmor"
                      value={this.state ? this.state.specialArmor : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="dex"
                  > 민첩성 </label>

                  <div className="col-sm-9">
                    <input type="text" id="dex" name="dex"
                      value={this.state ? this.state.dex : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="skillName"
                  > 특수기술명 </label>

                  <div className="col-sm-9">
                    <input type="text" id="skillName" name="skillName"
                      value={this.state ? this.state.skillName : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="total"
                  > 종합 </label>

                  <div className="col-sm-9">
                    <input type="text" id="total" name="total"
                      disabled="disabled"
                      value={this.state ? Number(this.state.hp) + Number(this.state.power) +
                        Number(this.state.armor) + Number(this.state.specialPower) +
                        Number(this.state.specialArmor) + Number(this.state.dex) : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="suggestCost"
                  > 권장코스트 </label>

                  <div className="col-sm-9">
                    <input type="text" id="suggestCost" name="suggestCost"
                      disabled="disabled"
                      value={this.state.suggestCost}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="grade">
                    등급 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="grade" name="grade"
                      value={this.state ? this.state.grade : 'b'}
                      onChange={this._handleInputChange}
                    >
                      { renderGradeOption() }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="cost">
                    코스트 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="cost" name="cost"
                      value={this.state ? this.state.cost : '1'}
                      onChange={this._handleInputChange}
                    >
                      { renderCostOptions() }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="beforeNo"
                  > 전 단계 포켓몬 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="beforeNo" name="beforeNo"
                      value={this.state ? this.state.beforeNo : '0'}
                      onChange={this._handleInputChange}
                    >
                      { renderBeforeNoOptions() }
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="desc">
                    포켓몬 소개 </label>

                  <div className="col-sm-9">
                    <textarea className="form-control" id="desc" name="desc"
                      value={this.state ? this.state.desc : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="requiredPiece"
                  > 진화시 필요조각 </label>

                  <div className="col-sm-9">
                    <input type="text" id="requiredPiece" name="requiredPiece"
                      value={this.state ? this.state.requiredPiece : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="designer"
                  > 디자이너 </label>

                  <div className="col-sm-9">
                    <input type="text" id="designer" name="designer"
                      value={this.state ? this.state.designer : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="point"
                  > 포인트</label>

                  <div className="col-sm-9">
                    <input type="text" id="point" name="point"
                      value={this.state ? this.state.point : ''}
                      onChange={this._handleInputChange}
                    />
                  </div>
                </div>

                <div className="clearfix form-actions">
                  <div className="col-md-12 center">
                    <button className="btn btn-info" type="button" onClick={this._handleSubmit}>
                      <i className="ace-icon fa fa-check bigger-110"></i> 저장
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterMonsterView.need = [
  () => { return Actions.fetchBaseMons(); },
  () => { return Actions.fetchOneMon(); },
];

RegisterMonsterView.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    baseMons: store.baseMons,
    mon: store.mon,
  };
}

RegisterMonsterView.propTypes = {
  baseMons: PropTypes.arrayOf(PropTypes.shape({
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
  mon: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
  }),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RegisterMonsterView);
