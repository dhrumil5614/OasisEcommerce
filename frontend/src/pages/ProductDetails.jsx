import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success('Added to cart');
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }
    dispatch(addToWishlist(product._id));
    toast.success('Added to wishlist');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary-600 mb-4">${product.price}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.fullDescription}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {product.category?.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Seller:</span> {product.seller?.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">In Stock:</span> {product.quantity}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleAddToWishlist}
              className="btn btn-outline flex items-center space-x-2"
            >
              <FiHeart />
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
