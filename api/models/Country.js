/**
 * Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    opportunities: {
      collection: 'opportunity',
      via: 'country'
    },
    users: {
      collection: 'user',
      via: 'country'
    },
    organizations: {
      collection: 'organization',
      via: 'country'
    },
    cities: {
      collection: 'city',
      via: 'country'
    }
  }
};
