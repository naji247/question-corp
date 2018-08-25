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

const Post = Model.define('post', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },

  user_id: {
    type: DataType.UUID,
    references: { model: 'user', key: 'id' }
  },

  title: {
    type: DataType.STRING(255),
    allowNull: false
  },

  body: {
    type: DataType.TEXT('long'),
    allowNull: false
  },

  is_anonymous: {
    type: DataType.BOOLEAN,
    defaultValue: false
  },

  created_at: {
    allowNull: false,
    type: DataType.DATE
  },

  updated_at: {
    allowNull: false,
    type: DataType.DATE
  }
});

export default Post;
