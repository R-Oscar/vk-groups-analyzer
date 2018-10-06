import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

import CommunitiesSearchInput from '../CommunitiesSearchInput/CommunitiesSearchInput';
// import CommunitiesSearchResults from '../CommunitiesSearchResults/CommunitiesSearchResults';
import CommunityInfoContainer from '../CommunityInfo/CommunityInfoContainer';
import CommunitiesSearchSuggestions from '../CommunitiesSearchSuggestions/CommunitiesSearchSuggestions';

const App = ({
  results,
  apiInited,
  searchHandler,
  blurHandler,
  suggestionsVisible,
  suggestionsClickHandler,
  searchInput,
  redirect,
  redirectId,
  discardRedirect,
}) => (
  <div className="wrapper">
    <CssBaseline />
    <CommunitiesSearchInput
      handler={searchHandler}
      blurHandler={blurHandler}
      value={searchInput}
    />
    <CommunitiesSearchSuggestions
      suggestions={results}
      suggestionsVisible={suggestionsVisible}
      suggestionsClickHandler={suggestionsClickHandler}
    />
    {/* { results.length > 0 */}
    {/*   && <Route path="/" exact render={() => <CommunitiesSearchResults results={results} />} /> */}
    {/* } */}

    {redirect ? (
      <Redirect push to={{ pathname: `/c/${redirectId}` }} />
    ) : (
      <Route
        path="/c/:communityId"
        render={props => (
          <CommunityInfoContainer
            apiInited={apiInited}
            communityId={props.match.params.communityId}
            discardRedirect={discardRedirect}
            {...props}
          />
        )}
      />
    )}
    {/* <Switch>
      <Route
        path="/c/:communityId"
        render={props => (
          <CommunityInfoContainer
            apiInited={apiInited}
            communityId={props.match.params.communityId}
            discardRedirect={discardRedirect}
            {...props}
          />
        )}
      />
      {console.log(redirect)}
      {redirect && <Redirect push to={{ pathname: `/c/${redirectId}` }} />}
    </Switch> */}
  </div>
);

App.defaultProps = {
  results: [],
  apiInited: false,
  searchInput: '',
  redirect: false,
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
  suggestionsClickHandler: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
  redirect: PropTypes.bool,
  redirectId: PropTypes.number.isRequired,
  discardRedirect: PropTypes.func.isRequired,
};

export default App;
