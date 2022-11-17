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

  it('', async () => {
    //test
  });

  afterAll(() => {
    pool.end();
  });
});
