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
  focusHandler,
  tabKeyHandler,
  suggestionsActiveElement,
  suggestionsVisible,
  searchInputValue,
}) => (
  <div className="wrapper">
    <CssBaseline />
    <SearchInput
      handler={searchHandler}
      blurHandler={blurHandler}
      focusHandler={focusHandler}
      tabKeyHandler={tabKeyHandler}
      value={searchInputValue}
    />
    <SearchSuggestions
      suggestions={results}
      activeElement={suggestionsActiveElement}
      visible={suggestionsVisible}
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
  suggestionsActiveElement: null,
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
  focusHandler: PropTypes.func.isRequired,
  tabKeyHandler: PropTypes.func.isRequired,
  suggestionsActiveElement: PropTypes.number,
  suggestionsVisible: PropTypes.bool.isRequired,
  searchInputValue: PropTypes.string,
};

export default App;
