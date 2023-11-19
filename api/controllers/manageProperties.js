import Property from '../models/properties.js'
import User from '../models/users.js'

export default async function manageProperties(req, res) {
  try { //An error can be thrown; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
    console.log(req.body);
    const user = await User.findById(req.body.userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
    if (!user) { //checks if value is not truthy; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 39:46
      console.log("NOT EVEN SIGNED IN"); return res.status(500).json({popup: "NOT SIGNED IN"});
    }
    if (user.role == "broker") {
      const response = await Property.find({ broker: user._id });
      return res.status(200).json(response);
    }
    else {
      return res.status(500).json({popup: "not a broker"});
    }
  }
  catch (err) {
    return res.status(500).json(err);
  }
} 