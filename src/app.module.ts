import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KyselyModule } from './kysely/kysely.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KyselyModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: new PostgresDialect({
          pool: new Pool({
            // database: configService.get('DATABASE_NAME'),
            // user: configService.get('DATABASE_USER'),
            // host: configService.get('DATABASE_HOST'),
            connectionString: configService.get('DATABASE_URL'),
          }),
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
