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

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectToDatabase = async (retryCount = 0) => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database', err);
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying connection (${retryCount + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectToDatabase(retryCount + 1);
    } else {
      console.error(
        `Maximum retry attempts (${MAX_RETRIES}) reached. Shutting down...`,
      );
      process.exit(1);
    }
  }

  return null;
};

module.exports = { connectToDatabase, sequelize, migrationConf, seedsConf };
