/**
 * Cause.js
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
    opportunities: {
      collection: 'opportunity',
      via: 'causes'
    },
    users: {
      collection: 'user',
      via: 'causes'
    }
  }
};

