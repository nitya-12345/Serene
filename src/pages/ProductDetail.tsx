import React, { useState, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Info, Package, Shield, Leaf, Heart } from 'lucide-react';
import { Product3DViewer } from '../components/3d/Product3DViewer';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cart';
import productsData from '../data/products.json';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = productsData.find((p) => p.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-[#111217] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products">
            <Button variant="primary">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants[selectedVariant];
  const discountedPrice = isSubscription
    ? Math.round(currentVariant.price * 0.85)
    : currentVariant.price;

  const relatedProducts = productsData
    .filter((p) => p.series === product.series && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: currentVariant.id,
      productTitle: product.title,
      variantName: currentVariant.name,
      price: discountedPrice,
      image: product.images[0],
      series: product.series,
      quantity
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-[#BDAAFF]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#BDAAFF]">Products</Link>
          <span>/</span>
          <span className="text-[#111217] font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Suspense
              fallback={
                <div className="w-full aspect-square bg-gradient-to-br from-[#F5F5F7] to-[#FFF9F2] rounded-2xl flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#BDAAFF] border-t-transparent" />
                </div>
              }
            >
              <Product3DViewer productTitle={product.title} series={product.series} />
            </Suspense>

            <div className="grid grid-cols-3 gap-4 mt-6">
              {product.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-xl cursor-pointer hover:opacity-75 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  loading="lazy"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block bg-[#BDAAFF] text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
              {product.series} Series
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#111217] mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#FFCE6B] text-[#FFCE6B]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#111217] font-medium">{product.rating}</span>
              <span className="text-gray-500">
                ({product.reviews_count} reviews)
              </span>
            </div>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {product.full_description}
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#111217] mb-3">
                  Select Variant
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedVariant === index
                          ? 'border-[#BDAAFF] bg-[#BDAAFF]/5'
                          : 'border-gray-200 hover:border-[#BDAAFF]/50'
                      }`}
                    >
                      <div className="font-semibold text-[#111217] mb-1">
                        {variant.name}
                      </div>
                      <div className="text-lg font-bold text-[#BDAAFF]">
                        ₹{isSubscription ? Math.round(variant.price * 0.85) : variant.price}
                      </div>
                      {variant.inventory < 50 && (
                        <div className="text-xs text-orange-500 mt-1">
                          Only {variant.inventory} left
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-3 p-4 bg-[#F8E7C6]/20 rounded-xl cursor-pointer hover:bg-[#F8E7C6]/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={isSubscription}
                    onChange={(e) => setIsSubscription(e.target.checked)}
                    className="w-5 h-5 text-[#BDAAFF] border-gray-300 rounded focus:ring-[#BDAAFF]"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-[#111217]">
                      Subscribe & Save 15%
                    </div>
                    <div className="text-sm text-gray-600">
                      Monthly delivery • Cancel anytime
                    </div>
                  </div>
                  <div className="bg-[#FFCE6B] text-[#111217] text-xs font-bold px-3 py-1 rounded-full">
                    SAVE ₹{currentVariant.price - Math.round(currentVariant.price * 0.85)}
                  </div>
                </label>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#111217] mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-[#F5F5F7] hover:bg-gray-300 rounded-xl font-bold text-xl transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-12 text-center text-xl font-bold bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-[#F5F5F7] hover:bg-gray-300 rounded-xl font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-[#111217]">
                  ₹{discountedPrice * quantity}
                </span>
                {isSubscription && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{currentVariant.price * quantity}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  onClick={handleBuyNow}
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800"
                >
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Added to cart successfully!</span>
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <Package className="w-6 h-6 text-[#BDAAFF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#111217] text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-600">On orders over ₹500</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <Shield className="w-6 h-6 text-[#BDAAFF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#111217] text-sm">Quality Assured</div>
                  <div className="text-xs text-gray-600">Pure essential oils</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <Leaf className="w-6 h-6 text-[#BDAAFF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#111217] text-sm">Eco-Friendly</div>
                  <div className="text-xs text-gray-600">Biodegradable materials</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-xl">
                <Heart className="w-6 h-6 text-[#BDAAFF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#111217] text-sm">Made in India</div>
                  <div className="text-xs text-gray-600">Handcrafted in Indore</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-3xl font-bold text-[#111217] mb-6">
                Scent Composition
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {product.scent_composition.map((scent) => (
                  <span
                    key={scent}
                    className="px-4 py-2 bg-[#BDAAFF]/10 text-[#BDAAFF] font-medium rounded-full"
                  >
                    {scent}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-[#111217] mb-4">Ingredients</h3>
              <ul className="space-y-2 mb-8">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-yellow-900 mb-1">Safety Notes</div>
                  <p className="text-sm text-yellow-800">{product.safety_notes}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-[#111217] mb-4">
                Product Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">SKU</dt>
                  <dd className="font-medium text-[#111217]">{currentVariant.sku}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Weight</dt>
                  <dd className="font-medium text-[#111217]">{product.weight}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Dimensions</dt>
                  <dd className="font-medium text-[#111217]">{product.packaging_dimensions}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">In Stock</dt>
                  <dd className="font-medium text-green-600">{currentVariant.inventory} units</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-[#111217] mb-8">
              More from {product.series} Series
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
