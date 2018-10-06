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
    searchInput: '',
    redirect: false,
    redirectId: -1,
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
      searchInput: e.target.value,
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

  suggestionsClickHandler = (redirectId) => {
    console.log('clicked!!!', redirectId);
    this.setState({
      redirect: true,
      redirectId,
    });
  }

  discardRedirect = () => {
    this.setState({
      redirect: false,
      redirectId: -1,
    });
  }

  render() {
    const {
      results,
      apiInited,
      suggestionsVisible,
      searchInput,
      redirect,
      redirectId,
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
            suggestionsClickHandler={this.suggestionsClickHandler}
            searchInput={searchInput}
            redirect={redirect}
            redirectId={redirectId}
            discardRedirect={this.discardRedirect}
          />
        </>
      </Router>
    );
  }
}

ReactDOM.render(<AppContainer />, document.querySelector('#root'));
