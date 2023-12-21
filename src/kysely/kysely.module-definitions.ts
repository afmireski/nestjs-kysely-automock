import { ConfigurableModuleBuilder } from '@nestjs/common';
import { KyselyConfig } from 'kysely';

export const KYSELY_CONFIG = 'KYSELY_CONFIG';

// Define métodos customizados para o módulo
export const {
  ConfigurableModuleClass: KyselyModuleClass,
  MODULE_OPTIONS_TOKEN: KYSELY_OPTIONS,
} = new ConfigurableModuleBuilder<KyselyConfig>()
  .setClassMethodName('forRoot')
  .build();
