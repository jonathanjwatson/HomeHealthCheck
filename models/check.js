module.exports = function(sequelize, DataTypes) {
  var Check = sequelize.define("Check", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.STRING,
    frequency: DataTypes.STRING
  });

  Check.associate = function(models) {
    Check.hasMany(models.Status, {
      onDelete: "cascade"
    });
  };

  return Check;
};
