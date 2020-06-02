import React from 'react';
import Container from './View';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers';

class Home extends React.Component {
  render () {
    return (
      <div className='page home'>
        <Provider store={createStore(rootReducer)}>
          <Container />
        </Provider>
      </div>
    );
  }
}

export default Home;
