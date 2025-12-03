import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrder } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import { createPaymentIntent } from '../services/paymentService';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [processing, setProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const totalPrice = cart?.totalPrice || 0;
  const shippingPrice = 10;
  const taxPrice = totalPrice * 0.1;
  const finalTotal = totalPrice + shippingPrice + taxPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const { data } = await createPaymentIntent(finalTotal, user.token);

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      // Create order
      const orderData = {
        orderItems: cart.items.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        })),
        shippingAddress,
        paymentMethod: 'stripe',
        itemsPrice: totalPrice,
        taxPrice,
        shippingPrice,
        totalPrice: finalTotal,
      };

      await dispatch(createOrder(orderData)).unwrap();
      await dispatch(clearCart());

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Street Address"
            className="input"
            value={shippingAddress.street}
            onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="input"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="input"
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Zip Code"
              className="input"
              value={shippingAddress.zipCode}
              onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="input"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full btn btn-primary disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <div className="max-w-2xl mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
