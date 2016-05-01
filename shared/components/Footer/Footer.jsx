import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Footer';
  }
  render() {
    return (
      <div className="container">
        <div className="bottom-menu">
          <div className="container">
            <h5 className="title">Title</h5>
            <ul className="bottom-menu-list">
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </div>
      </div>
      );
  }
}

export default Footer;
