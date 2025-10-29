import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import productsData from '../data/products.json';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const selectedSeries = searchParams.get('series') || 'all';
  const selectedSort = searchParams.get('sort') || 'featured';

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productsData];

    if (selectedSeries !== 'all') {
      filtered = filtered.filter((p) => p.series === selectedSeries);
    }

    switch (selectedSort) {
      case 'price-low':
        filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedSeries, selectedSort]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = selectedSeries !== 'all' || selectedSort !== 'featured';

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#111217] mb-4">
            Shop All Products
          </h1>
          <p className="text-xl text-gray-600">
            Discover the perfect patch for your wellness journey
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111217]">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#BDAAFF] hover:underline flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#111217] mb-3">Series</h3>
                  <div className="space-y-2">
                    {['all', 'Sleep', 'Focus', 'Mood', 'Collection'].map((series) => (
                      <label
                        key={series}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="series"
                          value={series}
                          checked={selectedSeries === series}
                          onChange={(e) => handleFilterChange('series', e.target.value)}
                          className="w-4 h-4 text-[#BDAAFF] border-gray-300 focus:ring-[#BDAAFF]"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-[#BDAAFF] transition-colors">
                          {series === 'all' ? 'All Products' : series}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-[#111217] mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'featured', label: 'Featured' },
                      { value: 'rating', label: 'Highest Rated' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={option.value}
                          checked={selectedSort === option.value}
                          onChange={(e) => handleFilterChange('sort', e.target.value)}
                          className="w-4 h-4 text-[#BDAAFF] border-gray-300 focus:ring-[#BDAAFF]"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-[#BDAAFF] transition-colors">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} product
                {filteredAndSortedProducts.length !== 1 ? 's' : ''}
              </p>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md text-[#111217] hover:bg-[#F5F5F7] transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-4">
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="text-[#BDAAFF] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
