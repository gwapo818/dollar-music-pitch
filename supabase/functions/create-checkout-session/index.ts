
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('Missing STRIPE_SECRET_KEY');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Parse request body if it exists
    let requestData = {};
    const contentType = req.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      requestData = await req.json();
    }

    console.log('Creating payment session...');
    
    // Get the origin for success and cancel URLs
    const origin = req.headers.get('origin') || 'https://ryqrqcjbxujecrcvisvu.lovable.dev';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Replace this with your actual price ID from Stripe dashboard
          price: requestData.priceId || 'price_1PhXAYE8JKVpfnECVvbh6tQS',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?payment_status=success`,
      cancel_url: `${origin}/`,
      // You can add additional options as needed
      // payment_method_types: ['card'],
      // customer_email: requestData.email,
    });

    console.log('Payment session created:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
