import React from 'react';
import { Link } from 'react-router';

class RefreshableLink extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'RefreshableLink';
    this._handleLinkClick = this._handleLinkClick.bind(this);
  }
  _handleLinkClick(e) {
    window.locations.href = e.target.href;
  }
  render() {
    return (
      <Link onClick={this._handleLinkClick} to={this.props.to}>
        {this.props.innerComponent}
      </Link>
    );
  }
}

RefreshableLink.contextTypes = {
  router: React.PropTypes.object,
};

RefreshableLink.propTypes = {
  refresh: React.PropTypes.bool,
  match: React.PropTypes.string,
  to: React.PropTypes.string,
  innerComponent: React.PropTypes.object,
};

export default RefreshableLink;
