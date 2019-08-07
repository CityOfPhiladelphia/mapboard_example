
// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faDotCircle } from '@fortawesome/free-regular-svg-icons/faDotCircle';
// library.add(faDotCircle);

import accounting from 'accounting';
import mapboard from '@philly/mapboard/src/main.js';

// General Config Modules
import map from './general/map';
import transforms from './general/transforms';
import parcels from './general/parcels';
import greeting from './general/greeting';

// data sources
import opa from './data-sources/opa';
import condoList from './data-sources/condo-list';

// Topics
import property from './topics/property';

var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@d3ad38f050cf55b4ab0dc2ff68e6f18025690246/config.js';

// configure accounting.js
accounting.settings.currency.precision = 0;

mapboard({
  // defaultAddress: '1234 MARKET ST',
  panels: [
    'topics',
    'map'
  ],
  router: {
    enabled: true
  },
  geolocation: {
    enabled: true,
    icon: ['far', 'dot-circle']
  },
  addressInput: {
    width: 415,
    mapWidth: 300,
    position: 'right',
    autocompleteEnabled: false,
    autocompleteMax: 15,
    placeholder: 'Search the map',
  },
  gatekeeperKey: process.env.VUE_APP_GATEKEEPER_KEY,
  map,
  baseConfig: BASE_CONFIG_URL,
  parcels,
  cyclomedia: {
    enabled: true,
    measurementAllowed: false,
    popoutAble: true,
    recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  pictometry: {
    enabled: false,
  },
  transforms,
  greeting,
  dataSources: {
    opa,
    condoList,
  },
  topics: [
    property,
  ],
  components: [
    {
      type: 'topic-set',
      options: {
        defaultTopic: 'property'
      }
    },
  ],
});
