import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const SearchResults = ({ results, visible }) => (
  <>
    {visible && (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Avatar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell>
                  <Link to={`/c/${result.id}`}>{result.name}</Link>
                </TableCell>
                <TableCell>
                  <img src={result.photo} alt={result.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )}
  </>
);

SearchResults.defaultProps = {
  results: []
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      photo: PropTypes.string
    })
  ),
  visible: PropTypes.bool.isRequired
};

export default SearchResults;
