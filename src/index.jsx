import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import App from './Components/App/App';

import { initiate, fetchCommunities } from './vk-api';

class AppContainer extends Component {
  state = {
    results: [],
    apiInited: false,
    suggestionsVisible: false,
    searchInputValue: '',
  };

  async componentDidMount() {
    try {
      await initiate();
      this.setState({
        apiInited: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  inputChange = async (e) => {
    this.setState({
      searchInputValue: e.target.value,
    });

    if (e.target.value === '') {
      this.setState({
        results: [],
      });
      return;
    }

    try {
      const debouncedFetch = AwesomeDebouncePromise(fetchCommunities, 500);
      const results = await debouncedFetch(e.target.value, 3);
      this.setState({
        results,
        suggestionsVisible: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  blurHandler = () => {
    this.setState({
      suggestionsVisible: false,
    });
  };

  render() {
    const {
      results,
      apiInited,
      suggestionsVisible,
      searchInputValue,
    } = this.state;

    return (
      <Router>
        <>
          <App
            results={results}
            apiInited={apiInited}
            searchHandler={this.inputChange}
            blurHandler={this.blurHandler}
            focusHandler={this.focusHandler}
            suggestionsVisible={suggestionsVisible}
            searchInputValue={searchInputValue}
          />
        </>
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'));
