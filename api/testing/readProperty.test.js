import request from 'supertest';
import express from 'express';
import readProperty from '../controllers/readProperty.js';
import Property from '../models/properties.js';

//setup express app for testing
const app = express();
app.use(express.json());
app.get('/readProperty', readProperty);

//mock Property model
jest.mock('../models/properties.js', () => ({
  find: jest.fn(),
}));

describe('Read Property Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all properties successfully', async () => {
    //mocking data to be returned by the property model
    const mockProperties = [
      { _id: '1', name: 'Property 1' },
      { _id: '2', name: 'Property 2' },
    ];

    //mock the find method to return the mock data
    Property.find.mockResolvedValueOnce(mockProperties);

    // Make a request to the endpoint
    const response = await request(app).get('/readProperty');

    //check if the response status is 200
    expect(response.status).toBe(200);

    //check if the response body matches the mock data
    expect(response.body).toEqual(mockProperties);
  });

  it('should handle errors and return 500 status', async () => {
    //mock an error to be thrown by the Property model
    const mockError = new Error('Database error');

    //mock the find method to throw an error
    Property.find.mockRejectedValueOnce(mockError);

    //make a request to the endpoint
    const response = await request(app).get('/readProperty');

    //check if the response status is 500
    expect(response.status).toBe(500);

    //check if the response body contains the error message
    expect(response.body).toEqual({ error: 'Database error' });
  });
});
