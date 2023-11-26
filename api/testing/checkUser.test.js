import request from 'supertest';
import express from 'express';
import checkUser  from '../controllers/checkUser.js';
import User from '../models/users.js';

//express app for testing
const app = express();
app.use(express.json());
app.post('/checkUser', checkUser);

//mock mongoose functions
jest.mock('../models/users.js');

describe('Check User Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user role when user is found', async () => {
    
    const mockUser = { _id: 'someUserId', role: 'user' };
    User.findById.mockResolvedValueOnce(mockUser);

    
    const response = await request(app)
      .post('/checkUser')
      .send({ userID: 'someUserId' })
      .expect(200);

    expect(response.body).toEqual('user');
  });

  it('should handle "NOT SIGNED IN" when user is not found', async () => {
    
    User.findById.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/checkUser')
      .send({ userID: 'nonExistentUserId' })
      .expect(500);

    
    expect(response.body).toEqual({ popup: 'NOT SIGNED IN' });
  });

  it('should handle errors and return 500 status', async () => {
    
    User.findById.mockRejectedValueOnce(new Error('Database error'));

    
    const response = await request(app)
      .post('/checkUser')
      .send({ userID: 'someUserId' })
      .expect(500);

    expect(response.body).toEqual({ popup: 'NOT SIGNED IN' });
  });
});
