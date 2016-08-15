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
};

export default RefreshableLink;

// import React from 'react';
// import { Link, History } from 'react-router';
// // import URI from '../../utils/URI';
// const RefreshableLink = React.createClass({
//   mixins:[History],
//
//   getDefaultProps() {
//     return {
//       refresh: false
//     }
//   },
//   getPropTypes() {
//     return {
//       // for refresh page, the whole page reload.
//       refresh: React.PropTypes.bool,
//       // cutomized regex match to test if current RefreshableLink is `active` state.
//       match: React.PropTypes.string
//     };
//   },
//
//   handLinkClick (e) {
//     if (this.props.refresh === true) {
//       window.location.href = e.target.href;
//     }
//   },
//
//   render () {
//     // Note there is an bug in ie <=11, this.history is undefined.
//     // the mixin has some problem in windows <IE10 use ES5 instead.
//     // let { to, match } = this.props;
//     // let isActive;
//     // let currentURL = window.location.href;
//     // let currentHash = currentURL.replace(URI.getUrl(), '/');
//     //
//     // if (match) {
//     //   let regExpStr = match.replace(/\//g,'\/');
//     //   isActive = new RegExp(regExpStr).test(currentHash);
//     // } else {
//     //   isActive = this.history.isActive(to, this.props.query);
//     // }
//
//     // let className = isActive ? 'active' : '';
//     return (
//       <Link onClick={this.handLinkClick} to={this.props.to}>{this.props.innerComponent}</Link>
//     );
//   }
// });
//
// module.exports = RefreshableLink;
