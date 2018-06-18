'use strict';
const geocoder = require('geocoder');

module.exports = (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
      hooks: {
        beforeCreate: function (place, options) {
          geocoder.geocode(place.address, function (err, data) {
            if (err) return err;
            place.lat = data.results[0].geometry.location.lat;
            place.lng = data.results[0].geometry.location.lng;
            place.save().then(function () {
              console.log('--Item Updated: ', place)
            })
          })
        }
      }
  });
  place.associate = function(models) {
    // associations can be defined here
  };
  return place;
};