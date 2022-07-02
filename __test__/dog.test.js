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

describe('Get all dogs', () => {
  it('should get all dogs information if passed', async () => {
    const res = await request(app).get('/api/v1/dogs');

    expect(res.statusCode).toEqual(200);
  });
});

describe('Post a dog', () => {
  let dataId;
  let data = {
    dogName: 'testdog',
    dogPic: 'test.jpg',
    breeding: 'test',
    age: 1,
    commit: 'test',
  };
  it('should create a dog if passed', async () => {
    const res = await request(app).post('/api/v1/dogs').send(data);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.dog._id).not.toBe.null;
    expect(res.body.data.dog.dogName).toEqual(data.dogName);
    dataId = res.body.data.dog._id;
  });

  it('should update a dog if passed', async () => {
    let dataEdit = {
      dogName: 'testdog',
      dogPic: 'test.jpg',
      breeding: 'test',
      age: 1,
      commit: 'test',
    };
    const res = await request(app)
      .patch(`/api/v1/dogs/${dataId}`)
      .send(dataEdit);
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a dog if passed', async () => {
    const res = await request(app).delete(`/api/v1/dogs/${dataId}`).send('');

    expect(res.statusCode).toEqual(204);
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});
