'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('company', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
          primaryKey: true
        },

        name: {
          type: Sequelize.STRING(255),
          allowNull: false
        },

        email_domains: {
          type: Sequelize.JSON
        },

        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },

        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        Promise.all([
          queryInterface.addColumn('user', 'role', {
            type: Sequelize.STRING(255),
            defaultValue: 'employee'
          }),
          queryInterface.addColumn('user', 'company_id', {
            type: Sequelize.UUID,
            references: { model: 'company', key: 'id' }
          })
        ])
      );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('user', 'role'),
      queryInterface.removeColumn('user', 'company_id')
    ]).then(() => queryInterface.dropTable('company'));
  }
};
