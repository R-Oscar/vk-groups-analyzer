import React from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import './CommunitiesSearchInput.css';

const CommunitiesSearchInput = ({ input, handler }) => (
  <fieldset className="search-field">
    <DebounceInput className="search-field__input" value={input} onChange={handler} debounceTimeout={300} />
    <button type="submit" className="search-field__button">OK</button>
  </fieldset>
);

CommunitiesSearchInput.defaultProps = {
  input: '',
};

CommunitiesSearchInput.propTypes = {
  input: PropTypes.string,
  handler: PropTypes.func.isRequired,
};

export default CommunitiesSearchInput;
