const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /ice_creams should return a list of ice_cream flavors', async () => {
    const res = await request(app).get('/ice_creams');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Sea Salt w/ Caramel Ribbons',
        rating: 5,
        favorite: true,
      },
      {
        id: '2',
        name: 'Arbequina Olive Oil',
        rating: 5,
        favorite: true,
      },
      {
        id: '3',
        name: 'Strawberry Honey Balsamic w/ Black Pepper',
        rating: 4,
        favorite: false,
      },
      {
        id: '4',
        name: 'Honey Lavender',
        rating: 4,
        favorite: true,
      },
      {
        id: '5',
        name: 'Pear & Blue Cheese',
        rating: 2,
        favorite: false,
      },
    ]);
  });

  it('GET /ice_creams/:id should return a single ice cream', async () => {
    const res = await request(app).get('/ice_creams/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      name: 'Sea Salt w/ Caramel Ribbons',
      rating: 5,
      favorite: true,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
