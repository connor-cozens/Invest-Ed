/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funderinternationalbases', {
    funderName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    baseLocation: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'funderinternationalbases'
  });
};
