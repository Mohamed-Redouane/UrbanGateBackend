import User from '../models/users.js'
import Property from '../models/properties.js'
/*
This function retrieves the saved properties of a user; however,
this function does not handle the case where the property gets deleted, it leads to an error
*/
export default async function saveProperty(req, res){
    try { //An error can be thrown; https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s 1:32:01
        let propertyArr = []; //Javascript arrays dynamically resize: https://www.reddit.com/r/javascript/comments/3r8p09/how_come_javascript_arrays_arent_of_fixedlength/
        const user = await User.findById(req.body.userID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        //console.log(typeof(user.ownedProperties[0])) This returns key object
        //console.log(user.ownedProperties[0]); This returns the 'KEY' object which can be used to find the Property
        for (let i = 0; i < user.ownedProperties.length; i++) {
            propertyArr[i] = await Property.findById(user.ownedProperties[i]); //Javascript arrays dynamically resize: https://www.reddit.com/r/javascript/comments/3r8p09/how_come_javascript_arrays_arent_of_fixedlength/
        }
        return res.status(200).json({houses: propertyArr});
    }
    catch (err) { 
        return res.status(500).json(err);
    }
} 