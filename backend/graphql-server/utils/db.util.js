const { Umzug } = require('umzug');

const { seedsConf, migrationConf, sequelize } = require('../config');

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const runSeeders = async () => {
  const seeder = new Umzug(seedsConf);
  const seeds = await seeder.up();
  console.log('Seeders up to date', {
    files: seeds.map((seed) => seed.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const rollbackSeed = async () => {
  await sequelize.authenticate();
  const seeder = new Umzug(seedsConf);
  await seeder.down();
};

module.exports = { runMigrations, runSeeders, rollbackMigration, rollbackSeed };
