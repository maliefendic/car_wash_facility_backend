"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProgramSteps",

      [
        {
         
          name: "Washout-first",
          description: "Washout-first",
          cost: 1.5,
        },
        {
          name: "Washout-second",
          description: "Washout-second",
          cost: 2.5,
        },
        {
          
          name: "Foam-first",
          description: "Foam-first",
          cost: 2.5,
        },
        {
        
          name: "Foam-second",
          description: "Foam-second",
          cost: 2,
        },
        {
     
          name: "Washing-first",
          description: "Washing-first",
          cost: 0.5,
        },
        {
        
          name: "Washing-second",
          description: "Washing-second",
          cost: 3.5
        },
        {
          
          name: "Intake-first",
          description: "Intake-first",
          cost: 2.5
        },
        {
          
          name: "Intake-second",
          description: "Intake-second",
          cost: 2,
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
