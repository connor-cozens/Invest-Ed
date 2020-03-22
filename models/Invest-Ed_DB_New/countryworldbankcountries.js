/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countryworldbankcountries', {
    worldBankCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      references: {
        model: 'countryworldbankcodes',
        key: 'worldBankCode'
      }
    },
    countryName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'country',
        key: 'countryName'
      }
    }
  }, {
    tableName: 'countryworldbankcountries'
  });
};
