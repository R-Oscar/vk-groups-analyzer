import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CustomLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  handleMouseDown = event => event.preventDefault();

  handleClick = event => this.findAnchorElement(event.target).focus();

  findAnchorElement = element => {
    if (element.nodeName === 'A') return element;
    return this.findAnchorElement(element.parentElement);
  };

  render() {
    const { to, children } = this.props;

    return (
      <Link
        to={to}
        onMouseDownCapture={this.handleMouseDown}
        onClickCapture={this.handleClick}
        {...this.props}
      >
        {children}
      </Link>
    );
  }
}
