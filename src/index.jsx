import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import debounce from 'lodash.debounce';

import App from './Components/App/App';

import { apiId, v } from './config';

class AppContainer extends Component {
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
    const { results, inited } = this.state;
    return (
      <Router>
        <App
          results={results}
          inited={inited}
          searchHandler={this.debounceEvent(this.inputChange, 500)}
        />
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'));
