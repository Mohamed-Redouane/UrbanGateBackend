// reference for schema : https://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["homebuyer", "renter", "broker", "admin"],
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },
    ownedProperties: [{                         //each user can own multiple properties.
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }],
})


export default mongoose.model('User', usersSchema);