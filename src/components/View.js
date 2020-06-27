import React from 'react';
import { connect } from 'react-redux';
import addMsg from '../actions/addMsg';
import turnOnDetail from '../actions/turnOnDetail';
import DetailedView from './DetailedView';

class View extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: '',
      author: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (event) {
    this.setState({
      input: event.target.value
    });
  }

  handleAuthorChange (event) {
    this.setState({
      author: event.target.value
    });
  }

  handleSubmit () {
    let newMsg = {
      msg: this.state.input,
      author: this.state.author
    };
    this.props.submitNewMsg(newMsg);
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
        <input type='text' placeholder='Type your username...' onChange={this.handleAuthorChange} value={this.state.author} />
        <br />
        <input type='text' placeholder='Type your message...' onChange={this.handleInputChange} value={this.state.input} />
        <br />
        <button className='button' onClick={this.handleSubmit}>Add Message</button>
        <ul>
          {this.props.messages.map((msgObject, id) => {
            return (<div key={id}>
              <li className='msgItem' key={id} onClick={() => this.props.displayDetail(msgObject.msg)}>"{msgObject.msg}"
                <div className='authorItem'>Posted by: {msgObject.author}</div>
              </li>
              <br />
            </div>);
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
