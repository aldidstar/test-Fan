"use strict";

"use strict";
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "Epresence", // table name
        "createdAt", // new field name
        {
          allowNull: false,
          type: Sequelize.DATE,
        }
      ),
      queryInterface.addColumn("Epresence", "updatedAt", {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn("Users", "linkedin"),
      queryInterface.removeColumn("Users", "twitter"),
      queryInterface.removeColumn("Users", "bio"),
    ]);
  },
};
