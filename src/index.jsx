import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommunitiesSearchInput />
        <CommunitiesSearchResults />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
