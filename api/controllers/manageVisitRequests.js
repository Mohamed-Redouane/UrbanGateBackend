//references: https://mongoosejs.com/docs/api/query.html#Query.prototype.exec()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
import VisitRequest from '../models/visit_requests.js';
import Property from '../models/properties.js';

export async function manageVisitRequests(req, res) {
  try {
    const brokerId = req.params.brokerId; // Corrected the way to access brokerId
    const visitRequests = [];
    //find all properties associated with the broker
    const properties = await Property.find({ broker: brokerId }).exec(); // .exec() executes the Mongoose query and returns its results as a promise.
    for (const property of properties) {
      //find visit requests related to each property
      const propertyVisitRequests = await VisitRequest.find({ property: property._id }).exec();
      visitRequests.push(...propertyVisitRequests); //add the visit requests related to a property to the visitRequests array.
    }
    if (visitRequests.length === 0) {
      return res.status(404).json({ message: 'No visit requests found for this broker' });
    }
    res.json(visitRequests);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
