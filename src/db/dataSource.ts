import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import config from '../config/configuration';

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/../**/entity/*.entity.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
};

const AppDataSource = new DataSource({
  ...dbConfig,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
