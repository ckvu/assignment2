import React from 'react';
import fireworks from '../fireworks-clip-glitter-2-original.png';

class DetailedView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 1
    };
  }

  componentDidMount () {
    this.timerId = setInterval(
      () => this.tick(),
      2500
    );
  }

  tick () {
    this.setState((state) => ({
      counter: state.counter + 1
    }));
  }

  render () {
    let celebrationLeft = null;
    let celebrationRight = null;
    if (this.state.counter % 2 === 0) {
      celebrationLeft = <img id='image-left' alt='left-fireworks' src={fireworks} />;
      celebrationRight = null;
    } else {
      celebrationRight = <img id='image-right' alt='right-fireworks' src={fireworks} />;
      celebrationLeft = null;
    }
    return (<div>
      {celebrationLeft}
      <div className='detailedView'>{this.props.msg}</div>
      {celebrationRight}
    </div>);
  }
}

export default DetailedView;
