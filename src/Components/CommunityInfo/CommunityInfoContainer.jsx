import React from 'react';
import PropTypes from 'prop-types';

import CommunityInfo from './CommunityInfo';

import { fetchCommunityInfo } from '../../vk-api';

export default class CommunityInfoContainer extends React.Component {
  state = {
    lastCommunityId: -1,
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
    apiInited: PropTypes.bool.isRequired,
    discardRedirect: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.lastCommunityId !== nextProps.communityId) {
      return {
        lastCommunityId: nextProps.communityId,
        community: {
          name: '',
          photo: '',
        },
      };
    }

    return null;
  }

  componentDidMount() {
    const { apiInited } = this.props;
    if (apiInited) {
      this.loadCommunityAndSetState();
    }
  }

  componentDidUpdate() {
    const { community } = this.state;
    if (!community.name.length) {
      this.loadCommunityAndSetState();
    }
  }

  loadCommunityAndSetState = async () => {
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
    const { history, discardRedirect } = this.props;
    const { community } = this.state;

    return <CommunityInfo history={history} community={community} discardRedirect={discardRedirect} />;
  }
}
