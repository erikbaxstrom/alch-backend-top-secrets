const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const { response } = require('../lib/app');

async function createSignIn(testUser) {
  const agent = request.agent(app);
  // create test user
  await request(app).post('/api/v1/users/sessions').send(testUser);
  // sign in test user
  await agent.post('/api/v1/users/sessions').send(testUser);
  return agent;
}

describe('Test Users Routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const testUser = {
    email: 'hank@email.com',
    password: 'hankypanky',
  };

  it('GET /secrets should return a list of secrets for authenticated users', async () => {
    const agent = await createSignIn(testUser);

    // get secrets
    const response = await agent.get('/api/v1/secrets');
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
          'Bobby was eating Skittles at the basketball game and he dropped one. I asked if he was going to eat it. He said no thats gross the bleachers are never cleaned. So I picked it up and ate it -- AND IT WAS AN M&M!!!',
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

  it.skip('GET /secrets should bounce users who are not logged in', async () => {
    const agent = request.agent(app);
    // create test user
    await request(app).post('/api/v1/users/sessions').send(testUser);
    // get secrets
    const response = await agent.get('/api/v1/secrets');
    console.log('response body::', response.body);
    expect(response.status).toBe(401);
  });

  afterAll(() => {
    pool.end();
  });
});
