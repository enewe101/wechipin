/**
 * CauseController
 *
 * @description :: Server-side logic for managing causes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findYourCause: function(req, res) {
    Cause.find().exec(function(err, causes) {
      if (err) return res.serverError(err);
      return res.view('cause/findYourCause',{
        causes: causes
      });
    });
  }
};

