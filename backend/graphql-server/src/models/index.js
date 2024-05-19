const User = require('./user');
const Campaign = require('./campaign');
const Influencer = require('./influencer');
const CampaignManager = require('./campaignManager');

User.hasOne(Influencer);
Influencer.belongsTo(User);

User.hasOne(CampaignManager);
CampaignManager.belongsTo(User);

User.hasMany(Campaign);
Campaign.belongsTo(User);

module.exports = {
  User,
  Campaign,
  Influencer,
  CampaignManager,
};
