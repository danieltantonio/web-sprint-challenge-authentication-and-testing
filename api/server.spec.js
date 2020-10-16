const server = require('./server');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('./config');

describe('server.js', () => {
    describe('POST /api/auth/register', () => {
        it('can successfully create a user returning 201', () => {
            supertest(server)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpassword' })
            .set('Accept', 'application/json')
            .set('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.username).toMatch('testuser');
            })
        })

        it('will return a 400 if user info is missing', () => {
            supertest(server)
            .post('/api/auth/register')
            .send({ username: 'testuser' })
            .set('Accept', 'application/json')
            .set('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(400);
            })
        })
    })

    describe('POST /api/auth/login', () => {
        it('can successfuly login a user returning 202', () => {
            supertest(server)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' })
            .set('Accept', 'application/json')
            .set('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(202);
            })
        })

        it('will return a 400 if user info is missing', () => {
            supertest(server)
            .post('/api/auth/login')
            .send({ username: 'testuser' })
            .set('Accept', 'application/json')
            .set('Content-Type', /json/)
            .then(res => {
                expect(res.status).toBe(400);
            })
        })
    })

    describe('GET /api/jokes', () => {
        it('will return a 401 if no token is provided', () => {
            supertest(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401)
            })
        })

        it('will return jokes if token is provided with status 200', () => {
            const token = jwt.sign({ username: 'testusername', password: 'testpassword' }, config.jwtSecret, { expiresIn: '1hr' });

            supertest(server)
            .get('/api/jokes')
            .send(`Authorization=${token}`)
            .set('Accept', 'application-json')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})