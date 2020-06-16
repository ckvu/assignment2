import { combineReducers } from 'redux';

// const initialMsgs = ['Statement 1', 'Statement 2', 'Statement 3', 'Statement 4'];
const initialMsgsWithAuthor = [
  {
    msg: 'Statement 1',
    author: 'User A'
  },
  {
    msg: 'Statement 2',
    author: 'User B'
  },
  {
    msg: 'Statement 3',
    author: 'User C'
  },
  {
    msg: 'Statement 4',
    author: 'User D'
  }
];

const defaultMessageState = {
  // NEEDS TO CHANGE: initialMsgs to initialMsgsWithAuthor
  messages: initialMsgsWithAuthor
};
const defaultDetailState = {
  isDetailDisplayed: false,
  detail: ''
};

const messageReducer = (state = defaultMessageState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        messages: [...state.messages, action.newMsg]
      };
    default:
      return state;
  }
};

const detailedViewReducer = (state = defaultDetailState, action) => {
  // let newState = Object.assign({}, state, {
  //   isDetailDisplayed: true,
  //   detail: action.msg
  // });
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
  detailedView: detailedViewReducer
});

export default rootReducer;
