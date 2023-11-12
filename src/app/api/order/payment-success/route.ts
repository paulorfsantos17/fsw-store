'use server'
import { NextResponse } from "next/server"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
})

export const POST = async  (request: Request) => {
  const signature= request.headers.get('stripe-signature')
  if(!signature) {
    return NextResponse.error()
  }
  
  const text = await  request.text()
  const event = stripe.webhooks.constructEvent(
    text, 
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY
  )

  if(event.type === 'checkout.session.completed' ) {
    const session = event.data.object as Stripe.Checkout.Session

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items'],
      }
    );
    const lineItems = sessionWithLineItems.line_items;
    console.log("🚀 ~ file: route.ts:31 ~ POST ~ lineItems:", lineItems)

  }

  return NextResponse.json({received: true})
}