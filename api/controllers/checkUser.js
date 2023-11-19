import User from '../models/users.js'

export default async function checkUser(req, res){
    try { //An error can be thrown; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
        const user = await User.findById(req.body.userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        return res.status(200).json(user.role);
    } 
    catch (err) { //catches the error at "user.role" if user is found to be null
        return res.status(500).json({popup: "NOT SIGNED IN"});
    }
} 