import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info('Item removed from cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isLoading) {
    return <Loader />;
  }

  const cartItems = cart?.items || [];
  const totalPrice = cart?.totalPrice || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                  <img
                    src={item.product?.imageUrl || 'https://via.placeholder.com/100'}
                    alt={item.product?.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.product?.name}</h3>
                    <p className="text-gray-600">${item.product?.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product?._id, item.quantity, -1)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-4 py-2 bg-gray-100 rounded">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product?._id, item.quantity, 1)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.product?._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice + 10 + totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button onClick={handleCheckout} className="w-full btn btn-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
