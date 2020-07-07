import React from 'react';
import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { addMsg, fetchMsgs, deleteMsg } from '../actions/addMsg';
import turnOnDetail from '../actions/turnOnDetail';
import DetailedView from './DetailedView';

class View extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      input: '',
      author: ''
    };
    this.props.fetchInitialMsgs();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
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

  handleClear () {
    this.props.messages.forEach(msgObj => {
      this.props.deleteEachMsg(msgObj);
    });
    this.props.fetchInitialMsgs();
  }

  load () {
    this.props.startLoading();
  }

  unload () {
    this.props.stopLoading();
  }

  display (msgObject) {
    this.props.displayDetail(msgObject.message);
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
          <button className='button' onClick={this.handleClear}>Clear All Messages</button>
          <ul>
            {this.props.messages.map((msgObject, id) => {
              return (<div key={id}>
                <li className='msgItem' key={id} onClick={() => {
                  this.load();
                  setTimeout(() => {
                    this.display(msgObject);
                    this.unload();
                  }, 5000);
                }}>"{msgObject.message}"
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
          <button className='button' onClick={this.handleClear}>Clear All Messages</button>
          {/* <ul>
            {this.props.messages.map((msgObject, id) => {
              return (<div key={id}>
                <li className='msgItem' key={id} onClick={() => this.props.displayDetail(msgObject.message)}>"{msgObject.message}"
                  <div className='authorItem'>Posted by: {msgObject.author}</div>
                </li>
                <br />
              </div>);
            })
            }
          </ul> */}
          {detail}
        </div>
      );
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
    deleteEachMsg: (msg) => {
      dispatch(deleteMsg(msg));
    },
    displayDetail: (selectedMsg) => {
      dispatch(turnOnDetail(selectedMsg));
    },
    startLoading: () => {
      dispatch(showLoading());
    },
    stopLoading: () => {
      dispatch(hideLoading());
    }
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
