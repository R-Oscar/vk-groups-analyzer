import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { KEY_RETURN, KEY_UP, KEY_DOWN } from 'keycode-js';

import App from './Components/App/App';

import { initiate, fetchCommunities } from './vk-api';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.debouncedFetch = AwesomeDebouncePromise(fetchCommunities, 400);
  }

  state = {
    apiInited: false,
    suggestionsResults: [],
    suggestionsVisible: false,
    suggestionsActiveElement: null,
    searchInputValue: '',
    searchResults: [],
    searchResultsVisible: false
  };

  async componentDidMount() {
    try {
      await initiate();
      this.setState({
        apiInited: true
      });
    } catch (e) {
      console.error(e);
    }
  }

  inputChange = async e => {
    this.setState({
      searchInputValue: e.target.value
    });

    if (e.target.value === '') {
      this.setState({
        suggestionsResults: []
      });
      return;
    }

    try {
      const suggestionsResults = await this.debouncedFetch(e.target.value, 3);
      this.setState({
        suggestionsResults,
        suggestionsVisible: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  blurHandler = () => {
    this.setState({
      suggestionsVisible: false
    });
  };

  focusHandler = () => {
    const { searchInputValue } = this.state;
    if (searchInputValue.length > 0) {
      this.setState({
        suggestionsVisible: true
      });
    }
  };

  keyDownHandler = event => {
    if (event.keyCode === KEY_DOWN) {
      this.setState(state => ({
        suggestionsActiveElement: state.suggestionsActiveElement + 1
      }));
    } else if (event.keyCode === KEY_UP) {
      // TODO
    } else if (event.keyCode === KEY_RETURN) {
      this.setState({
        suggestionsVisible: false
      });

      this.fetchSearchResults();
    }
  };

  fetchSearchResults = async () => {
    const { searchInputValue } = this.state;

    if (searchInputValue === '') return;

    try {
      const searchResults = await this.debouncedFetch(searchInputValue, 10);
      this.setState({
        searchResults,
        searchResultsVisible: true
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      apiInited,
      suggestionsResults,
      suggestionsVisible,
      suggestionsActiveElement,
      searchInputValue,
      searchResults,
      searchResultsVisible
    } = this.state;

    return (
      <Router>
        <>
          <App
            apiInited={apiInited}
            searchHandler={this.inputChange}
            blurHandler={this.blurHandler}
            focusHandler={this.focusHandler}
            keyDownHandler={this.keyDownHandler}
            suggestionsResults={suggestionsResults}
            suggestionsVisible={suggestionsVisible}
            suggestionsActiveElement={suggestionsActiveElement}
            searchInputValue={searchInputValue}
            searchResults={searchResults}
            searchResultsVisible={searchResultsVisible}
          />
        </>
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'));
