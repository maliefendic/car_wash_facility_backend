"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",

      [
        {
          
          userId: 1,
          discount: 0,
          total: 4,
          programId:3,
          status: "Paid",
        },
        {
        
          userId: 1,
          discount: 0,
          total: 4.5,
          programId:1,
          status: "Paid",
        },
        {
          
          userId: 1,
          discount: 0,
          programId:2,
          total: 4,
          status: "Paid",
        },
        {
          
          userId: 1,
          discount: 0,
          programId:4,
          total: 4.5,
          status: "Paid",
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
