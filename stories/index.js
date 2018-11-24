import sinon from 'sinon';

// Add global styles
import 'amo/components/App/styles.scss';
import 'core/css/inc/lib.scss';

import './setup/styles.scss';

global.sinon = sinon.createSandbox();

// Automagically require all stories.
const req = require.context('./ui', false, /\.js$/);
req.keys().forEach(req);
