import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';

const results = [
  {
    id: 23148107,
    name: 'MDK',
    photo: 'https://pp.vk.me/c624722/v624722728/48e8f/g2Z9jU6qXVk.jpg',
  },
  {
    id: 23148108,
    name: 'MDK',
    photo: 'https://pp.userapi.com/c845520/v845520552/e5fb8/HR5Yhglt9TQ.jpg?ava=1',
  },
];

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
