/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import DataType from 'sequelize';
import Model from '../sequelize';

const Vote = Model.define(
  'vote',
  {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV1,
      primaryKey: true,
    },

    user_id: {
      type: DataType.UUID,
      references: { model: 'user', key: 'id' },
      allowNull: false
    },

    post_id: {
      type: DataType.UUID,
      references: { model: 'post', key: 'id'},
      allowNull: false
    },

    value: {
      type: DataType.INTEGER,
      allowNull: false
    },

    createdAt: {
      type: DataType.DATE,
      field: 'created_at',
    },

    updatedAt: {
      type: DataType.DATE,
      field: 'updated_at',
    },
  }
);

export default Vote;
