"use strict";

const { updateExpressionWithTypeArguments } = require("typescript");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PaymentMethods",

      [
        {
          name: "CreditCard",
        },
        {
          name: "BitCoin",
        },
        {
          name: "Cash",
        },
        {
          name: "Bank",
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
