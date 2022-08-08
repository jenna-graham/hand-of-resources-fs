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

  it('POST /ice_creams should create a new ice cream', async () => {
    const newCream = {
      name: 'Pot of Gold',
      rating: 5,
      favorite: true,
    };
    const res = await request(app).post('/ice_creams').send(newCream);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCream,
    });
  });

  it('PUT /ice_creams/:id should update existing ice cream', async () => {
    const res = await request(app).put('/ice_creams/5').send({
      rating: 4,
    });
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(4);
  });

  it('DELETE /ice_creams/:id should delete an ice cream', async () => {
    const res = await request(app).delete('/ice_creams/1');
    expect(res.status).toBe(200);
    const creamRes = await request(app).get('/ice_creams/1');
    expect(creamRes.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
