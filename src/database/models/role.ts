"use strict";
module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define(
        "Roles", {
        
            id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Roles.associate = function(models) {
      Roles.hasMany(models.Users,{ foreignKey: 'roleId', as: 'role' });     
    };

   
    return Roles;
};