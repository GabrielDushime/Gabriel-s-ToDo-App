import request from 'supertest';
import { app } from '../../server';

describe('Todo API tests', () => {
  let token: string;
  let todoId: string;

  beforeAll(async () => {
    // Login user and obtain token
    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'password123' });
    token = response.body.token;
  });

  it('should create a new todo', async () => {
    const todoData = { title: 'Test Todo', description: 'Test Description' };
    const response = await request(app)
      .post('/todo')
      .set('Authorization', `Bearer ${token}`)
      .send(todoData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    todoId = response.body._id;
  });

  it('should get all todos', async () => {
    const response = await request(app)
      .get('/todo')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a todo', async () => {
    const updatedTodoData = { title: 'Updated Todo', description: 'Updated Description' };
    const response = await request(app)
      .put(`/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedTodoData);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTodoData.title);
    expect(response.body.description).toBe(updatedTodoData.description);
  });

  it('should delete a todo', async () => {
    const response = await request(app)
      .delete(`/todo/${todoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Todo deleted successfully');
  });
});
