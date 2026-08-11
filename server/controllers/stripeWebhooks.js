import stripe from 'stripe';
import Booking from '../models/Booking.js';

//api to handle stripe webhooks

const stripeWebhooks=async(req,res)=>{
    //initialize stripe gateway

    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    const sig=req.headers['stripe-signature'];
    let event;

    try {
        event=stripeInstance.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    //handle the event
    if(event && event.type === "payment_intent.succeeded"){
        const paymentIntent=event.data.object;
        const paymentIntentId=paymentIntent.id;

        //getting session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:paymentIntentId
        });

        const {bookingId}= session.data[0].metadata;

        //mark payment paid
        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentMethod:"Stripe"});
    }else{
        console.log("Unhandled event type:", event?.type);
    }
    res.json({recieved:true});
}

export default stripeWebhooks;