import React from 'react';
import PropTypes from 'prop-types';

const CommunityInfo = ({ match }) => (
  <div>
    {match.params.communityId}
  </div>
);

CommunityInfo.defaultProps = {
  match: {},
};

CommunityInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      communityId: PropTypes.number,
    }),
  }),
};

export default CommunityInfo;
