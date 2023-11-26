import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { readVisitRequest } from '../controllers/readVisitRequest.js';
import VisitRequest from '../models/visit_requests.js'; 


const app = express();
app.use(express.json());
app.get('/readVisitRequest/:visitRequestId', readVisitRequest);

//mock mongoose functions
jest.mock('mongoose');

//mock VisitRequest model
jest.mock('../models/visit_requests.js', () => ({
  findById: jest.fn(),
}));

describe('Read Visit Request Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a visit request by ID', async () => {
    const mockVisitRequestId = mongoose.Types.ObjectId();
    const mockVisitRequest = {
      _id: mockVisitRequestId,
  
    };

    VisitRequest.findById.mockResolvedValueOnce(mockVisitRequest);

    const response = await request(app).get(`/readVisitRequest/${mockVisitRequestId}`).expect(200);

    expect(response.body).toEqual(mockVisitRequest);
  });

  it('should return 404 if visit request is not found', async () => {
    const nonExistentVisitRequestId = mongoose.Types.ObjectId();
    VisitRequest.findById.mockResolvedValueOnce(null);

    const response = await request(app).get(`/readVisitRequest/${nonExistentVisitRequestId}`).expect(404);

    expect(response.body).toEqual({ message: 'Visit request not found' });
  });

  it('should handle errors and return 500 status with error message', async () => {
    const mockVisitRequestId = mongoose.Types.ObjectId();
    const errorMessage = 'Database error';
    VisitRequest.findById.mockRejectedValueOnce(new Error(errorMessage));
  
    const response = await request(app).get(`/readVisitRequest/${mockVisitRequestId}`).expect(500);
  
    expect(response.body).toEqual({ message: 'Failed to retrieve visit request', error: errorMessage });
  });
});
