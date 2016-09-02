/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var helper = require('sendgrid').mail;
var sg = require('sendgrid')('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');
var Hashids = require('hashids');
module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    body: {
      type: 'text'
    },
    fromUser: {
      model: 'user'
    },
    toUser: {
      model: 'user'
    },
    fromOrganization: {
      model: 'organization'
    },
    toOrganization: {
      model: 'organization'
    },
    opportunity: {
      model: 'opportunity'
    },
    read: 'boolean',
    attachments: {
      collection: 'attachment',
      via: 'message',
      dominant: true
    },
    deletedBySender: 'boolean',
    deletedByReceiver: 'boolean'
  },

  // Lifecycle Callbacks
  afterCreate: function (newMessage, cb) {
    var hashids = new Hashids('', 0, 'abcdefghijklmnopqrstuvwxyz0123456789'); // all lowercase
    var from_email = new helper.Email('test@example.com');
    var to_email = new helper.Email('elwebmaster@gmail.com'); //replace with opportunity email
    var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', 'Hello, Email!');
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    console.log(hashids.encode(1, 2, 3)); // mdfphx
    // sg.API(request, function(error, response) {
    //   console.log(response.statusCode);
    //   console.log(response.body);
    //   console.log(response.headers);
    //   if (error) cb(error);
    //   else cb();
    // });
    cb();
  }
};

