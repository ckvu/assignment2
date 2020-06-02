import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import About from './components/About';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isHomeShown: true,
      isAboutShown: false
    };
    this.showHome = this.showHome.bind(this);
    this.showAbout = this.showAbout.bind(this);
  }

  showHome () {
    this.setState({
      isHomeShown: true,
      isAboutShown: false
    });
  }

  showAbout () {
    this.setState({
      isHomeShown: false,
      isAboutShown: true
    });
  }

  render () {
    let home = null;
    let about = null;
    if (this.state.isHomeShown) {
      home = <Home />;
    }
    if (this.state.isAboutShown) {
      about = <About />;
    }
    return (
      <div>
        <div className='header'>
          <h1>Assignment 2: Messaging Board</h1>
          <h2>CPSC 436I 2020</h2>
        </div>

        <div className='navBar'>
          <ol>
            <li><a className='nav' onClick={this.showHome}>Home</a></li>
            <li><a className='nav' onClick={this.showAbout}>About</a></li>
          </ol>
        </div>
        <br />
        <br />
        {home}
        {about}
      </div>);
  }
}

export default App;
