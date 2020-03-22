/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativefundingsource', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    sourceOfFunding: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'initiativefundingsource'
  });
};
