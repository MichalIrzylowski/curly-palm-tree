import * as migration_20260304_200717 from './20260304_200717';
import * as migration_20260404_093152 from './20260404_093152';

export const migrations = [
  {
    up: migration_20260304_200717.up,
    down: migration_20260304_200717.down,
    name: '20260304_200717',
  },
  {
    up: migration_20260404_093152.up,
    down: migration_20260404_093152.down,
    name: '20260404_093152'
  },
];
