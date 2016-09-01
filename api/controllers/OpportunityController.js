/**
 * OpportunityController
 *
 * @description :: Server-side logic for managing opportunities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var sync = require('synchronize');
var each = require('async-each-series');

module.exports = {
  bulkImport: function (req, res) {
    req.file('import').upload(function (err, uploadedFiles) {
      if (err) return res.serverError(err);
      var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(uploadedFiles[0].fd)
      });
      var opportunities = [];
      lineReader.on('line', function (line) {
        opportunities.push(JSON.parse(line));
      });
      lineReader.on('close', function () {
        var countries = {};
        var cities = {};
        var skills = {};
        var languages = {};
        var organizations = {};
        var commitments = {};
        var causes = {};

        var getCountryId = function (countryName, cb) {
          if (!countries[countryName]) {
            Country.findOrCreate({name: countryName}).exec(function createFindCB(error, country) {
              countries[country.name] = country.id;
              cb(null, country.id);
            });
          } else {
            cb(null, countries[countryName]);
          }
        };

        var getCityId = function (cityName, countryId, cb) {
          if (!cities[cityName]) {
            City.findOrCreate({name: cityName}, {
              name: cityName,
              country: countryId
            }).exec(function createFindCB(error, city) {
              cities[city.name] = city.id;
              cb(null, city.id);
            });
          } else {
            cb(null, cities[cityName]);
          }
        };

        var getSkillIds = function (skillNames, cb) {
          var skillsList = [];
          each(skillNames, function (skill, nextSkill) {
            if (!skills[skill]) {
              Skill.findOrCreate({name_en: skill}).exec(function createFindCB(error, createdSkill) {
                skills[createdSkill.name_en] = createdSkill.id;
                skillsList.push(createdSkill.id);
                nextSkill();
              });
            } else {
              skillsList.push(skills[skill]);
              nextSkill();
            }
          }, function (err) {
            cb(err, skillsList);
          });
        };

        var getEventIds = function (start, end, location, cb) {
          var createdEvents = [];
          Event.create({start: start, end: end, location: location}).exec(function createFindCB(error, createdEvent) {
            createdEvents.push(createdEvent.id);
            cb(err, createdEvents);
          });
        };

        var getLanguageIds = function (languageNames, cb) {
          var languagesList = [];
          each(languageNames, function (language, nextLanguage) {
            if (!languages[language]) {
              Language.findOrCreate({name_en: language}).exec(function createFindCB(error, createdLanguage) {
                languages[createdLanguage.name_en] = createdLanguage.id;
                languagesList.push(createdLanguage.id);
                nextLanguage();
              });
            } else {
              languagesList.push(languages[language]);
              nextLanguage();
            }
          }, function (err) {
            cb(err, languagesList);
          });
        };

        var getOrganizationIds = function (organizationName, cb) {
          var organizationsList = [];
          if (!organizations[organizationName]) {
            Organization.findOrCreate({name_en: organizationName}).exec(function createFindCB(error, organization) {
              organizations[organization.name_en] = organization.id;
              organizationsList.push(organization.id);
              cb(error, organizationsList);
            });
          } else {
            organizationsList.push(organizations[organizationName]);
            cb(null, organizationsList);
          }
        };

        var getCommitmentId = function (commitmentName, cb) {
          if (!commitments[commitmentName]) {
            Commitment.findOrCreate({name_en: commitmentName}).exec(function createFindCB(error, commitment) {
              commitments[commitment.name_en] = commitment.id;
              cb(error, commitment.id);
            });
          } else {
            cb(null, commitments[commitmentName]);
          }
        };

        var getCauseIds = function (causeNames, cb) {
          var causesList = [];
          each(causeNames, function (cause, nextCause) {
            if (!causes[cause]) {
              Cause.findOrCreate({name_en: cause}).exec(function createFindCB(error, createdCause) {
                causes[createdCause.name_en] = createdCause.id;
                causesList.push(createdCause.id);
                nextCause();
              });
            } else {
              causesList.push(causes[cause]);
              nextCause();
            }
          }, function (err) {
            cb(err, causesList);
          });
        };

        each(opportunities, function (opportunityObject, nextOpportunity) {
          sync.fiber(function () {
            var country_id = sync.await(getCountryId(opportunityObject.Country, sync.defer()));
            var city_id = sync.await(getCityId(opportunityObject.City, country_id, sync.defer()));
            var skill_ids = sync.await(getSkillIds(opportunityObject.Skills, sync.defer()));
            var event_ids = sync.await(getEventIds(opportunityObject['Date_start'], opportunityObject['Date_end'], opportunityObject.Location, sync.defer()));
            var language_ids = sync.await(getLanguageIds(opportunityObject.Languages, sync.defer()));
            var organization_ids = sync.await(getOrganizationIds(opportunityObject.Organization, sync.defer()));
            var commitment_id = sync.await(getCommitmentId(opportunityObject.Type, sync.defer()));
            var cause_ids = sync.await(getCauseIds(opportunityObject.Causes, sync.defer()));

            Opportunity.create({
              city: city_id,
              contactEmail: opportunityObject['Contact email'],
              lengthOfCommitment_en: opportunityObject['Length of commitment'],
              contactNumber: opportunityObject['Contact number'],
              title_en: opportunityObject.Title,
              skills: skill_ids,
              contactName: opportunityObject['Contact name'],
              events: event_ids,
              description_en: opportunityObject.Description_en,
              languages: language_ids,
              country: country_id,
              description_fr: opportunityObject.Description_fr,
              organizations: organization_ids,
              commitment: commitment_id,
              causes: cause_ids
            }).exec(function (err, records) {
              nextOpportunity();
            });
          });
        }, function (err) {
          console.log("Inserted " + opportunities.length + " opportunities.");
        });
      });
      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      });
    });
  }
};

