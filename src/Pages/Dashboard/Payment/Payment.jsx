
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Geteway_PK);
const Payment = () => {
    
    return (
        <div>
          
           <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm />
            </Elements>
           </div>
        </div>
    );
};

export default Payment;