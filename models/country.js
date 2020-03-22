/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country', {
    countryName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    countryCode: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    incomeGroup: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lendingGroup: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    lendingCategory: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'country'
  });
};
