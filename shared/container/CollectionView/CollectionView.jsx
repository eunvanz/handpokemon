import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class CollectionView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

CollectionView.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = (store) => ({
  collections: store.collections,
});

CollectionView.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CollectionView);
