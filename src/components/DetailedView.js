import React from 'react';

class DetailedView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (<div className='detailedView'>{this.props.msg}</div>);
  }
}

export default DetailedView;
