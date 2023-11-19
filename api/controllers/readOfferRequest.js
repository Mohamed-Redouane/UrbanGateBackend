import Offers from '../models/send_offer.js';
export async function readOfferRequest(req, res) {
    try {
        const { offerId } = req.params;
        //find the offers by its ID
        const offers = await Offers.findById(offerId);
        if (!offers) {
          return res.status(404).json({ message: 'offer not found' });
        }
        res.status(200).json(offers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve offer' });
      }
}

