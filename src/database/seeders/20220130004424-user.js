'use strict';

const { updateExpressionWithTypeArguments } = require("typescript");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: "$2a$10$ogsrtawFkEsIwVoThrmGYeUZG7q1ItOxWT5NS/V9m69xbHWKCZltu",
      firstName: "admin",
      lastName: "admin",
      isConfirmed: true,
      roleId: 1
    }, {
      email: "user@gmail.com",
      password: "$2a$10$kq/zYyRgq68V3KMaSgjZXO6McL4Cnke8XFpxw8nFigqnOFnV4U6y2",
      firstName: "user",
      lastName: "user",
      isConfirmed: true,
      roleId: 2
  }], { });
  },

  async down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
};
