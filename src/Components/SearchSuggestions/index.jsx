import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import CustomLink from '../CustomLink';

const SearchSuggestions = ({ activeElement, suggestions, visible }) => (
  <Paper>
    {visible && (
      <List>
        {suggestions.map((suggestion, index) => (
          <MenuItem
            key={suggestion.id}
            to={`/c/${suggestion.id}`}
            className={activeElement === index ? 'hover' : ''}
            component={CustomLink}
          >
            {suggestion.name}
          </MenuItem>
          // <CustomLink
          //   key={suggestion.id}
          //   to={`/c/${suggestion.id}`}
          //   className={activeElement === index ? 'hover' : ''}
          // >
          //   <MenuItem>{suggestion.name}</MenuItem>
          // </CustomLink>
        ))}
      </List>
    )}
  </Paper>
);

SearchSuggestions.defaultProps = {
  activeElement: null,
  suggestions: []
};

SearchSuggestions.propTypes = {
  activeElement: PropTypes.number,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
      // photo: PropTypes.string,
    })
  ),
  visible: PropTypes.bool.isRequired
};

export default SearchSuggestions;
