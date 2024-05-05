const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const { POSTGRES_URL, NODE_ENV } = require('./env.config');

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
});

const migrationConf = {
  migrations: { glob: 'database/migrations/*.js' },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const seedsConf = {
  migrations: { glob: 'database/seeds/*.js' },
  storage: new SequelizeStorage({ sequelize, tableName: 'seeds' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    if (NODE_ENV && NODE_ENV !== 'production') {
      await runSeeders();
    }

    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database', err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize, migrationConf, seedsConf };
