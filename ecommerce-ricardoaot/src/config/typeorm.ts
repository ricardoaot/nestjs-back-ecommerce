import { DataSource, DataSourceOptions } from "typeorm"
import { config as DotEnvConfig } from "dotenv"
import { registerAs } from "@nestjs/config"

DotEnvConfig({ path: "./.env.development" })

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: false,
    logging: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  }

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)
