import express from 'express';
const router = express.Router();
import { getCheckoutSession,stripeWebhook } from '../helpers/user/stripe.js';

router.post("/payment/:userid/:addressid", getCheckoutSession);

router.post("/webhook",stripeWebhook);


export default router;