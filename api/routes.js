// Separating routes from index.js
//https://www.w3schools.com/js/js_es6.asp
//https://www.youtube.com/watch?v=kBhkPufW8Cw&t=573s

import express from 'express';
import createUser from './controllers/createUser.js';
import signIn from './controllers/signIn.js';
import createProperty from './controllers/createProperty.js';
import readProperty from './controllers/readProperty.js';
import manageProperties from './controllers/manageProperties.js';
import checkUser from './controllers/checkUser.js';
import manageBrokers from './controllers/manageBrokers.js';
import readBrokerID from './controllers/readBrokerID.js';
import updateBroker from './controllers/updateBroker.js';
import deleteBroker from './controllers/deleteBroker.js';
import readPropertyID from './controllers/readPropertyID.js';
import deletePropertyID from './controllers/deletePropertyID.js';
import { createVisitRequest, RejectVisitRequest } from './controllers/visitRequest.js';
import { manageVisitRequests } from './controllers/manageVisitRequests.js';
import readPropertiesForUser from './controllers/readPropertiesForUser.js';
import updateProperty from './controllers/updateProperty.js';
import { createOffer } from './controllers/Offer.js';
import searchBroker from './controllers/searchBroker.js';
import { AcceptVisitRequest } from './controllers/visitRequest.js';
import { readVisitRequest } from './controllers/readVisitRequest.js';
import { manageOffersRequests } from './controllers/manageOffersRequests.js';
import { AcceptOfferRequest, RejectOfferRequest } from './controllers/Offer.js';
import { readOfferRequest } from './controllers/readOfferRequest.js';
import OfferHomebuyer from './controllers/OfferHomebuyer.js'
import saveProperty from './controllers/saveProperty.js';
import getSavedProperty from './controllers/getSavedProperty.js'

const router = express.Router();

router.post('/createUser', createUser);
router.post('/signIn', signIn);
router.post('/createProperty', createProperty);
router.get('/readProperty', readProperty);
router.post('/manageProperties', manageProperties);
router.post('/checkUser', checkUser);
router.post('/manageBrokers', manageBrokers);
router.get('/readBrokerID/:_id', readBrokerID);
router.post('/updateBroker', updateBroker);
router.get('/deleteBroker/:_id', deleteBroker);
router.get('/readPropertyID/:_id', readPropertyID);
router.delete('/deletePropertyID/:_id', deletePropertyID);
router.post('/visitRequest', createVisitRequest);
router.get('/manageVisitRequests/:brokerId', manageVisitRequests);
router.get('/readPropertiesForUser/:brokerId',readPropertiesForUser);
router.post('/updateProperty', updateProperty);
router.post('/Offer', createOffer);
router.post('/searchBroker', searchBroker);
router.put('/AcceptVisitRequest/:visitRequestId',AcceptVisitRequest);
router.put('/RejectVisitRequest/:visitRequestId',RejectVisitRequest);
router.get('/readVisitRequest/:visitRequestId',readVisitRequest);
router.get('/manageOffersRequests/:brokerId', manageOffersRequests);
router.put('/AcceptOfferRequest/:offerId',AcceptOfferRequest);
router.put('/RejectOfferRequest/:offerId',RejectOfferRequest);
router.get('/readOfferRequest/:offerId', readOfferRequest);
router.post('/findOffersForHomebuyer', OfferHomebuyer);
router.post('/savedProperties', saveProperty);
router.post('/getSavedProperties', getSavedProperty);

export default router; 