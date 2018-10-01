import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

import CommunitiesSearchInput from '../CommunitiesSearchInput/CommunitiesSearchInput';
// import CommunitiesSearchResults from '../CommunitiesSearchResults/CommunitiesSearchResults';
import CommunityInfoContainer from '../CommunityInfo/CommunityInfoContainer';
import CommunitiesSearchSuggestions from '../CommunitiesSearchSuggestions/CommunitiesSearchSuggestions';

const App = ({
  results,
  inited,
  searchHandler,
}) => (
  <div className="wrapper">
    <CssBaseline />
    <CommunitiesSearchInput handler={searchHandler} />
    <CommunitiesSearchSuggestions suggestions={results} />
    {/* { results.length > 0 */}
    {/*   && <Route path="/" exact render={() => <CommunitiesSearchResults results={results} />} /> */}
    {/* } */}
    <Route
      path="/c/:communityId"
      render={props => (
        <CommunityInfoContainer
          inited={inited}
          communityId={props.match.params.communityId}
          {...props}
        />
      )}
    />
  </div>
);

App.defaultProps = {
  results: [],
  inited: false,
};

App.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string,
    }),
  ),
  inited: PropTypes.bool,
  searchHandler: PropTypes.func.isRequired,
};

export default App;
