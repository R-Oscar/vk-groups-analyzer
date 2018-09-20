import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommunitiesSearchInput.css';

export default class CommunitiesSearchInput extends Component {
  render() {
    const { input, handler } = this.props;
    return (
      <fieldset className="search-field">
        <input type="text" className="search-field__input" value={input} onChange={handler} />
        <button type="submit" className="search-field__button">OK</button>
      </fieldset>
    );
  }
}

CommunitiesSearchInput.defaultProps = {
  input: '',
};

CommunitiesSearchInput.propTypes = {
  input: PropTypes.string,
  handler: PropTypes.func.isRequired,
};
