import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    
    // Get a reference to the card Element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 tracking-wide">
          PAYMENT
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-gray-300 rounded-md p-4 bg-white">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    lineHeight: "24px",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                  complete: {
                    color: "#424770",
                  },
                },
                disableLink: true,
                hidePostalCode: true,
              }}
            />
          </div>
          
          <button 
            className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
            type="submit" 
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;