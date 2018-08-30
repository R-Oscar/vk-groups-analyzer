import React from 'react';
import PropTypes from 'prop-types';

// export default class CommunitiesSearchResults extends Component {
//   render() {
//     return (
//       <p>Results here</p>
//     );
//   }
// }

const CommunitiesSearchResults = ({ results }) => <div>{results}</div>;

CommunitiesSearchResults.defaultProps = {
  results: {},
};

CommunitiesSearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string,
    }),
  ),
};

export default CommunitiesSearchResults;
