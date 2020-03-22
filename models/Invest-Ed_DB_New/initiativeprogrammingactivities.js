/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativeprogrammingactivities', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    programmingActivity: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'initiativeprogrammingactivities'
  });
};
