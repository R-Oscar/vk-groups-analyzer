import React from 'react';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

const CommunitiesSearchSuggestions = ({
  suggestions,
  suggestionsVisible,
  suggestionsClickHandler,
}) => (
  <Paper>
    {suggestionsVisible
    && suggestions.map(suggestion => (
      <MenuItem
        key={suggestion.id}
        onMouseDown={() => suggestionsClickHandler(suggestion.id)}
      >
        {suggestion.name}
      </MenuItem>
    ))}
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
  suggestionsVisible: PropTypes.bool.isRequired,
  suggestionsClickHandler: PropTypes.func.isRequired,
};

export default CommunitiesSearchSuggestions;
