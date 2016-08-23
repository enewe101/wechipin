/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');

module.exports = {
  index: function(req, res, next) {
    if (!req.useragent.isBot) {
      return res.sendfile(path.join(__dirname, '../../assets/', 'index.html'));
    } else {
      next();
    }
  }
};

