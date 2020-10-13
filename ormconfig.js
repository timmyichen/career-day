// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

let database = 'careerday';

if (process.env.NODE_ENV === 'test') {
  database = 'test';
}

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database,
  synchronize: true,
  logging: false,
  entities: ['server/models/*.ts'],
  migrations: ['server/migrations/*.ts'],
  cli: {
    migrationsDir: 'server/migrations',
  },
};
