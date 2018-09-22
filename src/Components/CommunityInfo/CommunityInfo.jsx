import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './CommunityInfo.css';

import { v } from '../../config';

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
    const { inited, communityId } = this.props;
    /* eslint-disable */
    inited || VK.init({ apiId: 6673569 });
    VK.Api.call(
      'groups.getById',
      {
        group_id: communityId,
        v,
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
    const { history } = this.props;
    const { community } = this.state;

    return (
      <div>
        {/* {communityId} */}
        <Typography variant="display4" gutterBottom>
          {community.name}
        </Typography>
        <img src={community.photo} alt={community.name} />
        <Button variant="contained" color="primary" onClick={history.goBack} className="back-button">Назад</Button>
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
  inited: PropTypes.bool.isRequired,
};
