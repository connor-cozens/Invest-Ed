/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('initiativetargetschoolmanagement', {
    tagNumber: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    targetSchoolManagementType: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'initiativetargetschoolmanagement'
  });
};
