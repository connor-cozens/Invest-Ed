const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const dbconfig = require('./../config/dbconfig');
const sequelize = require('./../services/database');
const {Sequelize, DataTypes, Model} = require('sequelize');

// User Model
const User = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING(25),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    unique: true
  }}, {
    // Table to access from database specified here
    tableName: 'credentials',
    timestamps: false
});

module.exports = User;
