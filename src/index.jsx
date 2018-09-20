import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';
import CommunityInfo from './Components/CommunityInfo/CommunityInfo';

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
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      input: '',
    };
  }

  componentDidMount() {
    // console.log(fetch);
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <CommunitiesSearchInput />
          <Route path="/" exact render={() => <CommunitiesSearchResults results={results} />} />
          <Route
            path="/c/:communityId"
            render={props => <CommunityInfo communityId={props.match.params.communityId} {...props} />}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
