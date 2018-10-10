import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import App from './Components/App/App';

import { initiate, fetchCommunities } from './vk-api';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.debouncedFetch = AwesomeDebouncePromise(fetchCommunities, 400);
  }

  state = {
    results: [],
    apiInited: false,
    suggestionsVisible: false,
    suggestionsActiveElement: null,
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
      const results = await this.debouncedFetch(e.target.value, 3);
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

  focusHandler = () => {
    const { searchInputValue } = this.state;
    if (searchInputValue.length > 0) {
      this.setState({
        suggestionsVisible: true,
      });
    }
  }

  tabKeyHandler = (event) => {
    if (event.keyCode === 40) { // 40 = down arrow
      console.log('down key pressed');
    } else if (event.keyCode === 38) { // 38 = up arrow
      console.log('up key pressed');
    }
  }

  render() {
    const {
      results,
      apiInited,
      suggestionsVisible,
      suggestionsActiveElement,
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
            tabKeyHandler={this.tabKeyHandler}
            suggestionsVisible={suggestionsVisible}
            suggestionsActiveElement={suggestionsActiveElement}
            searchInputValue={searchInputValue}
          />
        </>
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'));
