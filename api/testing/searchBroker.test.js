//References:
//https://jestjs.io/docs/getting-started
//https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
//https://medium.com/@it.ermias.asmare/node-js-express-with-jest-and-supertest-e58aaf4c4514
import request from 'supertest';
import express from 'express';
import  searchBrokers  from '../controllers/searchBroker.js';
import User from '../models/users.js';

//express app for testing
const app = express();
app.use(express.json());
app.post('/searchBrokers', searchBrokers);

//mock mongoose function
jest.mock('../models/users.js');

describe('Search Brokers Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return brokers with empty name search', async () => {
    // Arrange
    const mockResponse = [
      { name: 'Broker 1', role: 'broker' },
      { name: 'Broker 2', role: 'broker' },
    ];

    User.find.mockResolvedValueOnce(mockResponse);

    const response = await request(app)
      .post('/searchBrokers')
      .send({ name: '' })
      .expect(200);

    
    expect(response.body).toEqual({ response: mockResponse, popup: 'Good' });
  });

  it('should return brokers with name search', async () => {
    const mockResponse = [
      { name: 'Broker 1', role: 'broker' },
    ];

    User.find.mockResolvedValueOnce(mockResponse);

    const response = await request(app)
      .post('/searchBrokers')
      .send({ name: 'Broker' })
      .expect(200);

    
    expect(response.body).toEqual({ response: mockResponse, popup: 'Good' });
  });

  it('should handle errors and return 500 status', async () => {

    User.find.mockRejectedValueOnce(new Error('Database error'));

    const response = await request(app)
      .post('/searchBrokers')
      .send({ name: 'Broker' })
      .expect(500);

    expect(response.body).toEqual({ popup: 'Bad' });
  });
});
