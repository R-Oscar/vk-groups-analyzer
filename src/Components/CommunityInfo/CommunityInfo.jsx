import React from 'react';
import PropTypes from 'prop-types';

export default class CommunityInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      community: {
        name: '',
        photo: '',
      },
    };
  }

  componentDidMount() {
    /* eslint-disable */
    this.props.inited || VK.init({ apiId: 6673569 });
    VK.Api.call(
      'groups.getById',
      {
        group_id: 64977560,
        v: 5.85,
      },
      ({ response }) => this.setState({
        community: {
          name: response[0].name,
          photo: response[0].photo_200,
        },
      })
    );
    /* eslint-enable */
  }

  render() {
    const { communityId, history } = this.props;
    const { community } = this.state;

    return (
      <div>
        {communityId}
        <h1>{community.name}</h1>
        <img src={community.photo} alt={community.name} />
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
