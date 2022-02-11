"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Transactions",

      [
        {
         
          orderId: 1,
          userPaymentMethodsId: 1,
        },
        {
          
          orderId: 2,
          userPaymentMethodsId: 2,
        },
        {
          orderId: 3,
          userPaymentMethodsId: 3,
        },
        {
          
          orderId: 4,
          userPaymentMethodsId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
