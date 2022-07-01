const app = require('../app');
const request = require('supertest');

jest.setTimeout(10000);

describe('dogs', () => {
  it('should get all dogs information if passed', async () => {
    //const res = await request('http://localhost:3001/api/v1/dogs').get('/');
    const res = await request(app).get('/api/v1/dogs/');
    const response = [
      {
        dogName: 'a',
        age: 1,
        breeding: 'unknown',
        dogPic: 'a.jpg',
        comment: 'test',
        createDate: '2022-06-30',
        _id: '1',
        slug: 'abc',
      },
    ];
    expect(res.statusCode).toEqual(200);
  });

  //   it('returns error', async () => {
  //     const res = await request('http://localhost:3001/api/v1/dogs').get('/');
  //     expect(res.statusCode).toEqual(400);
  //     expect(res.body).toEqual('err');
  //   });
});
