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
import * as migration_20260613_144249 from './20260613_144249';
import * as migration_20260613_144343 from './20260613_144343';
import * as migration_20260613_161006_campaigns from './20260613_161006_campaigns';
import * as migration_20260613_162508_campaign_link_type from './20260613_162508_campaign_link_type';

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
  {
    up: migration_20260613_144249.up,
    down: migration_20260613_144249.down,
    name: '20260613_144249',
  },
  {
    up: migration_20260613_144343.up,
    down: migration_20260613_144343.down,
    name: '20260613_144343',
  },
  {
    up: migration_20260613_161006_campaigns.up,
    down: migration_20260613_161006_campaigns.down,
    name: '20260613_161006_campaigns',
  },
  {
    up: migration_20260613_162508_campaign_link_type.up,
    down: migration_20260613_162508_campaign_link_type.down,
    name: '20260613_162508_campaign_link_type'
  },
];
