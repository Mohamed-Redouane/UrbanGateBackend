import Property from '../models/properties.js'
export default async function deleteProperty (req, res) {
  try {
    const { _id } = req.params; //https://www.youtube.com/watch?v=-42K44A1oMA 19:23
    const response = await Property.findByIdAndDelete({_id}); //https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/?ref=ml_lbp -- delete property
    return res.status(200).json(response);
  }
  catch (err) {
    res.status(500).json(err);
  }
} 