import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);

  const isInWishlist = wishlist?.products?.some(p => p._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
    toast.success('Added to cart');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.info('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product._id));
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={handleToggleWishlist}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {isInWishlist ? (
              <FaHeart className="text-red-500" size={20} />
            ) : (
              <FiHeart size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary flex items-center space-x-2"
          >
            <FiShoppingCart />
            <span>Add</span>
          </button>
        </div>
        {product.quantity === 0 && (
          <p className="text-red-500 text-sm mt-2">Out of stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
