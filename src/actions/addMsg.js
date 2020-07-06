import fetch from 'cross-fetch';

const addMsg = (msg) => {
  // return {
  //   type: 'ADD',
  //   newMsg: msg
  // };
  return dispatch => {
    return fetch(`http://localhost:9000/messages`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: msg.msg,
        author: msg.author
      })
    }
    )
      .then(response => {
        let obj = response.json();
        console.log('~~~~~~~~~~~~~~');
        console.log('~~~~~~~~~~~~~~' + obj);
        return obj;
      });
  };
};

const requestMsgs = () => {
  return {
    type: 'REQUEST_MSGS'
  };
};

const receiveMsgs = (json) => {
  return {
    type: 'RECEIVE_MSGS',
    retrievedMsgs: json
  };
};

const fetchMsgs = () => {
  return dispatch => {
    dispatch(requestMsgs());
    return fetch(`http://localhost:9000/messages`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
    )
      .then(response => {
        let obj = response.json();
        console.log('~~~~~~~~~~~~~~');
        console.log('~~~~~~~~~~~~~~' + obj);
        return obj;
      })
      .then(json => dispatch(receiveMsgs(json)));
  };
};

// export default addMsg;
module.exports = {
  addMsg,
  fetchMsgs
};
