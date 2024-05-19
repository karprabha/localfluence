const User = require('./user');
const Influencer = require('./influencer');
const CampaignManager = require('./campaignManager');

User.hasOne(Influencer);
Influencer.belongsTo(User);

User.hasOne(CampaignManager);
CampaignManager.belongsTo(User);

module.exports = {
  User,
  Influencer,
  CampaignManager,
};
