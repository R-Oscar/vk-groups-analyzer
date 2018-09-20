import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// export default class CommunitiesSearchResults extends Component {
//   render() {
//     return (
//       <p>Results here</p>
//     );
//   }
// }

const CommunitiesSearchResults = ({ results }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Avatar</th>
      </tr>
    </thead>
    <tbody>
      {results.map(
        result => (
          <tr key={result.id}>
            <td>
              <Link to={`/c/${result.id}`}>{result.name}</Link>
            </td>
            <td>
              <img src={result.photo} alt={result.name} />
            </td>
          </tr>
        ),
      )}
    </tbody>
  </table>
);

CommunitiesSearchResults.defaultProps = {
  results: [],
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
