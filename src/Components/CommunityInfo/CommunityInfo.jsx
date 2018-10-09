import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CommunityInfo.css';

const CommunityInfo = ({ history, community }) => (
  <div>
    <Typography variant="display4" gutterBottom>
      {community.name}
    </Typography>
    <img src={community.photo} alt={community.name} />
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        history.goBack();
      }}
      className="back-button"
    >
      <div>Back</div>
    </Button>
  </div>
);

CommunityInfo.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommunityInfo;
