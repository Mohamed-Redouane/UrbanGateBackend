import VisitRequest from '../models/visit_requests.js';
import Property from '../models/properties.js';
import User from '../models/users.js';
import mongoose from "mongoose";

// Create a visit request
export async function createVisitRequest(req, res) {
    try {
        const { _id, userID, selectedDate } = req.body;
        const propertyExists = await Property.findById(_id);
        const requesterExists = await User.findById(userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        if (!propertyExists || !requesterExists) {
            return res.status(404).json({ message: 'Property or requester not found' });
        }
        const requestedDate = new Date(selectedDate);
        if (requestedDate <= new Date()) {
            return res.status(400).json({ message: 'Requested date must be in the future' });
        }
        const visitRequest = new VisitRequest({
            _id: new mongoose.Types.ObjectId(), 
            property: _id,
            requester: userID,
            Status: 'pending',
            requestedDate: requestedDate,
        });
        await visitRequest.save();
        res.status(201).json(visitRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create visit request' });
    }
}

// Approve a visit request
export async function AcceptVisitRequest(req, res) {
    try {
        const { visitRequestId } = req.params; // Extract the visitRequestId from request parameters
        const visitRequest = await VisitRequest.findByIdAndUpdate(visitRequestId, { 
            Status: 'accepted', 
            approvedDate: new Date(), // Set the approvedDate to the current date and time
        });

        res.status(200).json(visitRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to approve visit request' });
    }
}

// Reject a visit request
export async function RejectVisitRequest(req, res) {
    try {
        const { visitRequestId } = req.params;
        const visitRequest = await VisitRequest.findByIdAndUpdate(visitRequestId, {
            Status: 'rejected', 
            rejectedDate: new Date(), // Set the rejectedDate to the current date and time
        });
        res.status(200).json(visitRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject visit request' });
    }
}
