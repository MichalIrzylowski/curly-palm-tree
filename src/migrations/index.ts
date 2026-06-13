import * as migration_20260304_200717 from './20260304_200717';
import * as migration_20260404_093152 from './20260404_093152';
import * as migration_20260404_142243 from './20260404_142243';
import * as migration_20260607_122756 from './20260607_122756';
import * as migration_20260607_183811 from './20260607_183811';
import * as migration_20260608_084428 from './20260608_084428';
import * as migration_20260608_140042 from './20260608_140042';
import * as migration_20260609_172053 from './20260609_172053';
import * as migration_20260611_090652 from './20260611_090652';
import * as migration_20260611_173856 from './20260611_173856';
import * as migration_20260612_184509 from './20260612_184509';
import * as migration_20260612_202059_seo_improvements from './20260612_202059_seo_improvements';

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
    name: '20260607_183811',
  },
  {
    up: migration_20260608_084428.up,
    down: migration_20260608_084428.down,
    name: '20260608_084428',
  },
  {
    up: migration_20260608_140042.up,
    down: migration_20260608_140042.down,
    name: '20260608_140042',
  },
  {
    up: migration_20260609_172053.up,
    down: migration_20260609_172053.down,
    name: '20260609_172053',
  },
  {
    up: migration_20260611_090652.up,
    down: migration_20260611_090652.down,
    name: '20260611_090652',
  },
  {
    up: migration_20260611_173856.up,
    down: migration_20260611_173856.down,
    name: '20260611_173856',
  },
  {
    up: migration_20260612_184509.up,
    down: migration_20260612_184509.down,
    name: '20260612_184509',
  },
  {
    up: migration_20260612_202059_seo_improvements.up,
    down: migration_20260612_202059_seo_improvements.down,
    name: '20260612_202059_seo_improvements',
  },
];
