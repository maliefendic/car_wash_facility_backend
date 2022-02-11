
"use strict";
module.exports = (sequelize, Sequelize) => {
    const PaymentMethods = sequelize.define("PaymentMethods", {
      id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });


    PaymentMethods.associate = function (models) {
    PaymentMethods.belongsToMany( models.Users, 
        { through: 'UserPaymentMethods',foreignKey: 'paymentMethodId'} )
};
   
    return PaymentMethods;
};