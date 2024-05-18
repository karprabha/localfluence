const DataLoader = require('dataloader');
const { User } = require('../models');

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

module.exports = createUserLoader;
