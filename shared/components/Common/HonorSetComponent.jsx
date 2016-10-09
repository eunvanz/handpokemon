import React, { PropTypes } from 'react';
import HonorComponent from './HonorComponent';
import { commonImgRoute } from '../../util/constants';
import $ from 'jquery';

class HonorSetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'HonorSetComponent';
    this._handleOnClick = this._handleOnClick.bind(this);
    this._showCheck = this._showCheck.bind(this);
    this._hideCheck = this._hideCheck.bind(this);
  }
  componentWillMount() {
    if (this.props.selected) this._showCheck();
  }
  componentDidMount() {
    if (this.props.selected) this._showCheck();
  }
  componentWillUpdate(nextProps) {
    if (nextProps.selected) this._showCheck();
  }
  _showCheck() {
    $('.check').css('display', 'block')
    .css('top', $('.profile-picture').height() * -1);
  }
  _hideCheck() {
    $('.check').css('display', 'none');
  }
  _handleOnClick() {
    if (this.props.selectable) {
      if ($('.check').css('display') === 'none') {
        this._showCheck();
      } else {
        this._hideCheck();
      }
      this.props.onClick(this.props.honor);
    }
  }
  render() {
    const honor = this.props.honor;
    return (
      <div className="col-xs-6 col-sm-3 collection-item text-center">
        <div className="profile-picture" style={{ margin: '10px', width: '80%', cursor: 'pointer' }} onClick={this._handleOnClick}>
          <div className="pick-image-container">
            <HonorComponent honor={honor}/>
            <div style={{ marginBottom: '10px' }}></div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>체력</b></big>
                <b className="visible-xs">체력</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[0] !== 0 ? `+${honor.burf[0]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[0] !== 0 ? `+${honor.burf[0]}` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>공격</b></big>
                <b className="visible-xs">공격</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[1] !== 0 ? `+${honor.burf[1]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[1] !== 0 ? `+${honor.burf[1]}` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>방어</b></big>
                <b className="visible-xs">방어</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[2] !== 0 ? `+${honor.burf[2]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[2] !== 0 ? `+${honor.burf[2]}` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>특공</b></big>
                <b className="visible-xs">특공</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[3] !== 0 ? `+${honor.burf[3]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[3] !== 0 ? `+${honor.burf[3]}` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>특방</b></big>
                <b className="visible-xs">특방</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[4] !== 0 ? `+${honor.burf[4]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[4] !== 0 ? `+${honor.burf[4]}` : null}</b>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 text-right">
                <big className="hidden-xs"><b>민첩</b></big>
                <b className="visible-xs">민첩</b>
              </div>
              <div className="col-xs-6 text-left text-primary">
                <big className="hidden-xs"><b>{honor.burf[5] !== 0 ? `+${honor.burf[5]}` : null}</b></big>
                <b className="visible-xs">{honor.burf[5] !== 0 ? `+${honor.burf[5]}` : null}</b>
              </div>
            </div>
          </div>
          <div className="check-container" style={{ height: '0px' }}>
            <div className="check" style={{ position: 'relative', display: 'none', cursor: 'pointer' }}>
              <img className="check" src={`${commonImgRoute}/check_trans.png`} width="100%"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HonorSetComponent.propTypes = {
  honor: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  selectable: PropTypes.bool,
};

export default HonorSetComponent;
