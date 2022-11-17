const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { response } = require('../lib/app');

describe('Test Users Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testUser = {
    email: 'hank@email.com',
    password: 'hankypanky',
  };

  it('', async () => {
    const agent = request.agent(app);
    // create test user
    await request(app).post('/api/v1/users/sessions').send(testUser);
    // sign in test user
    await agent.post('/api/v1/users/sessions').send(testUser);
    const response = await agent.get('/secrets');
    const expectedResponse = [
      {
        title: 'Favorite Colors',
        description: 'Purple, red, chartreuse',
        createdAt: expect.any(String),
      },
      {
        title: 'Evan',
        description:
          'Evan stole my snack pack today at lunch, and it was not nice. He is such a meanie.',
        createdAt: expect.any(String),
      },
      {
        title: 'M&M',
        description:
          'Bobby was eating Skittles at the basketabll game and he dropped one. I asked if he was going to eat it. He said no thats gross the bleachers are never cleaned. So I picked it up and ate it -- AND IT WAS AN M&M!!!',
        createdAt: expect.any(String),
      },
      {
        title: 'Christmas',
        description:
          'I saw mommy kissing santa clause. Daddy is gonna be sooooo mad. ',
        createdAt: expect.any(String),
      },
    ];
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  afterAll(() => {
    pool.end();
  });
});
