import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';

const defaultMessageState = {
  messages: [],
  isFetching: false
};
const defaultDetailState = {
  isDetailDisplayed: false,
  detail: ''
};

const messageReducer = (state = defaultMessageState, action) => {
  switch (action.type) {
    case 'REQUEST_MSGS':
      return {
        isFetching: true
      };
    case 'RECEIVE_MSGS':
      if (action.retrievedMsgs.messages) {
        return {
          isFetching: false,
          messages: [...action.retrievedMsgs.messages]
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const detailedViewReducer = (state = defaultDetailState, action) => {
  switch (action.type) {
    case 'ON':
      return Object.assign({}, {
        isDetailDisplayed: true,
        detail: action.msg
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messageView: messageReducer,
  detailedView: detailedViewReducer,
  loadingBar: loadingBarReducer
});

export default rootReducer;
