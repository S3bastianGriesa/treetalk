const router = require('./router');
const service = require('./service');
const model = require('./model');

model.setUserService(service);

module.exports.router = router;
module.exports.service = service;
module.exports.model = model;
