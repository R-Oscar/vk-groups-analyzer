import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';

const results = [{
  id: 23148107,
  name: 'MDK',
  photo: 'https://pp.userap...7qOUt_nPY.jpg?ava=1',
}];

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <CommunitiesSearchInput />
        <CommunitiesSearchResults results={results} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
