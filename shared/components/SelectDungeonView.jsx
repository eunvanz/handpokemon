import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class SelectDungeonView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SelectDungeonView';
    this._handleClickGetBtn = this._handleClickGetBtn.bind(this);
  }
  _handleClickGetBtn() {
    $('button').attr('disabled', 'disabled');
  }
  render() {
    return (
      <div className="page-content">
        <div className="page-header">
          <h1>
            포켓몬 채집
          </h1>
        </div>
        <div className="row">
          <div className="col-xs-12 align-center center-middle">
            <p><big>새로운 포켓몬 친구를 만날 준비가 됐니?<br/>아래의 던전중에 하나를 선택해보렴.</big></p>
            <div className="row">
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">황량한 대지</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p><span className="label label-sm label-grey arrowed-in">노말</span>
                      <span className="label label-sm label-inverse arrowed-in">땅</span>
                      <span className="label label-sm label-ghost arrowed-in">유령</span></p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">뜨끈한 불지옥</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p><span className="label label-sm label-danger arrowed-in">불꽃</span>
                      <span className="label label-sm label-light arrowed-in">비행</span>
                      <span className="label label-sm label-iron arrowed-in">강철</span></p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">신비로운 동굴</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p><span className="label label-sm label-esper arrowed-in">염력</span>
                      <span className="label label-sm label-purple arrowed-in">독</span>
                      <span className="label label-sm label-dragon arrowed-in">용</span></p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">어둠의 탑</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p>
                        <span className="label label-sm label-yellow arrowed-in">전기</span>
                        <span className="label label-sm label-bug arrowed-in">벌레</span>
                        <span className="label label-sm label-evil arrowed-in">악</span>
                      </p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">수련자의 숲</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p>
                        <span className="label label-sm label-success arrowed-in">풀</span>
                        <span className="label label-sm label-fighter arrowed-in">격투</span>
                        <span className="label label-sm label-rock arrowed-in">바위</span>
                      </p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">요정의 바다</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p>
                        <span className="label label-sm label-primary arrowed-in">물</span>
                        <span className="label label-sm label-info arrowed-in">얼음</span>
                        <span className="label label-sm label-pink arrowed-in">요정</span>
                      </p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12">
                <div className="widget-box">
                  <div className="widget-header" style={{ paddingLeft: '0px' }}>
                    <h4 className="blue">중앙 던전</h4>
                  </div>
                  <div className="widget-body">
                    <div className="widget-main">
                      <p>모든 속성의 포켓몬 서식</p>
                      <p>
                        <Link to="/get-mon">
                          <button onClick={this._handleClickGetBtn} className="btn btn-primary btn-xlg get-mon-btn">
                            채집하기
                          </button>
                        </Link>
                      </p>
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

export default SelectDungeonView;