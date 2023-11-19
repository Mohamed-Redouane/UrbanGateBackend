import Property from '../models/properties.js'

export default async function updateProperty(req, res) {
    try { 
        const property = await Property.findById(req.body.propertyID); //https://www.youtube.com/watch?v=P43DW3HUUH8&t=5957s at 1:38:07
        property.title = req.body.title;
        property.email = req.body.email;
        property.password = req.body.password;
        property.title= req.body.title;
        property.description= req.body.description;
        property.type=req.body.type;
        property.image=req.body.image;
        property.location=req.body.location;
        property.price= req.body.price;
        property.area=req.body.area;
        property.bedroom=req.body.bedroom;
        property.bathroom= req.body.bathroom;
        property.status= req.body.status;
        await property.save();
        console.log("property UPDATED");
        return res.status(200).json({popup: "property updated successfully!",});
    }
    catch (Exception) {
        return res.status(401).json({message:"property error"});
    }
}  