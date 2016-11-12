/* -----------------------------------|
 *|  Main Application
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';

// Setup server
var app = express();
require('./config/express').default(app);
require('./config/webpack').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.listen(config.port, config.ip, function(err) {
    (err) ? console.log(err) : '';
    console.log(' 🌎  Express server listening on %d, in %s mode  🌎', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
