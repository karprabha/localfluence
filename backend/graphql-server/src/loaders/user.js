const DataLoader = require('dataloader');
const { User, Influencer, CampaignManager } = require('../models');

const createUserLoader = () => {
  return new DataLoader(async (userIds) => {
    const users = await User.findAll({
      where: {
        id: userIds,
      },
    });
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});
    return userIds.map((id) => userMap[id] || null);
  });
};

const createInfluencerLoader = () => {
  return new DataLoader(async (userIds) => {
    const influencers = await Influencer.findAll({
      where: {
        userId: userIds,
      },
    });
    const influencerMap = influencers.reduce((map, influencer) => {
      map[influencer.userId] = influencer;
      return map;
    }, {});
    return userIds.map((id) => influencerMap[id] || null);
  });
};

const createCampaignManagerLoader = () => {
  return new DataLoader(async (userIds) => {
    const campaignManagers = await CampaignManager.findAll({
      where: {
        userId: userIds,
      },
    });
    const campaignManagerMap = campaignManagers.reduce(
      (map, campaignManager) => {
        map[campaignManager.userId] = campaignManager;
        return map;
      },
      {},
    );
    return userIds.map((id) => campaignManagerMap[id] || null);
  });
};

module.exports = {
  createUserLoader,
  createInfluencerLoader,
  createCampaignManagerLoader,
};
