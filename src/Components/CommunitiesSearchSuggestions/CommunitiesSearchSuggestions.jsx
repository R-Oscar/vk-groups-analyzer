import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const CommunitiesSearchSuggestions = ({ suggestions }) => (
  <Paper>
    {suggestions.map(
      suggestion => (
        <Link key={suggestion.id} to={`/c/${suggestion.id}`}>
          <MenuItem>
            {suggestion.name}
          </MenuItem>
        </Link>
      ),
    )}
  </Paper>
);

CommunitiesSearchSuggestions.defaultProps = {
  suggestions: [],
};

CommunitiesSearchSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      // photo: PropTypes.string,
    }),
  ),
};

export default CommunitiesSearchSuggestions;
