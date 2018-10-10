import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css';
import TextField from '@material-ui/core/TextField';

const SearchInput = ({ handler, blurHandler, focusHandler, tabKeyHandler, value }) => (
  <fieldset className="search-field">
    <TextField
      label="Поиск сообществ"
      type="search"
      margin="normal"
      onChange={handler}
      onBlur={blurHandler}
      onFocus={focusHandler}
      onKeyDown={tabKeyHandler}
      value={value}
      className="search-field__input"
    />
  </fieldset>
);

SearchInput.defaultProps = {
  value: ''
};

SearchInput.propTypes = {
  handler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  tabKeyHandler: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default SearchInput;
