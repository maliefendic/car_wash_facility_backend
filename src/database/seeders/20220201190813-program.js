"use strict";

"use strict";

const { updateExpressionWithTypeArguments } = require("typescript");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Programs",

      [
        {
          name: "Washout",
          description: "Washout",
          total:4
        },
        {
          name: "Foam",
          description: "Foam",
          total:4.5
        },
        {
          name: "Washing",
          description: "Washing",
          total:3.5
        },
        {
          name: "Intake",
          description: "Intake",
          total:4.5
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
