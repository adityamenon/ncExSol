/**
 * This file needs to run the setup script and
 * wait for promises to resolve and start listening on the configured port
 *
 * In case of error it should log that to the console and abort.
 *
 * Don't be intimidated by bin/www, you can do the same thing, and get rid of some of the logic
 * Any logic you deem as absolutely necessary can be kept inside a util, tested and used
 */


const AppSetup = require('./setup');
const Util = require('./util');
const express = require('express');

new AppSetup({
      server: express()
    }).run().then((server) => {
      Util.successMessage(server);
    }).catch((error) => {
      Util.errorMessage(error);
    });

// var path = require('path');
// var logger = require('morgan');
//
// var index = require('./routes/index');
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
