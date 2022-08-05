const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Get /songs should return a list of songs', async () => {
    const res = await request(app).get('/songs');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        id: '1',
        title: 'Is It a Crime?',
        artist: 'Sade',
        released: 1985,
      },
      {
        id: '2',
        title: 'Say Yes',
        artist: 'Floetry',
        released: 2002,
      },
      {
        id: '3',
        title: 'Call My Name',
        artist: 'Prince',
        released: 2004,
      },
      {
        id: '4',
        title: 'Eternal Light',
        artist: 'Free Nationals',
        released: 2019,
      },
      {
        id: '5',
        title: 'Orange Moon',
        artist: 'Erykah Badu',
        released: 2000,
      },
      {
        id: '6',
        title: 'Gaze',
        artist: 'Sweetback',
        released: 1996,
      },
    ]);
  });

  it('GET /songs/:id should return a single song', async () => {
    const res = await request(app).get('/songs/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: '1',
      title: 'Is It a Crime?',
      artist: 'Sade',
      released: 1985,
    });
  });

  it('POST /songs should create a new song', async () => {
    const newSong = {
      title: 'The Seed',
      artist: 'The Roots',
      released: 2002,
    };
    const res = await request(app).post('/songs').send(newSong);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newSong,
    });
  });

  it('PUT /songs/:id should update an existing song', async () => {
    const res = await request(app).put('/songs/6').send({
      released: 1997,
    });
    expect(res.status).toBe(200);
    expect(res.body.released).toBe(1997);
  });

  afterAll(() => {
    pool.end();
  });
});
