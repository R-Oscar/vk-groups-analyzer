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
      results: [],
      input: '',
    };
  }

  componentDidMount() {
    /* eslint-disable */
    VK.init({
      apiId,
    });
    /* eslint-enable */
  }

  handleInputChange = async (e) => {
    this.setState({
      input: e.target.value,
    });

    /* eslint-disable */
    VK.Api.call(
      'groups.search', 
      {
        q: e.target.value,
        count: 3,
        offset: 3,
        v: 5.85,
      }, 
      ({ response }) => {
        const { count, items } = response;

        this.setState({
          results: items.map(item => (
            {
              id: item.id,
              name: item.name,
              photo: item.photo_50,
            }
          )),
        });
      }
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
