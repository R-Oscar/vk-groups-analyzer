import React from 'react';
import PropTypes from 'prop-types';

import CommunityInfo from './CommunityInfo';

import { fetchCommunityInfo } from '../../vk-api';

export default class CommunityInfoContainer extends React.Component {
  state = {
    lastId: -1,
    community: {
      name: '',
      photo: '',
    },
  }

  static propTypes = {
    communityId: PropTypes.string.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    inited: PropTypes.bool.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastId !== nextProps.communityId) {
      return {
        lastId: nextProps.communityId,
        community: {
          name: '',
          photo: '',
        },
      };
    }

    return null;
  }

  componentDidMount() {
    const { inited } = this.props;
    if (inited) {
      this.loadCommunitiesAndSetState();
    }
  }

  componentDidUpdate() {
    const { community } = this.state;
    if (!community.name.length) {
      this.loadCommunitiesAndSetState();
    }
  }

  loadCommunitiesAndSetState = async () => {
    try {
      const { communityId } = this.props;
      const community = await fetchCommunityInfo(communityId);
      this.setState({
        community,
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { history } = this.props;
    const { community } = this.state;

    return <CommunityInfo history={history} community={community} />;
  }
}
