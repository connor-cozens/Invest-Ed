/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativeeducationsubsectors', {
    initiativeTagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    educationSubsector: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'educationsubsector',
        key: 'educationSubsector'
      }
    }
  }, {
    tableName: 'initiativeeducationsubsectors'
  });
};
