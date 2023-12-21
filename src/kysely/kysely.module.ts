import { Global, Module } from '@nestjs/common';
import { KyselyService } from './kysely.service';
import {
  KYSELY_CONFIG,
  KYSELY_OPTIONS,
  KyselyModuleClass,
} from './kysely.module-definitions';
import { KyselyConfig } from 'kysely';

@Global()
@Module({
  providers: [
    KyselyService,
    {
      provide: KYSELY_CONFIG,
      inject: [KYSELY_OPTIONS],
      useFactory: (config: KyselyConfig) => config,
    },
  ],
  exports: [KyselyService],
})
export class KyselyModule extends KyselyModuleClass {}
