module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define("Status", {
    statusCode: DataTypes.INTEGER
  });

  Status.associate = function(models) {
    Status.belongsTo(models.Check, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Status;
};
