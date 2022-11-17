const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Test Users Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testUser = {
    email: 'hank@email.com',
    password: 'hankypanky',
  };

  it('POST /user should create a new user', async () => {
    const response = await request(app).post('/api/v1/users').send(testUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      email: testUser.email,
    });
  });
  it('POST /session should log in a user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const response = await request(app)
      .post('/api/v1/users/sessions')
      .send(testUser);
    expect(response.status).toBe(200);
  });
  afterAll(() => {
    pool.end();
  });
});
