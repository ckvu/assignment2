import React from 'react';
import Container from './View';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import LoadingBar from 'react-redux-loading-bar';
import rootReducer from '../reducers';
const loggerMiddleware = createLogger();

class Home extends React.Component {
  render () {
    return (
      <div className='page home'>
        <Provider store={createStore(rootReducer, {}, applyMiddleware(thunkMiddleware, loggerMiddleware))}>
          <LoadingBar style={{ backgroundColor: 'blueviolet', height: '5px' }} />
          <Container />
        </Provider>
      </div>
    );
  }
}

export default Home;
