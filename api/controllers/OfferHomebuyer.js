import send_offer from '../models/send_offer.js'

export default async function OfferHomebuyer (req, res) {
    try { 
        const response = await send_offer.find({requester: req.body.userID}); //
        return res.status(200).json(response);
    }
    catch (err) {return res.status(500).json(err);};
}
 