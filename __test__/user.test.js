const app = require('../app');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { resolveHostname } = require('nodemailer/lib/shared');

//jest.setTimeout(5000);

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

describe('Get all users', () => {
  it('should get all users information if passed', async () => {
    const res = await request(app).get('/api/v1/cws');

    expect(res.statusCode).toEqual(200);
  });
});

describe('Post a user', () => {
  let dataId;
  let data = {
    name: 'test1',
    email: 'test1@gmail.com',
    password: 'Admin000',
    passwordConfirm: 'Admin000',
    role: 'admin',
  };
  it('should create a user if passed', async () => {
    const res = await request(app).post('/api/v1/cws').send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.cw._id).not.toBe.null;
    expect(res.body.data.cw.email).toEqual(data.email);
    dataId = res.body.data.cw._id;
  });

  it('should update a user if passed', async () => {
    let dataEdit = {
      name: 'test1',
      email: 'test1@gmail.com',
      password: 'Admin000',
      // passwordConfirm: 'Admin000',
      role: 'admin',
    };
    const res = await request(app)
      .patch(`/api/v1/cws/${dataId}`)
      .send(dataEdit);
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a user if passed', async () => {
    const res = await request(app).delete(`/api/v1/cws/${dataId}`).send('');

    expect(res.statusCode).toEqual(204);
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
