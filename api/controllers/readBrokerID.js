import User from '../models/users.js'

export default async function readBrokerID (req, res) {
    try { 
        const { _id } = req.params;
        const response = await User.findById({_id}); 
        console.log("yes");
        return res.status(200).json(response);
    }
    catch (err) {return res.status(500).json(err);};
}
