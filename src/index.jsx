import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import debounce from 'lodash.debounce';

import CommunitiesSearchInput from './Components/CommunitiesSearchInput/CommunitiesSearchInput';
import CommunitiesSearchResults from './Components/CommunitiesSearchResults/CommunitiesSearchResults';
import CommunityInfo from './Components/CommunityInfo/CommunityInfo';

import { apiId, v } from './config';

class App extends Component {
  state = {
    results: [],
    inited: false,
  };

  componentDidMount() {
    /* eslint-disable */
    VK.init({
      apiId,
    });
    /* eslint-enable */
    this.setState({
      inited: true,
    });
  }

  inputChange = (e) => {
    // this.setState({
    //   input: e.target.value,
    // });

    if (e.target.value === '') {
      this.setState({
        results: [],
      });
      return;
    }

    /* eslint-disable */
    VK.Api.call(
      'groups.search', 
      {
        q: e.target.value,
        count: 3,
        v,
      },
      ({ response, error }) => {
        if (error) {
          return console.error(error);
        }

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

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  render() {
    const { results, input, inited } = this.state;
    return (
      <Router>
        <div className="wrapper">
          <CssBaseline />
          <CommunitiesSearchInput handler={this.debounceEvent(this.inputChange, 500)} />
          { results.length > 0
            && <Route path="/" exact render={() => input === '' || <CommunitiesSearchResults results={results} />} />
          }
          <Route
            path="/c/:communityId"
            render={props => <CommunityInfo inited={inited} communityId={props.match.params.communityId} {...props} />}
          />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
