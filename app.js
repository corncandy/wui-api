var express = require('express');
var jsonServer = require('json-server');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var upp = require('./routes/upp');

// var app = express();
var app = jsonServer.create();
var sample = jsonServer.router(require('./routes/sample.js')());
sample.render = function (req, res) {
  console.log(typeof res.locals.data)
  if (res.locals.data.length) {
    res.jsonp({
      respHeader: {
        respCode: 'UPP-10000'
      },
      list: res.locals.data,
      total: 130
    });
  } else {
    res.jsonp({
      respHeader: {
        respCode: 'UPP-10000'
      },
      data: res.locals.data,
    });
  }
}
var middlewares = jsonServer.defaults();

app.use(middlewares);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/upp', upp);
app.post('/sample/web/v1/sso/getResources', function (req, res, next) {
  res.send({
    "aasUserPrincipal": {
      "aasUserResources": {
        "resources": [{
          "levelStructure": "1.0.0",
          "linkUrl": "/sample",
          "resourceDisplayName": "样例工程",
          "resourceType": "menu"
        }, {
          "levelStructure": "1.1.0",
          "linkUrl": "/sample/blank-page.html",
          "parentLevelStructure": "1.0.0",
          "resourceDisplayName": "空白页面",
          "resourceType": "menu"
        }, {
          "levelStructure": "1.2.0",
          "linkUrl": "/sample/list-page.html",
          "parentLevelStructure": "1.0.0",
          "resourceDisplayName": "列表页面",
          "resourceType": "menu"
        }, {
          "levelStructure": "1.2.1",
          "linkUrl": "/sample/detail-page.html",
          "parentLevelStructure": "1.2.0",
          "resourceDisplayName": "详情页面",
          "resourceType": "menu"
        }],
        "roles": [{
          "roleName": "Administrator"
        }]
      },
      "ssoUserName": "Cloud Mu"
    },
    "respHeader": {
      "respCode": "AAS-10000"
    }
  });
});
app.use('/sample/web/v1', sample);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
