import User from '../models/users.js';
import bcrypt from 'bcrypt';
/*
* This function checks with the email provided if there is already an account with the provided email
* Rejects the request if account with the same email already exists
* Accepts the request and creates an object in the database if the email with the same email does NOT exist 
* I Followed this guide:
* https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 50:12
*/
export default async function createUser(req, res) {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ popup: "Missing required fields in the request" });
    }
    try { //An error can be thrown; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
        const userAlreadyThere = await User.findOne({email}); //look for the email; https://mongoosejs.com/docs/api/model.html#Model.findOne() + https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 39:46
        if (userAlreadyThere) { //if value is truthy, meaning that an object has been found in the data, then don't create another account with the same email; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 39:46
            return res.status(400).json({popup: "This email already has an associated account"}); //return to end the execution of function: https://stackoverflow.com/questions/43055600/app-get-is-there-any-difference-between-res-send-vs-return-res-send + https://www.geeksforgeeks.org/which-http-response-status-codes-result-in-then-and-which-in-catch/
        }
        else {
            const saltRounds = 10; // Number of salt rounds .
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // https://www.honeybadger.io/blog/javascript-authentication-guide/
            const user = new User({ name: req.body.name, email: req.body.email, password: hashedPassword , role: req.body.role }) //https://mongoosejs.com/docs/models.html + https://www.youtube.com/watch?v=wgGkF4k9c7A at 17:32 +  https://www.youtube.com/watch?v=enOsPhp2Z6Q at 49:23
            await user.save(); //await because .save is a promise
            //console.log(typeof(user._id));
            return res.status(200).json({popup: "Successfully created user"}); 
        }
    }
    catch (err) { //An error can be caught; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
      return res.status(500).json(err);
    }
} 