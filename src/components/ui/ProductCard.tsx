import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { useCartStore } from '../../store/cart';

interface Product {
  id: string;
  title: string;
  slug: string;
  series: string;
  description: string;
  images: string[];
  variants: Array<{
    id: string;
    name: string;
    price: number;
    inventory: number;
  }>;
  rating: number;
  reviews_count: number;
  tags?: string[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const firstVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      productTitle: product.title,
      variantName: firstVariant.name,
      price: firstVariant.price,
      image: product.images[0],
      series: product.series,
    });
  };

  const seriesColors: { [key: string]: string } = {
    Sleep: 'bg-[#BDAAFF]',
    Focus: 'bg-[#FFCE6B]',
    Mood: 'bg-[#F8E7C6]',
    Collection: 'bg-gradient-to-r from-[#BDAAFF] to-[#F8E7C6]',
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.22, 0.9, 0.2, 1] }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F7]">
          <motion.img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />

          <div className={`absolute top-4 left-4 ${seriesColors[product.series]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {product.series}
          </div>

          {product.tags?.includes('bestseller') && (
            <div className="absolute top-4 right-4 bg-[#FFCE6B] text-[#111217] text-xs font-semibold px-3 py-1 rounded-full">
              Bestseller
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleQuickAdd}
              className="backdrop-blur-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2 inline" />
              Quick Add
            </Button>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-[#111217] mb-2 group-hover:text-[#BDAAFF] transition-colors">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#FFCE6B] text-[#FFCE6B]" />
              <span className="text-sm font-semibold text-[#111217]">
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews_count} reviews)
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-[#111217]">
                ₹{firstVariant.price}
              </span>
              {product.variants.length > 1 && (
                <span className="text-sm text-gray-500 ml-2">
                  +{product.variants.length - 1} variant{product.variants.length > 2 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
