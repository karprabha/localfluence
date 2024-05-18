const createUserLoader = require('./user');

const createDataLoaders = () => {
  return {
    userLoader: createUserLoader(),
  };
};

module.exports = createDataLoaders;
