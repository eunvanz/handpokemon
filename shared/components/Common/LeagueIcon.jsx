import React, { PropTypes } from 'react';
import { leagueIcons } from '../../util/constants';

class LeagueIcon extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'LeagueIcon';
  }
  render() {
    return (
      <i className={leagueIcons[this.props.league]}></i>
    );
  }
}

LeagueIcon.propTypes = {
  league: PropTypes.number,
};

export default LeagueIcon;
