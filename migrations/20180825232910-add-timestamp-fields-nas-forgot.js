'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('vote', 'created_at', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('vote', 'updated_at', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('vote', 'created_at'),
      queryInterface.removeColumn('vote', 'updated_at'),
    ]);
  }
};
