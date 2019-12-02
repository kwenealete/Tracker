
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName:{
       type:DataTypes.STRING,
       allowNull: false
      },
    lastName:{
       type:DataTypes.STRING,
       allowNull: false
      },
    email: {
       allowNull: false,
       type: DataTypes.STRING
      },
    password: {
       allowNull: false,
       type: DataTypes.STRING
      } 
    
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Measurements);
  };
  return User;
};