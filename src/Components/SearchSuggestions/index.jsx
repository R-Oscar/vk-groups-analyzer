import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CustomLink from '../CustomLink';

const SearchSuggestions = ({ activeElement, suggestions, visible }) => (
  <Paper>
    {visible
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
  activeElement: null,
  suggestions: [],
};

SearchSuggestions.propTypes = {
  activeElement: PropTypes.number,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      // photo: PropTypes.string,
    }),
  ),
  visible: PropTypes.bool.isRequired,
};

export default SearchSuggestions;
