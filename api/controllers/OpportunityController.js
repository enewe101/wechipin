/**
 * OpportunityController
 *
 * @description :: Server-side logic for managing opportunities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
      lineReader.on('close', function() {
        var each = require('async-each-series');
        each(opportunities, function(opportunityObject, nextOpportunity) {
          Country.findOrCreate({name: opportunityObject.Country}).exec(function createFindCB(error, country){
            City.findOrCreate({name: opportunityObject.City}, {name: opportunityObject.City, country: country}).exec(function createFindCB(error, city){
              var skills = [];
              each(opportunityObject.Skills, function(skill, nextSkill) {
                Skill.findOrCreate({name_en:skill}).exec(function createFindCB(error, createdSkill) {
                  skills.push(createdSkill);
                  nextSkill();
                });
              }, function (err) {
                Opportunity.create({skills:skills, city:city, country:country, description_en:opportunityObject.Description_en}).exec(function (err, records) {
                  nextOpportunity();
                });
              });
            });
          });
        }, function (err) {
          console.log("Inserted "+opportunities.length+" opportunities.");
        });
      });
      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully!',
        files: uploadedFiles
      });
    });
  }
};

