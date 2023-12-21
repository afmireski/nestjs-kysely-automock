import { Inject, Injectable } from '@nestjs/common';
import { Kysely, KyselyConfig } from 'kysely';
import { KYSELY_CONFIG } from './kysely.module-definitions';
import { DB } from 'kysely/kysely-types';

@Injectable()
export class KyselyService {
  readonly database: Kysely<DB>;

  constructor(@Inject(KYSELY_CONFIG) config: KyselyConfig) {
    this.database = new Kysely(config);
  }
}
