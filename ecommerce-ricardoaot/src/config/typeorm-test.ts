
import { config as DotEnvConfig } from "dotenv"

DotEnvConfig({ path: "./.env" })

import { DataSource } from 'typeorm';

export const testDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true, // Asegúrate de que esto esté en true para que las entidades se sincronicen con la base de datos
  dropSchema: false, // Desactiva el dropSchema
});