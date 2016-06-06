import React from 'react';

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'PageHeader';
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>{this.props.title}</h1>
        </div>
      </div>
      );
  }
}

export default PageHeader;
