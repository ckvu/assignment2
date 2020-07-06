import React from 'react';
import { connect } from 'react-redux';
import { addMsg, fetchMsgs } from '../actions/addMsg';
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
      input: '',
      author: ''
    });
    this.props.fetchInitialMsgs();
  }

  render () {
    if (!this.props.isFetching && this.props.messages.length > 0) {
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
                <li className='msgItem' key={id} onClick={() => this.props.displayDetail(msgObject.message)}>"{msgObject.message}"
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
    } else {
      this.props.fetchInitialMsgs();
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messageView.messages,
    isFetching: state.messageView.isFetching,
    isDetailDisplayed: state.detailedView.isDetailDisplayed,
    detailToDisplay: state.detailedView.detail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMsg: (newMsg) => {
      dispatch(addMsg(newMsg));
    },
    fetchInitialMsgs: () => {
      dispatch(fetchMsgs());
    },
    displayDetail: (selectedMsg) => {
      dispatch(turnOnDetail(selectedMsg));
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
