import React from 'react';
import PropTypes from 'prop-types';

import CommunityInfo from './CommunityInfo';

import { v } from '../../config';

export default class CommunityInfoContainer extends React.Component {
  state = {
    lastId: -1, // stupid react pattern for getDerivedStateFromProps
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

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    if (state.lastId !== props.communityId) {
      console.log(state.lastId, props.communityId);
      return {
        lastId: props.communityId,
        community: {
          name: '',
          photo: '',
        },
      };
    }

    return null;
  }

  async componentDidMount() {
    /* eslint-disable */
    try {
      const { inited, communityId } = this.props;
      inited || await this.initiate();
      const community = await this.fetchCommunityInfo(communityId);
      this.setState({
        community,
      });
    } catch (e) {
      console.error(e);
    }
    /* eslint-enable */
  }

  componentDidUpdate() {
    const { community } = this.state;
    if (!community.name.length) {
      this.loadCommunitiesAndSetState();
    }
  }

  fetchCommunityInfo = communityId => new Promise((resolve, reject) => {
    /* eslint-disable */
    VK.Api.call(
      'groups.getById',
      {
        group_id: communityId,
        v,
      },
      ({ error, response }) =>
        (error ? reject(error) : resolve({
          name: response[0].name,
          photo: response[0].photo_200,
        }))
    );
    /* eslint-enable */
  });

  initiate = () => new Promise((resolve, reject) => {
    /* eslint-disable */
    window.vkAsyncInit = () => VK.init({ apiId: 6673569 });

    setTimeout(() => {
      const el = document.createElement("script");
      el.src = "https://vk.com/js/api/openapi.js?159";
      el.async = true;
      document.getElementById("vk_api_transport").appendChild(el);
      el.onload = () => resolve();
      el.onerror = () => reject();
    }, 0);
    /* eslint-enable */
  });

  loadCommunitiesAndSetState = async () => {
    const { communityId } = this.props;
    try {
      const community = await this.fetchCommunityInfo(communityId);
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
