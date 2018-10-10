import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import CustomLink from '../CustomLink';

const SearchSuggestions = ({ activeElement, suggestions, visible }) => (
  <Paper>
    {visible && (
      <List>
        {suggestions.map((suggestion, index) => (
          <li key={suggestion.id}>
            <ListItem
              button
              component={CustomLink}
              to={`/c/${suggestion.id}`}
              className={activeElement === index ? 'hover' : ''}
            >
              <ListItemText component="a" primary={suggestion.name} />
            </ListItem>
          </li>
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
