/**
 * Organization.js
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
    streetAddress: {
      type: 'string'
    },
    city: {
      model: 'city'
    },
    country: {
      model: 'country'
    },
    contactEmail: {
      type: 'email'
    },
    website: {
      type: 'string'
    },
    description: {
      type: 'text'
    },
    missionStatement: {
      type: 'text'
    },
    opportunities: {
      collection: 'opportunity',
      via: 'organizations'
    }
  }
};

