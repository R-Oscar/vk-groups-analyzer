import React from 'react';
import PropTypes from 'prop-types';
// import { DebounceInput } from 'react-debounce-input';
import './CommunitiesSearchInput.css';
import TextField from '@material-ui/core/TextField';

const CommunitiesSearchInput = ({ handler }) => (
  <fieldset className="search-field">
    <TextField
      label="Поиск сообществ"
      type="search"
      margin="normal"
      onChange={handler}
      // value=input
      className="search-field__input"
    />
  </fieldset>
);

// CommunitiesSearchInput.defaultProps = {
//   input: '',
// };

CommunitiesSearchInput.propTypes = {
  // input: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

export default CommunitiesSearchInput;
