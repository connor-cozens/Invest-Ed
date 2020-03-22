/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativemaineducationsubsector', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    mainEducationSubsector: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'educationsubsector',
        key: 'educationSubsector'
      }
    }
  }, {
    tableName: 'initiativemaineducationsubsector'
  });
};
