import VisitRequest from '../models/visit_requests.js';
export async function readVisitRequest(req, res) {
    try {
        const { visitRequestId } = req.params;
        //find the visit request by its ID
        const visitRequest = await VisitRequest.findById(visitRequestId);
        if (!visitRequest) {
          return res.status(404).json({ message: 'Visit request not found' });
        }
        res.status(200).json(visitRequest);
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve visit request' });
      }
}

