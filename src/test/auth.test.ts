import request from 'supertest';
import { app } from '../../server';

describe('Authentication API tests', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', password: 'password123' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
