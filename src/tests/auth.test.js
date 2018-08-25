import Company from "../data/models/Company";

const request = require('supertest');
const express = require('express');
import { auth } from '../auth/index';
import chai from 'chai';
import bodyParser from 'body-parser';
import User from '../data/models/User'
import truncate from "./helpers/truncate";
import EmailDomain from "../data/models/EmailDomain";

// import app from '../server';
const app = express();
app.use(bodyParser.json());

// Set route here
app.use('/auth', auth);
let expect = chai.expect;

describe('Auth API Test', () => {

  beforeEach(async () => {
    await truncate();
    let company = await Company.create({
      name: 'Google',
    });
    let domain = await EmailDomain.create({
      company_id: company.id,
      domain_name: 'gmail.com'
    });
  });

  it('can sign up valid users', async (done) => {
    request(app).post('/auth/signup')
      .send({
        firstName: "Naseem",
        lastName: "Al-Naji",
        email: "fakeemail@gmail.com",
        password: "password"
      })
      .set('Accept', /application\/json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('rejects users without first name', async (done) => {
    request(app).post('/auth/signup')
      .send({
        lastName: "Al-Naji",
        email: "fakeemail@gmail.com",
        password: "password"
      })
      .set('Accept', /application\/json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        // expect(res.message).to.equal('iejfowiej');
        done();
      });
  });

  it('rejects users without email', async (done) => {
    request(app).post('/auth/signup')
      .send({
        firstName: "Naseem",
        lastName: "Al-Naji",
        password: "password"
      })
      .set('Accept', /application\/json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('rejects users without last name', async (done) => {
    request(app).post('/auth/signup')
      .send({
        firstName: "Naseem",
        email: "fakeemail@gmail.com",
        password: "password"
      })
      .set('Accept', /application\/json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
  afterEach(async () => {
    await truncate();
  });
});
