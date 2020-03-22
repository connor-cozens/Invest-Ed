/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('educationsubsector', {
    educationSubsector: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'educationsubsector'
  });
};
