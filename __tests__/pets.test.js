const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /pets should return a list of pets', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Redd',
        breed: 'Labradoodle',
        age: 2,
      },
      {
        id: '2',
        name: 'Bolt',
        breed: 'German Shepard mix',
        age: 3,
      },
      {
        id: '3',
        name: 'Baby Kitty',
        breed: 'Maine Coone',
        age: 12,
      },
      {
        id: '4',
        name: 'Romeo',
        breed: 'Goldendoodle',
        age: 9,
      },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
