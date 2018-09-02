import sequelize from '../data/sequelize';
import passport from '../passport';
import Post from '../data/models/Post';
import Vote from '../data/models/Vote';
import moment from 'moment';

export const createPost = async function(req, res) {
  const { user_id, title, body, is_anonymous } = req.body;

  var errorMessage = [];
  if (!user_id) {
    errorMessage.push('Missing user ID.');
  }

  if (!title || title.length == 0) {
    errorMessage.push('Missing title.');
  }

  if (!body || body.length == 0) {
    errorMessage.push('Missing body.');
  }

  if (errorMessage.length > 0) {
    return res.status(400).json({
      message: errorMessage
    });
  }

  try {
    let post = Post.build({
      user_id: user_id,
      title: title,
      body: body,
      is_anonymous: is_anonymous,
      created_at: moment(),
      updated_at: moment()
    });

    const newPost = await post.save();

    return res.send(newPost);
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

export const getPosts =  (req, res) => {
  passport.authenticate('jwt', { session: false })(req, res, async function () {
    const user_id = req.user.id;

    var errorMessage = [];
    if (!user_id) {
      errorMessage.push('Missing user ID.');
    }

    if (errorMessage.length > 0) {
      return res.status(400).json({
        message: errorMessage
      });
    }

    const postsForUsersCompanyQuery = `SELECT p.* FROM post p
      JOIN "user" all_users ON all_users.id = p.user_id
      JOIN company c ON c.id = all_users.company_id
      JOIN "user" logged_in_user ON logged_in_user.id = '${user_id}'
      WHERE logged_in_user.company_id = c.id;`;

    try {
      let posts = await sequelize.query(postsForUsersCompanyQuery, { type: sequelize.QueryTypes.SELECT })
      res.send(posts);
    } catch (err) {
      res.status(500).send({message: "Failed to find any posts."});
    }
  })
}

export const deletePost = async function(req, res) {
  const post_id = req.params.post_id;

  var errorMessage = [];
  if (!post_id) {
    errorMessage.push('Missing post ID.');
  }

  if (errorMessage.length > 0) {
    return res.status(400).json({
      message: errorMessage
    });
  }

  try {
    var result = await Post.destroy({ where: { id: post_id } });
    if (result) {
      return res.status(202).send();
    } else {
      return res.status(403).send({
        message: 'Could not find post to delete.'
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

export const voteOnPost = async function(req, res) {
  const post_id = req.params.post_id;

  const { user_id, direction } = req.body;

  var errorMessage = [];
  if (!user_id) {
    errorMessage.push('Missing user ID.');
  }

  if (!post_id) {
    errorMessage.push('Missing post ID.');
  }

  if (!direction) {
    errorMessage.push('Missing vote direction.');
  }

  let value;
  if (direction == 'UP') {
    value = 1;
  } else if (direction == 'DOWN') {
    value = -1;
  } else {
    errorMessage.push('Invalid choice for direction. Must be "UP" or "DOWN"');
  }
  if (errorMessage.length > 0) {
    return res.status(400).json({
      message: errorMessage
    });
  }

  try {
    let vote = Vote.build({
      user_id: user_id,
      post_id: post_id,
      value: value
    });

    const newVote = await vote.save();

    return res.send(newVote);
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};

export const unvotePost = async function(req, res) {
  const post_id = req.params.post_id;
  const { user_id, direction } = req.body;

  var errorMessage = [];

  if (!user_id) {
    errorMessage.push('Missing user ID.');
  }

  if (!post_id) {
    errorMessage.push('Missing post ID.');
  }

  if (errorMessage.length > 0) {
    return res.status(400).json({
      message: errorMessage
    });
  }

  try {
    var result = await Vote.destroy({
      where: { post_id: post_id, user_id: user_id }
    });
    if (result) {
      return res.status(202).send();
    } else {
      return res.status(403).send({
        message: 'Could not find vote to delete.'
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message
    });
  }
};
