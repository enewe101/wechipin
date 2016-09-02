/**
 * Organization.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name_en: {
      type: 'string'
    },
    name_fr: {
      type: 'string'
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
    description_en: {
      type: 'text'
    },
    description_fr: {
      type: 'text'
    },
    missionStatement_en: {
      type: 'text'
    },
    missionStatement_fr: {
      type: 'text'
    },
    opportunities: {
      collection: 'opportunity',
      via: 'organizations'
    },
    sentMessages: {
      collection: 'message',
      via: 'fromOrganization',
      dominant: true
    },
    receivedMessages: {
      collection: 'message',
      via: 'toOrganization',
      dominant: true
    }
  }
};

