import mongoose from "mongoose";// send an offer

const send_OfferSchema = new mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    amount:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        default: "pending",
        enum: ["pending","approved","rejected"],
        required: true,
        },
   
    requestedDate: {
        type: Date,
        default: Date.now,
    },
    approvedDate: {
        type: Date,
    },
    
    rejectedDate: {
        type: Date,
    },

});

export default mongoose.model("Send Offer",send_OfferSchema);


