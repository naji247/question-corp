'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('company', 'email_domains')
      .then(()=> queryInterface.createTable('email_domain', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUID,
            primaryKey: true,
          },

          company_id: {
            type: Sequelize.UUID,
            references: { model: 'company', key: 'id' }
          },

          domain_name: {
            type: Sequelize.STRING(255),
            allowNull: false
          },

          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },

          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        })
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('email_domain').then(
      () => queryInterface.addColumn('company', 'email_domains', { type: Sequelize.JSON }));
  }
};
