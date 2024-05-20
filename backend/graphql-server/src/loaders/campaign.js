const DataLoader = require('dataloader');
const { Campaign, User } = require('../models');

const createCampaignLoader = () => {
  return new DataLoader(async (campaignIds) => {
    const campaigns = await Campaign.findAll({
      where: {
        id: campaignIds,
      },
      include: [{ model: User, as: 'user' }],
    });
    const campaignMap = campaigns.reduce((map, campaign) => {
      map[campaign.id] = campaign;
      return map;
    }, {});
    return campaignIds.map((id) => campaignMap[id] || null);
  });
};

module.exports = createCampaignLoader;
