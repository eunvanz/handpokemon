import React, { PropTypes } from 'react';
import { userImgRoute } from '../../util/constants';

class UserPhotoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'UserPhotoComponent';
  }
  render() {
    const user = this.props.user;
    return (
      <div>
        <div className="user-photo-container">
          <div className="focuspoint user-photo-ranking" data-focus-x="0" data-focus-y="0">
          <img className="user-photo-ranking" src={`${userImgRoute}/${user.img}_thumb`}/>
          </div>
        </div>
        <h5 className={`${this.props.hiddenXs ? 'hidden-xs' : null}`}>{user.nickname}</h5>
      </div>
    );
  }
}

UserPhotoComponent.propTypes = {
  user: PropTypes.object.isRequired,
  hiddenXs: PropTypes.bool,
};

export default UserPhotoComponent;
