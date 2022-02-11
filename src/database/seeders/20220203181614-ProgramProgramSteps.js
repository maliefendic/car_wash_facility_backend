"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProgramProgramSteps",

      [
        {
          programId: 1,
          programStepId: 1,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
          programId: 1,
          programStepId: 2,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
          
          programId: 2,
          programStepId: 3,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
          programId: 2,
          programStepId: 4,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
          programId: 3,
          programStepId: 6,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
        
          programId: 3,
          programStepId: 6,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
        
          programId: 4,
          programStepId: 7,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
        },
        {
          
          programId: 4,
          programStepId: 8,
          createdAt: Sequelize.fn("now"),
          updatedAt: Sequelize.fn("now"),
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
