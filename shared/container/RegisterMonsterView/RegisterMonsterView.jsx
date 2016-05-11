import React from 'react';
import $ from 'jquery';

class RegisterMonsterView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RegisterMonsterView';
    this.state = {
      baseMonsters: [],
    };
  }
  componentWillMount() {
    $.ajax({
      url: '/api/monsters/base-type',
      method: 'GET',
      type: 'JSON',
      success: (data) => {
        this.setState({ baseMonsters: data });
      },
    });
  }
  render() {
    const getBasePokemonOptions = () => {
      const returnComponent = this.state.baseMonsters.map(
        monster => <option key={monster.monNo} value={monster.monNo}>{monster.name}</option>
      );
      return returnComponent;
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
                    htmlFor="mon-name"> 포켓몬 이름 </label>

                  <div className="col-sm-9">
                    <input type="text" id="mon-name" name="name"
                      className="col-xs-10 col-sm-5"
                      ref={name => this._name = name}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="mon-no"> 도감번호 </label>

                  <div className="col-sm-9">
                    <input type="text" id="mon-no" name="monNo"
                      className="col-xs-10 col-sm-5"
                      ref={name => this._name = name}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="attribute"> 주속성 </label>
                  <div className="col-sm-9">
                    <select className="form-control" id="attribute" name="mainAttr">
                      <option value="노말">노말</option>
                      <option value="불꽃">불꽃</option>
                      <option value="물">물</option>
                      <option value="전기">전기</option>
                      <option value="풀">풀</option>
                      <option value="얼음">얼음</option>
                      <option value="땅">땅</option>
                      <option value="독">독</option>
                      <option value="비행">비행</option>
                      <option value="요정">요정</option>
                      <option value="격투">격투</option>
                      <option value="염력">염력</option>
                      <option value="벌레">벌레</option>
                      <option value="바위">바위</option>
                      <option value="유령">유령</option>
                      <option value="용">용</option>
                      <option value="악">악</option>
                      <option value="강철">강철</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="attribute"> 부속성 </label>
                  <div className="col-sm-9">
                    <select className="form-control" id="attribute" name="subAttr">
                      <option value="노말">노말</option>
                      <option value="불꽃">불꽃</option>
                      <option value="물">물</option>
                      <option value="전기">전기</option>
                      <option value="풀">풀</option>
                      <option value="얼음">얼음</option>
                      <option value="땅">땅</option>
                      <option value="독">독</option>
                      <option value="비행">비행</option>
                      <option value="요정">요정</option>
                      <option value="격투">격투</option>
                      <option value="염력">염력</option>
                      <option value="벌레">벌레</option>
                      <option value="바위">바위</option>
                      <option value="유령">유령</option>
                      <option value="용">용</option>
                      <option value="악">악</option>
                      <option value="강철">강철</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="mon-img"> 이미지 </label>

                  <div className="col-sm-9">
                    <input type="file" id="mon-img" name="img" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="hp-spinner"> 체력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="hp-spinner" name="hp" ref={hp => this._hp = hp}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="power-spinner"> 공격력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="power-spinner" name="power" ref={power => this._power = power}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="armor-spinner"> 방어력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="armor-spinner" name="armor" ref={armor => this._armor = armor}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="special-power-spinner"> 특수공격력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="special-power-spinner" name="specialPower" ref={specialPower => this._specialPower = specialPower}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="special-armor-spinner"> 특수방어력 </label>

                  <div className="col-sm-9">
                    <input type="text" id="special-armor-spinner" name="specialArmor" ref={specialArmor => this._specialArmor = specialArmor}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="dex-spinner"> 민첩성 </label>

                  <div className="col-sm-9">
                    <input type="text" id="dex-spinner" name="dex" ref={dex => this._dex = dex}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="skill-name"> 특수기술명 </label>

                  <div className="col-sm-9">
                    <input type="text" id="skill-name" name="skillName" ref={skillName => this._skillName = skillName}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="grade">
                    등급 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="grade" name="grade">
                      <option value="b">베이직</option>
                      <option value="r">레어</option>
                      <option value="a">어드벤스드</option>
                      <option value="ar">어드벤스드레어</option>
                      <option value="e">엘리트</option>
                      <option value="l">레전드</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="cost">
                    코스트 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="cost" name="cost">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="before-no"> 전 단계 포켓몬 </label>

                  <div className="col-sm-9">
                    <select className="form-control" id="before-no" name="beforeNo">
                      <option value="">없음</option>
                      {getBasePokemonOptions()}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right" htmlFor="desc">
                    포켓몬 소개 </label>

                  <div className="col-sm-9">
                    <textarea className="form-control" id="desc" name="desc"></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="required-piece"> 진화시 필요조각 </label>

                  <div className="col-sm-9">
                    <input type="text" id="required-piece" name="requiredPiece" ref={requiredPiece => this._requiredPiece = requiredPiece}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="designer"> 디자이너 </label>

                  <div className="col-sm-9">
                    <input type="text" id="designer" name="designer" ref={designer => this._designer = designer}/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-3 control-label no-padding-right"
                    htmlFor="designer"> 포인트</label>

                  <div className="col-sm-9">
                    <input type="text" id="point" name="point" ref={point => this._point = point}/>
                  </div>
                </div>

                <div className="clearfix form-actions">
                  <div className="col-md-12 center">
                    <button className="btn btn-info" type="submit">
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

export default RegisterMonsterView;
