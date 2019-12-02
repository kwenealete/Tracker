
module.exports = (sequelize, DataTypes) => {
  const Measurements = sequelize.define('Measurements', {
    weight:{
      allowNull:false,
      type:DataTypes.FLOAT
    },
    
  }, {});
  Measurements.associate = function(models) {
    Measurements.belongsTo(models.User);
  };
  return Measurements;
};