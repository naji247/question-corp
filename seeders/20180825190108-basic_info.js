'use strict';

const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var tonyID = uuidv4();
    var buckyID = uuidv4();
    var thorID = uuidv4();
    var starkIndustriesID = uuidv4();
    var asgardID = uuidv4();
    var tonyPostID1 = uuidv4();
    var tonyPostID2 = uuidv4();
    var buckyPostID1 = uuidv4();

    return queryInterface
      .bulkInsert('company', [
        {
          id: starkIndustriesID,
          name: 'Stark Industries',
          created_at: moment().toDate(),
          updated_at: moment().toDate()
        },
        {
          id: asgardID,
          name: 'AsgardCoin',
          created_at: moment().toDate(),
          updated_at: moment().toDate()
        }
      ])
      .then(() => {
        return queryInterface.bulkInsert('email_domain', [
          {
            id: uuidv4(),
            company_id: asgardID,
            domain_name: 'asgard.io',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: uuidv4(),
            company_id: starkIndustriesID,
            domain_name: 'starkindustries.com',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: uuidv4(),
            company_id: starkIndustriesID,
            domain_name: 'starkindustries2.com',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          }
        ]);
      })
      .then(() => {
        return bcrypt.hash('password', 10);
      })
      .then(hashedPassword => {
        return queryInterface.bulkInsert('user', [
          {
            id: tonyID,
            password: hashedPassword,
            email: 'iamironman@starkindustries.com',
            email_confirmed: true,
            first_name: 'Tony',
            last_name: 'Stark',
            phone_number: '5551234567',
            role: 'admin',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: buckyID,
            password: hashedPassword,
            email: 'notironman@starkindustries2.com',
            email_confirmed: true,
            first_name: 'Bucky',
            last_name: 'Barnes',
            phone_number: '5554561234',
            role: 'employee',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: thorID,
            password: hashedPassword,
            email: 'godofthunder@asgard.io',
            email_confirmed: true,
            first_name: 'Thor',
            last_name: 'Odinson',
            phone_number: '5557892345',
            role: 'employee',
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          }
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('post', [
          {
            id: tonyPostID1,
            user_id: tonyID,
            title: 'Loki sucks',
            body:
              'How many redemption arcs can a single character go through before the audience gets fed up with the screenwriting?',
            is_anonymous: false,
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: tonyPostID2,
            user_id: tonyID,
            title: 'Tony Stark is Amazing',
            body:
              'Has anyone else noticed how cool Tony Stark looks with his douchey sunglasses? And he is Iron Man? Incredible',
            is_anonymous: true,
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          },
          {
            id: buckyPostID1,
            user_id: buckyID,
            title: 'Hydra did nothing wrong',
            body:
              'I think that the media has really skewed popular perception of the involvement of Hydra in a lot of recent events lately.',
            is_anonymous: false,
            created_at: moment().toDate(),
            updated_at: moment().toDate()
          }
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('vote', [
          {
            id: uuidv4(),
            user_id: tonyID,
            post_id: buckyPostID1,
            value: -1
          },
          {
            id: uuidv4(),
            user_id: tonyID,
            post_id: tonyPostID2,
            value: 1
          },
          {
            id: uuidv4(),
            user_id: buckyID,
            post_id: tonyPostID1,
            value: 1
          },
          {
            id: uuidv4(),
            user_id: buckyID,
            post_id: tonyPostID2,
            value: 1
          }
        ]);

        //   return Promise.all([
        //     queryInterface.bulkInsert('user', [
        //       {
        //         id: tonyID,
        //         password: hashedPassword,
        //         email: 'iamironman@starkindustries.com',
        //         email_confirmed: true,
        //         first_name: 'Tony',
        //         last_name: 'Stark',
        //         phone_number: '5551234567',
        //         role: 'admin',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: buckyID,
        //         password: hashedPassword,
        //         email: 'notironman@starkindustries2.com',
        //         email_confirmed: true,
        //         first_name: 'Bucky',
        //         last_name: 'Barnes',
        //         phone_number: '5554561234',
        //         role: 'employee',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: thorID,
        //         password: hashedPassword,
        //         email: 'godofthunder@asgard.io',
        //         email_confirmed: true,
        //         first_name: 'Thor',
        //         last_name: 'Odinson',
        //         phone_number: '5557892345',
        //         role: 'employee',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       }
        //     ]),
        //     queryInterface.bulkInsert('company', [
        //       {
        //         id: starkIndustriesID,
        //         name: 'Stark Industries',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: asgardID,
        //         name: 'AsgardCoin',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       }
        //     ]),
        //     queryInterface.bulkInsert('email_domain', [
        //       {
        //         id: uuidv4(),
        //         company_id: asgardID,
        //         domain_name: 'asgard.io',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: uuidv4(),
        //         company_id: starkIndustriesID,
        //         domain_name: 'starkindustries.com',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: uuidv4(),
        //         company_id: starkIndustriesID,
        //         domain_name: 'starkindustries2.com',
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       }
        //     ]),
        //     queryInterface.bulkInsert('post', [
        //       {
        //         id: tonyPostID1,
        //         user_id: tonyID,
        //         title: 'Loki sucks',
        //         body:
        //           'How many redemption arcs can a single character go through before the audience gets fed up with the screenwriting?',
        //         is_anonymous: false,
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: tonyPostID2,
        //         user_id: tonyID,
        //         title: 'Tony Stark is Amazing',
        //         body:
        //           'Has anyone else noticed how cool Tony Stark looks with his douchey sunglasses? And he is Iron Man? Incredible',
        //         is_anonymous: true,
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       },
        //       {
        //         id: buckyPostID1,
        //         user_id: buckyID,
        //         title: 'Hydra did nothing wrong',
        //         body:
        //           'I think that the media has really skewed popular perception of the involvement of Hydra in a lot of recent events lately.',
        //         is_anonymous: false,
        //         created_at: moment().toDate(),
        //         updated_at: moment().toDate()
        //       }
        //     ]),
        //     queryInterface.bulkInsert('vote', [
        //       {
        //         id: uuidv4(),
        //         user_id: tonyID,
        //         post_id: buckyPostID1,
        //         value: -1
        //       },
        //       {
        //         id: uuidv4(),
        //         user_id: tonyID,
        //         post_id: tonyPostID2,
        //         value: 1
        //       },
        //       {
        //         id: uuidv4(),
        //         user_id: buckyID,
        //         post_id: tonyPostID1,
        //         value: 1
        //       },
        //       {
        //         id: uuidv4(),
        //         user_id: buckyID,
        //         post_id: tonyPostID2,
        //         value: 1
        //       }
        //     ])
        //   ]);
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkDelete('vote')
      .then(() => {
        return queryInterface.bulkDelete('post');
      })
      .then(() => {
        return queryInterface.bulkDelete('user');
      })
      .then(() => {
        return queryInterface.bulkDelete('email_domain');
      })
      .then(() => {
        return queryInterface.bulkDelete('company');
      });

    // Promise.all([
    //   queryInterface.bulkDelete('user'),
    //   queryInterface.bulkDelete('company'),
    //   queryInterface.bulkDelete('email_domain'),
    //   queryInterface.bulkDelete('post'),
    //   queryInterface.bulkDelete('votes')
    // ]);
  }
};
