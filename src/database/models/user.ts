"use strict";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users", {
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isBaned: {
      type: Sequelize.BOOLEAN,
    },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }

  });

  Users.associate = function (models) {
    Users.belongsTo(models.Roles, {as:"role", foreignKey: 'roleId' })
    Users.belongsToMany( models.PaymentMethods, 
      { through: 'UserPaymentMethods',foreignKey: 'userId'} )
  };


  Users.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Sign JWT and return
  Users.prototype.getSignedJwtToken = async function () {
    const role = await sequelize.models.Roles.findByPk(this.roleId)
    const payload = {  user: { id: this.id, role: role.name, email: this.email }}
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
  };

  // Match user entered password to hashed password in database
  Users.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this._previousDataValues.password);
  };

  return Users;
};