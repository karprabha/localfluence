const {
  createUserLoader,
  createInfluencerLoader,
  createCampaignManagerLoader,
} = require('./user');

const createDataLoaders = () => {
  return {
    userLoader: createUserLoader(),
    influencerLoader: createInfluencerLoader(),
    campaignManagerLoader: createCampaignManagerLoader(),
  };
};

module.exports = createDataLoaders;
