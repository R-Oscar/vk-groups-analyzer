import React from 'react';
import PropTypes from 'prop-types';
// import { BrowserRouter as Router } from 'react-router-dom';

const data = {
  name: 'MDK',
  photo: 'https://pp.vk.me/c624722/v624722728/48e8f/g2Z9jU6qXVk.jpg',
};

export default class CommunityInfo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    /* eslint-disable */
    VK.Api.call(
      'groups.getById',
      {
        groupId: 64977560,
        v: 5.85,
      },
      ({ response }) => console.log(response)
    );
    /* eslint-enable */
  }

  render() {
    const { communityId, history } = this.props;
    return (
      <div>
        {communityId}
        <h1>{data.name}</h1>
        <img src={data.photo} alt={data.name} />
        <button type="button" onClick={history.goBack}>Назад</button>
      </div>
    );
  }
}

// CommunityInfo.defaultProps = {
//   match: {},
// };

CommunityInfo.propTypes = {
  communityId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
