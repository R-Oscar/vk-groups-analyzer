/* eslint-disable */
export const initiate = () => new Promise((resolve, reject) => {
  window.vkAsyncInit = () => {
    VK.init({ apiId: process.env.API_ID });
    resolve();
  }

  setTimeout(() => {
    if (document.querySelector('script#vk')) {
      return reject();
    }

    const el = document.createElement("script");
    el.id = "vk";
    el.src = "https://vk.com/js/api/openapi.js?159";
    el.async = true;
    document.getElementById("vk_api_transport").appendChild(el);
    el.onerror = () => reject();
  }, 0);
});

export const fetchCommunityInfo = communityId => new Promise((resolve, reject) => {
  VK.Api.call(
    'groups.getById',
    {
      group_id: communityId,
      v: process.env.API_VERSION,
    },
    ({ error, response }) => (error ? reject(error) : resolve({
        name: response[0].name,
        photo: response[0].photo_200,
      })
    )
  );
});

export const fetchCommunities = (q, count) => new Promise((resolve, reject) => {
  VK.Api.call(
    'groups.search', 
    {
      q,
      count,
      v: process.env.API_VERSION,
    },
    ({ error, response }) => 
      (error ? reject(error) : resolve(response.items.map(community => (
        {
          id: community.id,
          name: community.name,
          photo: community.photo_50,
        }
      ))))
  );
});
/* eslint-enable */
