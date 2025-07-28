import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useCart from "../../../Hook/useCart";
import { AuthContext } from "../../../provider/AuthProvider";
import { CreditCard, Lock, CheckCircle } from "lucide-react";
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
            title: "Payment Successful!",
            text: "Your order has been processed successfully!",
            icon: "success",
            confirmButtonText: "View Payment History",
            confirmButtonColor: "#ea580c",
            background: '#1e293b',
            color: '#ffffff'
          });
          navigate("/dashboard/payment-history");
        }
      }
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: '"Inter", sans-serif'
    }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="25" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.4"/><circle cx="25" cy="75" r="1" fill="%23ffffff" opacity="0.3"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
          backgroundRepeat: 'repeat',
          width: '100%',
          height: '100%'
        }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden shadow-2xl w-full max-w-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-white/20 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-amber-100">
                  Secure Payment
                </h2>
              </div>
            </div>
            <p className="text-amber-300 text-sm font-medium tracking-wide">
              BISTRO BOSS RESTAURANT • CHECKOUT
            </p>
          </div>

          {/* Payment Form */}
          <div className="p-8">
            {/* Payment Summary */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Order Summary
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Total Items:</span>
                <span className="text-white font-semibold">{cart.length}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/20">
                <span className="text-white font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-400">${totalprice.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Element Container */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Card Information
                </label>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 focus-within:border-amber-400 transition-all duration-300">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#ffffff",
                          fontFamily: '"Inter", sans-serif',
                          lineHeight: "24px",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#94a3b8",
                          },
                        },
                        invalid: {
                          color: "#ef4444",
                        },
                        complete: {
                          color: "#10b981",
                        },
                      },
                      disableLink: true,
                      hidePostalCode: true,
                    }}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm flex items-center gap-1 mt-2">
                    ⚠️ {error}
                  </p>
                )}
              </div>

              {/* Payment Button */}
              <button
                className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                style={{ 
                  background: paymentSuccess 
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  boxShadow: '0 8px 32px rgba(234, 88, 12, 0.3)'
                }}
                type="submit"
                disabled={!stripe || !clientSecret || paymentProcessing || paymentSuccess}
              >
                {paymentProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Payment...
                  </div>
                ) : paymentSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Payment Completed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Pay ${totalprice.toFixed(2)}
                  </div>
                )}
              </button>

              {/* Transaction ID Display */}
              {transactionId && (
                <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mt-4">
                  <p className="text-green-300 text-center">
                    <CheckCircle className="w-5 h-5 inline mr-2" />
                    Transaction ID: 
                    <span className="font-mono font-bold ml-2">{transactionId}</span>
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="text-center mt-6">
                <p className="text-white/60 text-sm flex items-center justify-center gap-1">
                  <Lock className="w-4 h-4" />
                  Your payment information is secure and encrypted
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
