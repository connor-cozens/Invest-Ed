/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('implements', {
    tagNum: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'initiative',
        key: 'tagNumber'
      }
    },
    implementorName: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'implementor',
        key: 'implementorName'
      }
    },
    startYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endYear: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'implements'
  });
};
