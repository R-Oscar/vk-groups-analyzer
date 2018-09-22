import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import apiId from './config';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';
import CommunityInfo from './Components/CommunityInfo/CommunityInfo';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
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
      ],
      input: '',
    };
  }

  handleInputChange = async (e) => {
    this.setState({
      input: e.target.value,
    });

    /* eslint-disable */
    VK.init({
      apiId,
    });

    VK.Api.call(
      'groups.search', 
      {
        q: e.target.value,
        count: 3,
        offset: 3,
        v: 5.85
      }, 
      r => console.log(r)
    );
    /* eslint-enable */
  };

  render() {
    const { results, input } = this.state;
    return (
      <Router>
        <div className="wrapper">
          <CommunitiesSearchInput input={input} handler={this.handleInputChange} />
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
