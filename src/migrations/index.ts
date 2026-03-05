import * as migration_20260304_200717 from './20260304_200717';

export const migrations = [
  {
    up: migration_20260304_200717.up,
    down: migration_20260304_200717.down,
    name: '20260304_200717'
  },
];
