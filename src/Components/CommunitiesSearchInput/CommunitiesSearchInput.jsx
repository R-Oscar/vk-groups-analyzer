import React, { Component } from 'react';
import './CommunitiesSearchInput.css';

export default class CommunitiesSearchInput extends Component {
  render() {
    return (
      <fieldset className="search-field">
        <input type="text" className="search-field__input" />
        <button type="submit" className="search-field__button">OK</button>
      </fieldset>
    );
  }
}
