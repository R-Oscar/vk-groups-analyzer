import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CustomLink from '../CustomLink';

const SearchSuggestions = ({
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

SearchSuggestions.defaultProps = {
  suggestions: [],
};

SearchSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      // photo: PropTypes.string,
    }),
  ),
  suggestionsVisible: PropTypes.bool.isRequired,
};

export default SearchSuggestions;
