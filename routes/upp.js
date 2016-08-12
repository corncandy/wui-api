var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/web/v1/sso/getResources', function(req, res, next) {
  res.send({
    respHeader: {
      respCode: 'UPP-10000'
    },
    aasUserPrincipal: {
      ssoUserName: 'Cloud Mu',
      aasUserResources: {
        roles: [{
          roleName: 'Administrator'
        }],
        resources: [{
          linkUrl: '/upp/local-account.html'
        }]
      }
    }
  });
});

router.get('/web/v1/uppCounts', function(req, res, next) {
  res.send({
    respHeader: {
      respCode: 'UPP-10000'
    },
    uppCounts: {
      uppAccountsCounts: 20
    }
  });
});

module.exports = router;
