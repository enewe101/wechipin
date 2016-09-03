/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

  attributes: require('waterlock').models.user.attributes({

    fullName: {
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
    postalCode: {
      type: 'string'
    },
    skills: {
      collection: 'skill',
      via: 'users',
    },
    languages: {
      collection: 'language',
      via: 'users',
    },
    interests: {
      collection: 'interest',
      via: 'users',
    },
    causes: {
      collection: 'cause',
      via: 'users'
    },
    dateOfBirth: {
      type: 'date'
    },
    gender: {
      type: 'string'
    },
    sentMessages: {
      collection: 'message',
      via: 'fromUser',
      dominant: true
    },
    receivedMessages: {
      collection: 'message',
      via: 'toUser',
      dominant: true
    },
    interactions: {
      collection: 'interaction',
      via: 'users'
    },
    jobTypes: {
      collection: 'jobType',
      via: 'users'
    },
    qualifications: {
      collection: 'qualification',
      via: 'users'
    }
  }),

  beforeCreate: require('waterlock').models.user.beforeCreate,
  beforeUpdate: require('waterlock').models.user.beforeUpdate
};
