/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    opportunities: {
      collection: 'opportunity',
      via: 'city'
    },
    users: {
      collection: 'user',
      via: 'city'
    },
    organizations: {
      collection: 'organization',
      via: 'city'
    },
    country: {
      model: 'country'
    }
  }
};

