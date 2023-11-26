import request from 'supertest'; 
import express from 'express';
import createUser from '../controllers/createUser.js'; 
import User from '../models/users.js'; 
import bcrypt from 'bcrypt';

//Mock the User model
jest.mock('../models/users.js');

//Mock the bcrypt.hash function
jest.mock('bcrypt', () => ({
  hash: jest.fn(async (password, saltRounds) => `hashed_${password}`),
}));

//Create an express app for testing
const app = express();
app.use(express.json());
app.post('/createUser', createUser);

describe('POST /createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks(); 
        User.findOne.mockReset(); 
        User.mockClear(); 
        User.prototype.save.mockReset(); 
      });
  it('should create a new user', async () => {
    //Mocking findOne to return null to indicate that the email is not already in use
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/createUser')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'homebuyer',
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.popup).toBe('Successfully created user');
  
      //verify that User.findOne was called with the correct arguments
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  
      //verify that the User constructor was called with the correct arguments
      expect(User).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password123',
        role: 'homebuyer',
      });
  
      // Verify that user.save() was called
      expect(User.prototype.save).toHaveBeenCalled();
    });
  
    it('should return an error if the email is already in use', async () => {
      // Mock findOne to return an existing user
      User.findOne.mockResolvedValue({});
  
      const response = await request(app)
        .post('/createUser')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'homebuyer',
        });
  
      expect(response.statusCode).toBe(400);
      expect(response.body.popup).toBe('This email already has an associated account');
  
      // Verify that User.findOne was called with the correct arguments
      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  
      // Verify that User was not called (no new user should be created)
      expect(User).not.toHaveBeenCalled();
  
      // Verify that user.save() was not called
      expect(User.prototype.save).not.toHaveBeenCalled();
    });
  });