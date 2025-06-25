import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useCart from "../../../Hook/useCart";
import useUsers from "../../../Hook/useUsers";
import { AuthContext } from "../../../provider/AuthProvider";
import { menu } from "framer-motion/client";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();   
  const totalprice = cart.reduce((total, item) => total + item.price, 0);
  useEffect(() => {
    if (totalprice > 0) {
      axiosSecure.post("/create-payment-intent", { price: totalprice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalprice]);
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setPaymentProcessing(true);

    // Get a reference to the card Element
    const card = elements.getElement(CardElement);

    if (card == null) {
      setPaymentProcessing(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setPaymentProcessing(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // Confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "Anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("[confirmError]");
      setError(confirmError.message);
      setPaymentProcessing(false);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction Id:", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        setPaymentSuccess(true);
        
        // Reset the card element
        card.clear();
      }
      // Save the payment information to the database

      const payment = {
        email: user?.email,
        price: totalprice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartId: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuId),
        status: "pending",
      };
      const res = await axiosSecure.post("/payments", payment);
      console.log("payment save", res.data);
      
      // Show success message when payment is saved successfully
      if (res.data) {
        refetch();
        setPaymentProcessing(false);
        Swal.fire({
          title: "Success!",
          text: "Payment completed successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate("/dashboard/payment-history");
      }
     
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
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
            disabled={!stripe || !clientSecret || paymentProcessing || paymentSuccess}
          >
            {paymentProcessing ? "Processing..." : paymentSuccess ? "Payment Completed" : `Pay ${totalprice.toFixed(2)}$`}
          </button>
          <p className="text-red-600">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              Your transaction ID is:
              <span className="font-bold">{transactionId}</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
