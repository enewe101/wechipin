/**
 * Opportunity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    organizations: {
      collection: 'organization',
      via: 'opportunities',
      dominant: true
    },
    causes: {
      collection: 'cause',
      via: 'opportunities',
      dominant: true
    },
    languages: {
      collection: 'language',
      via: 'opportunities',
      dominant: true
    },
    skills: {
      collection: 'skill',
      via: 'opportunities',
      dominant: true
    },
    title_en: {
      type: 'string'
    },
    title_fr: {
      type: 'string'
    },
    description_en: {
      type: 'text'
    },
    description_fr: {
      type: 'text'
    },
    contactName: {
      type: 'string'
    },
    contactNumber: {
      type: 'string'
    },
    lengthOfCommitment_en: {
      type: 'string'
    },
    lengthOfCommitment_fr: {
      type: 'string'
    },
    commitment: {
      model: 'commitment'
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
    events: {
      collection: 'event',
      via: 'opportunity'
    },
    jobTypes: {
      collection: 'jobType',
      via: 'opportunities',
      dominant: true
    },
    interactions: {
      collection: 'interaction',
      via: 'opportunities',
      dominant: true
    },
    qualifications: {
      collection: 'qualification',
      via: 'opportunities',
      dominant: true
    },
  }
};

