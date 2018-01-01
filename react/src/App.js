import React, { Component } from 'react';

import Test01 from './components/Test01';
import Test02 from './components/Test02';
class App extends Component {
  render() {
    console.log('app=>', this.props.client);
    return (
      <div className="App">
        <Test01/>
        <Test02 client={this.props}/>
      </div>
    );
  }
}

export default App;
