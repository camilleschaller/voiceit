const { expect } = require('chai');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../config.js');
const supertest = require('supertest');

mongoose.connect(config.databaseUrl, {
    useCreateIndex: true
});

describe('POST /users', function () {
    it('should create a user', async function () {

        const res = await supertest(app)
            .post('/users')
            .send({
                pseudo: 'John Doe',
                password: '1234',
                mail: 'test@test.com'
            })
            .expect(200)
            .expect('Content-Type', /json/);

    });
});

describe('POST /subjects', function () {
    it('should create a subject', async function () {

        const res = await supertest(app)
            .post('/subjects')
            .send({
                title: 'testTitle', 
                description: 'descriptionTest',
                userId: 'thisIsAUserId'
            })
            .expect(200)
            .expect('Content-Type', /json/);

    });
});

describe('POST /notes', function () {
    it('should create a note', async function () {

        const res = await supertest(app)
            .post('/subjects')
            .send({
                title: 'testTitle', 
                text: 'textTest',
                subjectId: 'thisIsASubjectId'
            })
            .expect(200)
            .expect('Content-Type', /json/);

    });
});

after(mongoose.disconnect);