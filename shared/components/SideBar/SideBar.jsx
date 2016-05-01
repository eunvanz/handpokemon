import React from 'react';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'SideBar';
  }
  render() {
    return (
      <div>
        <ul className="nav nav-list nav-list-vivid">
          <li className="nav-header">이웅희 님, 안녕?</li>
          <li>
            <a href="#">내 정보 수정</a>
          </li>
          <li>
            <a href="#">설정</a>
          </li>
          <li>
            <a href="#">로그인</a>
          </li>
          <li>
            <a href="#">회원가입</a>
          </li>
          <li>
            <a href="#">내 콜렉션</a>
          </li>
          <li>
            <a href="#">
              채집하기
              <span className="badge pull-right">10</span>
            </a>
          </li>
          <li>
            <a href="#">
              포켓몬시합
              <span className="badge pull-right">10</span>
            </a>
          </li>
          <li>
            <a href="#">
              커뮤니티
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
