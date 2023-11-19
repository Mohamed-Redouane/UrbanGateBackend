//references: https://mongoosejs.com/docs/api/query.html#Query.prototype.exec()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
import Offers from '../models/send_offer.js';
import Property from '../models/properties.js';

export async function manageOffersRequests(req, res) {
  try {
    const brokerId = req.params.brokerId; // Corrected the way to access brokerId
    const offers = [];
    //find all properties associated with the broker
    const properties = await Property.find({ broker: brokerId }).exec(); // .exec() executes the Mongoose query and returns its results as a promise.
    for (const property of properties) {
      //find Offers related to each property
      const propertyOffersRequests = await Offers.find({ property: property._id }).exec();
      offers.push(...propertyOffersRequests); //add offers related to a property to the Offers array.
    }
    if (offers.length === 0) {
      return res.status(404).json({ message: 'No Offers found for this broker' });
    }
    res.json(offers);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
 