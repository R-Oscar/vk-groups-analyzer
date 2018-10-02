import React from 'react';
import PropTypes from 'prop-types';
// import { DebounceInput } from 'react-debounce-input';
import './CommunitiesSearchInput.css';
import TextField from '@material-ui/core/TextField';

const CommunitiesSearchInput = ({
  handler,
  blurHandler,
  focusHandler,
  value,
}) => (
  <fieldset className="search-field">
    <TextField
      label="Поиск сообществ"
      type="search"
      margin="normal"
      onChange={handler}
      onBlur={blurHandler}
      onFocus={focusHandler}
      value={value}
      className="search-field__input"
    />
  </fieldset>
);

CommunitiesSearchInput.defaultProps = {
  value: '',
};

CommunitiesSearchInput.propTypes = {
  // input: PropTypes.string,
  handler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default CommunitiesSearchInput;
