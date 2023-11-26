import User from '../models/users.js' 
export default async function manageBrokers(req, res) {
    const user = await User.findById(req.body.userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
    if (!user) {return res.status(500).json({popup: "NOT SIGNED IN",});} //checks if value is not truthy; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 39:46
    try { //An error can be thrown; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
      if (user.role == "admin") {
      const response = await User.find({role: "broker"}); //https://mongoosejs.com/docs/api/model.html#Model.find()
      return res.status(200).json({
        response: response,
        popup: "Good"});
      } 
      else {
        return res.status(500).json({popup:"Something went wrong"});
      }
    }
    catch (err) {
        return res.status(500).json(err);
    } 
} 