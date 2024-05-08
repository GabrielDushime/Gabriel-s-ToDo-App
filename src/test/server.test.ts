import request from 'supertest'; // Importing 'request' from 'supertest' library
import { app } from '../../server'; // Importing 'app' from the server file

describe('Server', () => {
  it('should respond with status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with "Hello, world!"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toEqual('Hello, world!');
  });
});
