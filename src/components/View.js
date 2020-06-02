import React from 'react';
import { connect } from 'react-redux';
import addMsg from '../actions/addMsg';
import turnOnDetail from '../actions/turnOnDetail';
import DetailedView from './DetailedView';

class View extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit () {
    console.log('IM HERE');
    this.props.submitNewMsg(this.state.input);
    this.setState({
      input: ''
    });
  }

  render () {
    let detail = null;
    if (this.props.isDetailDisplayed) {
      detail = (
        <DetailedView msg={this.props.detailToDisplay} />
      );
    }
    return (
      <div className='input'>
        <input type='text' onChange={this.handleChange} value={this.state.input} />
        <button className='button' onClick={this.handleSubmit}>Add Message</button>
        <ul>
          {this.props.messages.map((msg, id) => {
            return (<div key={id}><li className='msgItem' key={id} onClick={() => this.props.displayDetail(msg)}>{msg}</li><br /></div>);
          })
          }
        </ul>
        {detail}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageView.messages,
    isDetailDisplayed: state.detailedView.isDetailDisplayed,
    detailToDisplay: state.detailedView.detail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMsg: (newMsg) => {
      dispatch(addMsg(newMsg));
    },
    displayDetail: (selectedMsg) => {
      dispatch(turnOnDetail(selectedMsg));
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
