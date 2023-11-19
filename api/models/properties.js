  // reference for schema : https://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["house", "apartment", "condo"],
        required: true,
    },
    location: {
        type: String,
        enum: ["Downtown", "Griffintown", "Mont-Royal","Saint-Laurent","NDG","Angrignon","Mile-End"],
        required: true
    },
    price: {
        type: String,
        required: true
    },
    area: {
        type: String,
        enum: ["500-1000 sqft", "1000-1500 sqft", "1500-1800 sqft","1800+ sqft"],
        required: true
    },
    bedroom: {
        type: String,
        enum: ["1 bedroom", "2 bedrooms", "3+ bedrooms"],
        required: true
    },
    bathroom: {
        type: String,
        enum: ["1 bathroom", "2 bathrooms", "3+ bathrooms"],
        required: true
    },
    status: {
        type: String,
        enum: ["for_sale", "for_rent"],
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    broker: {   //  relationship between properties and brokers
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
});

export default mongoose.model("properties", PropertySchema);