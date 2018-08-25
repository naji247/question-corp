'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('email_domain', 'company_id').then(
      () => queryInterface.addColumn('email_domain', 'company_id', {
        type: Sequelize.UUID,
        references: { model: 'company', key: 'id' },
        onDelete: 'cascade'
      })),
      queryInterface.removeColumn('vote', 'post_id').then(
        () => queryInterface.addColumn('vote', 'post_id', {
          type: Sequelize.UUID,
          references: { model: 'post', key: 'id' },
          onDelete: 'cascade'
        })),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('email_domain', 'company_id').then(
      () => queryInterface.addColumn('email_domain', 'company_id', {
        type: Sequelize.UUID,
        references: { model: 'company', key: 'id' },
      })),
      queryInterface.removeColumn('vote', 'post_id').then(
        () => queryInterface.addColumn('vote', 'post_id', {
          type: Sequelize.UUID,
          references: { model: 'post', key: 'id' },
        })),
    ]);
  }
};
