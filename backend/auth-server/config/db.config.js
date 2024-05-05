const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const { POSTGRES_URL } = require('./env.config');

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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database', err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize, migrationConf, seedsConf };
