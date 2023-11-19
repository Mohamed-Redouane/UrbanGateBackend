import User from '../models/users.js' 
export default async function searchBrokers(req, res) {
      try {
        if(req.body.name == ''){
            console.log("yes");
            const response = await User.find({role: "broker"});
            return res.status(200).json({
                response: response,
                popup: "Good"});
        } 
        else {
            const response = await User.find({role: "broker", name: {"$regex": req.body.name, "$options" : "i"}}); //https://mongoosejs.com/docs/api/model.html#Model.find() and https://www.mongodb.com/docs/manual/reference/operator/query/regex/ 
            return res.status(200).json({
                response: response,
                popup: "Good"});
        }
    }
        catch{return res.status(500).json({popup: "Bad"});}
}