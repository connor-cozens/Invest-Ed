/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funder', {
    funderName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    funderWebsite: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    profitMotive: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    impactInvesting: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    organizationalForm: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    tableName: 'funder'
  });
};
