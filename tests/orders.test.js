const request = require('supertest');
const app = require('../src/app');
const { calculateTotal, sortByNewest } = require('../src/orders');

describe('calculateTotal', () => {
  test('adds 10% tax to the subtotal', () => {
    expect(calculateTotal([{ price: 10, quantity: 2 }])).toEqual({ subtotal: 20, tax: 2, total: 22 });
  });
});

describe('sortByNewest', () => {
  test('returns orders newest first without mutating the input', () => {
    const input = [
      { id: 'old', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'new', createdAt: '2026-02-01T00:00:00Z' },
    ];
    expect(sortByNewest(input).map((o) => o.id)).toEqual(['new', 'old']);
    expect(input[0].id).toBe('old');
  });
});

describe('API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
  });

  test('GET /orders returns newest first', async () => {
    const res = await request(app).get('/orders');
    expect(res.body[0].id).toBe('A-1002');
  });

  test('POST /orders/quote prices a basket', async () => {
    const res = await request(app).post('/orders/quote').send({ items: [{ price: 15, quantity: 2 }] });
    expect(res.body.total).toBe(33);
  });

  test('POST /orders/quote rejects an empty basket', async () => {
    const res = await request(app).post('/orders/quote').send({ items: [] });
    expect(res.status).toBe(400);
  });
});
