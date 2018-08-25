'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('post', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.UUID,
        references: { model: 'user', key: 'id' }
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      body: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },

      is_anonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    }).then(() => queryInterface.createTable('vote', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUID,
          primaryKey: true,
        },

        user_id: {
          type: Sequelize.UUID,
          references: { model: 'user', key: 'id' },
          allowNull: false
        },

        post_id: {
          type: Sequelize.UUID,
          references: { model: 'post', key: 'id'},
          allowNull: false
        },

        value: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vote').then(() => {
      return queryInterface.dropTable('post');
    });
  }
};
