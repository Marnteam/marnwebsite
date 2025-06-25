import * as migration_20250527_185443_init from './20250527_185443_init';
import * as migration_20250528_175306 from './20250528_175306';
import * as migration_20250531_213347 from './20250531_213347';
import * as migration_20250601_090818 from './20250601_090818';
import * as migration_20250602_161514 from './20250602_161514';
import * as migration_20250612_142231 from './20250612_142231';
import * as migration_20250615_224916 from './20250615_224916';
import * as migration_20250623_212150 from './20250623_212150';
import * as migration_20250625_090956 from './20250625_090956';

export const migrations = [
  {
    up: migration_20250527_185443_init.up,
    down: migration_20250527_185443_init.down,
    name: '20250527_185443_init',
  },
  {
    up: migration_20250528_175306.up,
    down: migration_20250528_175306.down,
    name: '20250528_175306',
  },
  {
    up: migration_20250531_213347.up,
    down: migration_20250531_213347.down,
    name: '20250531_213347',
  },
  {
    up: migration_20250601_090818.up,
    down: migration_20250601_090818.down,
    name: '20250601_090818',
  },
  {
    up: migration_20250602_161514.up,
    down: migration_20250602_161514.down,
    name: '20250602_161514',
  },
  {
    up: migration_20250612_142231.up,
    down: migration_20250612_142231.down,
    name: '20250612_142231',
  },
  {
    up: migration_20250615_224916.up,
    down: migration_20250615_224916.down,
    name: '20250615_224916',
  },
  {
    up: migration_20250623_212150.up,
    down: migration_20250623_212150.down,
    name: '20250623_212150',
  },
  {
    up: migration_20250625_090956.up,
    down: migration_20250625_090956.down,
    name: '20250625_090956'
  },
];
