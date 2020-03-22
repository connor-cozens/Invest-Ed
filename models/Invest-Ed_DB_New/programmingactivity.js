/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('programmingactivity', {
    programmingActivity: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    programTheme: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'programmingactivity'
  });
};
