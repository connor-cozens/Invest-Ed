/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programarea', {
    programArea: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    activity: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'programarea'
  });
};
