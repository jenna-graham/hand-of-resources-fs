const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /animals should return a list of animals', async () => {
    const res = await request(app).get('/animals');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        type: 'tiger',
        color: 'orange and black',
        origin: 'China',
      },
      {
        id: '2',
        type: 'sloth',
        color: 'light brown',
        origin: 'South America',
      },
      {
        id: '3',
        type: 'alligator',
        color: 'green',
        origin: 'North America',
      },
      {
        id: '4',
        type: 'gorilla',
        color: 'black',
        origin: 'Africa',
      },
      {
        id: '5',
        type: 'flamingo',
        color: 'pink',
        origin: 'Africa, Asia, Europe',
      },
    ]);
  });

  it('GET /animals/:id should return a single animal', async () => {
    const res = await request(app).get('/animals/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      type: 'tiger',
      color: 'orange and black',
      origin: 'China',
    });
  });

  it('POST /animals should create a new animal', async () => {
    const newAnimal = {
      type: 'giraffe',
      color: 'yellow',
      origin: 'Africa',
    };
    const res = await request(app).post('/animals').send(newAnimal);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newAnimal,
    });
  });

  it('PUT /animals/:id should update an existing animal', async () => {
    const res = await request(app).put('/animals/2').send({
      color: 'brown',
    });
    expect(res.status).toBe(200);
    expect(res.body.color).toBe('brown');
  });

  afterAll(() => {
    pool.end();
  });
});
