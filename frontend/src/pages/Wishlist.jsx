import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info('Removed from wishlist');
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
    toast.success('Added to cart');
  };

  if (isLoading) {
    return <Loader />;
  }

  const wishlistProducts = wishlist?.products || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300'}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </Link>

              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.shortDescription}
                </p>
                <p className="text-2xl font-bold text-primary-600 mb-4">
                  ${product.price}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.quantity === 0}
                    className="flex-1 btn btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
