import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

import SearchInput from '../SearchInput';
import SearchResults from '../SearchResults';
import CommunityInfoContainer from '../CommunityInfo';
import SearchSuggestions from '../SearchSuggestions';

const App = ({
  apiInited,
  searchHandler,
  blurHandler,
  focusHandler,
  keyDownHandler,
  suggestionsActiveElement,
  suggestionsResults,
  suggestionsVisible,
  searchInputValue,
  searchResults,
  searchResultsVisible
}) => (
  <div className="wrapper">
    <CssBaseline />
    <SearchInput
      handler={searchHandler}
      blurHandler={blurHandler}
      focusHandler={focusHandler}
      keyDownHandler={keyDownHandler}
      value={searchInputValue}
    />
    <SearchSuggestions
      suggestions={suggestionsResults}
      activeElement={suggestionsActiveElement}
      visible={suggestionsVisible}
    />

    <Route
      path="/"
      exact
      render={() => <SearchResults results={searchResults} visible={searchResultsVisible} />}
    />

    <Route
      path="/c/:communityId"
      render={props => (
        <CommunityInfoContainer
          apiInited={apiInited}
          communityId={props.match.params.communityId}
          {...props}
        />
      )}
    />
  </div>
);

App.defaultProps = {
  apiInited: false,
  searchInputValue: '',
  searchResults: [],
  suggestionsResults: [],
  suggestionsActiveElement: null
};

App.propTypes = {
  apiInited: PropTypes.bool,
  searchHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  keyDownHandler: PropTypes.func.isRequired,
  suggestionsResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  ),
  suggestionsActiveElement: PropTypes.number,
  suggestionsVisible: PropTypes.bool.isRequired,
  searchInputValue: PropTypes.string,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  ),
  searchResultsVisible: PropTypes.bool.isRequired
};

export default App;
