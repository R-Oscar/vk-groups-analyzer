import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CustomLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  handleMouseDown = event => event.preventDefault();

  handleClick = event => event.target.focus();

  render() {
    const { to, children } = this.props;

    return (
      <Link to={to} onMouseDown={this.handleMouseDown} onClick={this.handleClick} {...this.props}>
        {children}
      </Link>
    );
  }
}
