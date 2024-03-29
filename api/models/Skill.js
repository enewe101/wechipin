/**
 * Skill.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name_en: {
      type: 'string',
      unique: true
    },
    name_fr: {
      type: 'string',
      unique: true
    },
    opportunities: {
      collection: 'opportunity',
      via: 'skills'
    },
    users: {
      collection: 'user',
      via: 'skills'
    }
  }
};

