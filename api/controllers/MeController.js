/**
 * MeController
 *
 * @description :: Server-side logic for managing us
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {
    User.findOne({
      id:req.session.user.id
    }).exec(function (err, user){
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound('Could not find user, sorry.');
      }

      return res.json(user);
    });
  }
};
