import Property from '../models/properties.js';

export default async function readPropertiesForUser(req, res) {
    try {
        const brokerId = req.params.brokerId; // retreives the brokerId
        const properties = await Property.find({broker: brokerId });
        if (!properties || properties.length === 0) {
            return res.status(500).json({popup: "No properties found for the user",});
        }
        console.log(properties);
        return res.status(200).json(properties);
        
    } catch (err) {
        res.status(500).json(err);
    }
}
 