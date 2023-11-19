import SendOffer from '../models/send_offer.js';
import Property from '../models/properties.js';
import User from '../models/users.js';
import mongoose from "mongoose";


// Create a visit request
export async function createOffer(req, res) {
    try {
        const { _id, userID, offerPrice } = req.body;
        console.log(req.body);
        const propertyExists = await Property.findById(_id);
        const requesterExists = await User.findById(userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        if (!propertyExists || !requesterExists) {
            return res.status(404).json({ message: 'Property or requester not found' });
        }
        const sendOffer = new SendOffer({
            _id: new mongoose.Types.ObjectId(), 
            property: _id,
            requester: userID,
            Status: 'pending',
            amount: offerPrice,
        });
        await sendOffer.save();
        res.status(201).json(sendOffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create visit request' });
    }
}
// Approve a visit request
export async function AcceptOfferRequest(req, res) {
    try {
        const { offerId} = req.params; // Extract the visitRequestId from request parameters
        const offers = await SendOffer.findByIdAndUpdate(offerId, { 
            Status: 'accepted', 
            approvedDate: new Date(), // Set the approvedDate to the current date and time
        });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to approve visit request' });
    }
}

// Reject an offer
export async function RejectOfferRequest(req, res) {
    try {
        const { offerId } = req.params;
        const offers = await SendOffer.findByIdAndUpdate(offerId, {
            Status: 'rejected', 
            rejectedDate: new Date(), // Set the rejectedDate to the current date and time
        });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject visit request' });
    }
}