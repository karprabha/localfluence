const createCampaignLoader = require('./campaign');
const {
  createUserLoader,
  createInfluencerLoader,
  createCampaignManagerLoader,
} = require('./user');

const createDataLoaders = () => {
  return {
    userLoader: createUserLoader(),
    campaignLoader: createCampaignLoader(),
    influencerLoader: createInfluencerLoader(),
    campaignManagerLoader: createCampaignManagerLoader(),
  };
};

module.exports = createDataLoaders;
