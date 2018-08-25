//routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
export const auth = express.Router();
import config from '../config';
import User from '../data/models/User';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import EmailDomain from '../data/models/EmailDomain'

/* POST login. */

const authenticate = (req, res, err, user, info) => {
  if (err) {
    return res.status(500).json({
      message: err.message
    });
  }

  if (!user) {
    return res.status(400).json({
      message: 'Incorrect email or password.'
    });
  }

  req.login(user, { session: false }, err => {
    if (err) {
      res.status(500).send(err);
    }

    // generate a signed son web token with the contents of user object and return it in the response
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.auth.jwt.secret,
      { expiresIn: '10h' }
    );

    const noPasswordUser = _.omit(user.dataValues, [
      'emailConfirmed',
      'password'
    ]);
    return res.json({ ...noPasswordUser, token });
  });
};

auth.post('/signup', async function(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  let domain;
  let errorMessage = [];

  if (!firstName)
    errorMessage.push('Missing first name.');

  if (!lastName)
    errorMessage.push('Missing last name.');

  if (!email) {
    errorMessage.push('Missing email.');
  } else {
    domain = getEmailParts(email).domain;
  }

  if (!domain) {
    errorMessage.push('Email is missing a valid domain.');
    return res.status(400).json({
      message: errorMessage
    });
  }

  let foundDomains = await EmailDomain.findAll({
    where: {
      domain_name: domain
    }
  });

  let foundDomain = _.first(foundDomains);

  if (!foundDomain || !foundDomain.company_id) {
    errorMessage.push('Your email domain is not associated with a company yet.');
    return res.status(400).json({
      message: errorMessage
    });
  }

  let companyId = foundDomain.company_id;

  if (!password) {
    errorMessage.push('Missing password.');
  }

  if (errorMessage.length > 0) {
    return res.status(400).json({
      message: errorMessage
    });
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = User.build({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      company_id: companyId,
      created_at: moment(),
      updated_at: moment()
    });

    const newUser = await user.save();

    await authenticate(req, res, null, newUser, null);
  } catch (err) {
    if (
      err.original &&
      err.original.code == 23505 &&
      err.original.constraint === 'User_email_key'
    ) {
      return res.status(409).send({
        message: `User with the email ${email} already exists.`
      });
    }
    return res.status(500).send({
      message: err.message
    });
  }
});

auth.post('/login', function(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    return authenticate(req, res, err, user, info);
  })(req, res);
});

function getEmailParts( strEmail ){
  // Set up a default structure with null values
  // incase our email matching fails.
  var objParts = {
    user: null,
    domain: null,
    ext: null
  };

  // Get the parts of the email address by leveraging
  // the String::replace method. Notice that we are
  // matching on the whole string using ^...$ notation.
  strEmail.replace(
    new RegExp( "^(.+)@(.+)\\.(\\w+)$" , "i" ),

    // Send the match to the sub-function.
    function( $0, $1, $2, $3 ){
      objParts.user = $1;
      objParts.domain = `${$2}.${$3}`;
      objParts.ext = $3;
    }
  );

  // Return the "potentially" updated parts structure.
  return( objParts );
}
