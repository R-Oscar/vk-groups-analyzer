import React from 'react';
import PropTypes from 'prop-types';
// import { BrowserRouter as Router } from 'react-router-dom';

const data = {
  name: 'MDK',
  photo: 'https://pp.vk.me/c624722/v624722728/48e8f/g2Z9jU6qXVk.jpg',
  males: 50,
  females: 50,
};

const CommunityInfo = ({ communityId, history }) => (
  <div>
    {communityId}
    <h1>{data.name}</h1>
    <img src={data.photo} alt={data.name} />
    <button type="button" onClick={history.goBack}>Назад</button>
  </div>
);

// CommunityInfo.defaultProps = {
//   match: {},
// };

CommunityInfo.propTypes = {
  communityId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CommunityInfo;
