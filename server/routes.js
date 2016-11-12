/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import debug from 'debug';

export default function(app) {
  var env = app.get('env');

  debug.enable('app:*');
  var log = debug('app:devServer');

  // Insert routes below
  app.use('/api/image', require('./api/image'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  if (env === 'development') {
    console.log('dev mode');
    const middleware = app.get('wpMiddleware');
    log('Routes: ' + path.resolve(`${app.get('appPath')}/index.html`));
    app.route('/*')
      .get((req, res) => {
        //res.sendFile(middleware.fileSystem.readFileSync(path.resolve(`${app.get('appPath')}/index.html`)));
        res.write(path.resolve(`${app.get('appPath')}/index.html`));
        res.end();
      });
    } else {
          console.log('!!dev mode');
      app.route('/*')
      .get((req, res) => {
        res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
      });
    }
}
