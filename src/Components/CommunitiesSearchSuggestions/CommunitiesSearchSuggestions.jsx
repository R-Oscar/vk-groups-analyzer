import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CustomLink from '../CustomLink/CustomLink';

const CommunitiesSearchSuggestions = ({
  suggestions,
  suggestionsVisible,
}) => (
  <Paper>
    {suggestionsVisible
    && suggestions.map(suggestion => (
      <CustomLink key={suggestion.id} to={`/c/${suggestion.id}`}>
        <MenuItem>
          {suggestion.name}
        </MenuItem>
      </CustomLink>
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
};

export default CommunitiesSearchSuggestions;
