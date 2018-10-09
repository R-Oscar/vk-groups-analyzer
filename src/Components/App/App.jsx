import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

import SearchInput from '../SearchInput';
// import SearchResults from '../SearchResults';
import CommunityInfoContainer from '../CommunityInfo';
import SearchSuggestions from '../SearchSuggestions';

const App = ({
  results,
  apiInited,
  searchHandler,
  blurHandler,
  suggestionsVisible,
  searchInputValue,
}) => (
  <div className="wrapper">
    <CssBaseline />
    <SearchInput
      handler={searchHandler}
      blurHandler={blurHandler}
      value={searchInputValue}
    />
    <SearchSuggestions
      suggestions={results}
      suggestionsVisible={suggestionsVisible}
    />
    {/* { results.length > 0 */}
    {/*   && <Route path="/" exact render={() => <SearchResults results={results} />} /> */}
    {/* } */}

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
  results: [],
  apiInited: false,
  searchInputValue: '',
};

App.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string,
    }),
  ),
  apiInited: PropTypes.bool,
  searchHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  suggestionsVisible: PropTypes.bool.isRequired,
  searchInputValue: PropTypes.string,
};

export default App;
