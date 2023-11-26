import User from '../models/users.js';
import Property from '../models/properties.js';
export default async function deleteBroker(req, res) {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        const properties = user.ownedProperties;
        properties.forEach(async p => { //Delete all the properties if the broker has been deleted
             await Property.findByIdAndDelete(p._id);
        });
        await User.deleteOne({_id}); 
        console.log("USER DELETED");
        return res.status(200).json({popup: "User deleted successfully!",}); //
    }
    catch (err) {
        return res.status(500).json(err);
    }
} 