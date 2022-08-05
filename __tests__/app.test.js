const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /crystals should return a list of crystals', async () => {
    const res = await request(app).get('/crystals');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: '1',
        name: 'Snowflake Obsidian',
        color: 'black/white',
        zodiac: 'Virgo',
        properties: 'purity and balance',
      },
      {
        id: '2',
        name: 'Amethyst',
        color: 'purple',
        zodiac: 'Capricorn',
        properties: 'spirituality and meditation',
      },
      {
        id: '3',
        name: 'Carnelean',
        color: 'red',
        zodiac: 'Taurus',
        properties: 'stabilizing energies',
      },
      {
        id: '4',
        name: 'Malachite',
        color: 'green',
        zodiac: 'Scorpio',
        properties: 'transformations',
      },
      {
        id: '5',
        name: 'Moonstone',
        color: 'beige',
        zodiac: 'Libra',
        properties: 'new beginnings and confidence',
      },
    ]);
  });

  it('GET crystals/:id should return a single crystal', async () => {
    const res = await request(app).get('/crystals/4');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '4',
      name: 'Malachite',
      color: 'green',
      zodiac: 'Scorpio',
      properties: 'transformations',
    });
  });

  it('POST /crystals should create a new crystal', async () => {
    const newCrystal = {
      name: 'Citrine',
      color: 'yellow',
      zodiac: 'Aries',
      properties: 'attracts and maintains wealth',
    };
    const res = await request(app).post('/crystals').send(newCrystal);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newCrystal,
    });
  });

  it('PUT /crystals/:id should update an existing crystal', async () => {
    const res = await request(app).put('/crystals/4').send({
      color: 'dark green',
    });
    expect(res.status).toBe(200);
    expect(res.body.color).toBe('dark green');
  });
  afterAll(() => {
    pool.end();
  });
});
