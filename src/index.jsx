import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import debounce from 'lodash.debounce';

import App from './Components/App/App';

import { initiate, fetchCommunities } from './vk-api';

class AppContainer extends Component {
  state = {
    results: [],
    inited: false,
  };

  async componentDidMount() {
    try {
      await initiate();
      this.setState({
        inited: true,
      });
    } catch (e) {
      if (e === 100) {
        this.setState({
          inited: true,
        });
      }
      console.error(e);
    }
  }

  inputChange = async (e) => {
    if (e.target.value === '') {
      this.setState({
        results: [],
      });
      return;
    }

    try {
      const results = await fetchCommunities(e.target.value, 3);
      this.setState({
        results,
      });
    } catch (error) {
      console.error(error);
    }
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
