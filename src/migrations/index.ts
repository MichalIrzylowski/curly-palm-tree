import * as migration_20260304_200717 from './20260304_200717';
import * as migration_20260404_093152 from './20260404_093152';
import * as migration_20260404_142243 from './20260404_142243';
import * as migration_20260607_122756 from './20260607_122756';
import * as migration_20260607_183811 from './20260607_183811';

export const migrations = [
  {
    up: migration_20260304_200717.up,
    down: migration_20260304_200717.down,
    name: '20260304_200717',
  },
  {
    up: migration_20260404_093152.up,
    down: migration_20260404_093152.down,
    name: '20260404_093152',
  },
  {
    up: migration_20260404_142243.up,
    down: migration_20260404_142243.down,
    name: '20260404_142243',
  },
  {
    up: migration_20260607_122756.up,
    down: migration_20260607_122756.down,
    name: '20260607_122756',
  },
  {
    up: migration_20260607_183811.up,
    down: migration_20260607_183811.down,
    name: '20260607_183811'
  },
];
