import express from 'express';
import * as usersApi from './users';
import * as postsApi from './posts';
export const api = express.Router();

// User routes
api.route('/users/:user_id').get(usersApi.getUserInfo);

// Post routes
api.route('/post').post(postsApi.createPost);
api.route('/post/:post_id').delete(postsApi.deletePost);

// Vote routes
api.route('/post/:post_id/vote').post(postsApi.voteOnPost);
api.route('/post/:post_id/vote').delete(postsApi.unvotePost);
