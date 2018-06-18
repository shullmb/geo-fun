'use strict';
module.exports = (sequelize, DataTypes) => {
  var place = sequelize.define('place', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {});
  place.associate = function(models) {
    // associations can be defined here
  };
  return place;
};