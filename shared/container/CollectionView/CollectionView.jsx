import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class CollectionView extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'CollectionView';
  }
  componentWillMount() {
    this.props.dispatch(Actions.fetchCollectionUser(this.props.params.collectionUserId));
  }
  render() {
    return (
      <div id="collection-view">
        <div className="page-content">
          <div className="page-header">
            <h1>{this.props.collectionUser.nickname}님의 콜렉션</h1>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-3 center">
              <span className="profile-picture">
                <img
                  className="editable img-responsive"
                  src={`/img/user/${this.props.collectionUser.img}`}
                />
              </span>
              <div className="hr hr12 dotted"></div>
              <div className="clearfix">
                <div className="grid2">
                  <span className="bigger-175 blue">{this.props.collectionUser.colRank}</span>
                  위<br/> 콜렉션랭킹
                </div>
                <div className="grid2">
                  <span className="bigger-175 blue">{this.props.collectionUser.battleRank}</span>
                  위<br/> 시합랭킹
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CollectionView.need = [() => { return Actions.fetchCollectionUser(); }];

CollectionView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  collections: store.collections,
  collectionUser: store.collectionUser,
});

CollectionView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  collectionUser: PropTypes.object,
  params: PropTypes.object,
};

export default connect(mapStateToProps)(CollectionView);
