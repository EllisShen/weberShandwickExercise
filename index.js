// express.js and middlewares
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
// Configuration Settings
const config = require('./config');
const path = require('path');

// expressjs init
const app = express();

function middlewareInit() {
  // set dist/static directory serve as static files
  // if (process.env.NODE_ENV === 'production') {
  //   app.use('/static', express.static(path.join(__dirname, '../dist/static')));
  // }

  // set the view engine to ejs
  app.set('view engine', 'ejs');
  // config bodyParser
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
}

// middleware initialize
middlewareInit();


/**
 * GET: handle '/'
 *
 */
// for production, static files should be served by nginx
app.get('/', (req, res) => {
  axios.get(config.API_SERVER + '/status')
    .then((response) => {
      let jsonData = response.data;
      res.render('pages/default', {
        running_time: jsonData.running_time,
        called: jsonData.called,
        first_called_date_time: jsonData.first_called_date_time,
        total_called: jsonData.total_called
      })
    })
    .catch(err => {
      // fail to retrive json payload
      res.render('pages/404')
    })
});


/**
 * server start entrypoint
 * Connect to db and listen to port
 */
app.listen(config.LISTEN_PORT, () => {
  console.log('listening on port', config.LISTEN_PORT + ' ...');
});