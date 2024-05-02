const { Umzug } = require('umzug');

const { sequelize, migrationConf } = require('../config').dbConfig;

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

module.exports = { rollbackMigration };
