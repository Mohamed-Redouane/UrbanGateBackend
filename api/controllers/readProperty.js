import Property from '../models/properties.js'

export default async function readProperty(req, res) {
    try {
        const response = await Property.find({}); //finds all the objects in database https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:28:52
        return res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err.message });    }
} 