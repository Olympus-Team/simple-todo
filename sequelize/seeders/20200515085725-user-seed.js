"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Phan Van Duc",
          password: "123456",
          email: "phanduc0908@gmail.com",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
