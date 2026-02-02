import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { products, categories } from '../data/mockProducts';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(new Set());

  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProducts((prev) => new Set([...prev, entry.target.dataset.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-product]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-600 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-white/90">
            Discover authentic Kashmiri products for your home
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters & Search */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-amber-100 border border-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-amber-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                data-product
                data-id={product.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  visibleProducts.has(String(product.id))
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${(index % 12) * 50}ms`,
                }}
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-amber-700 font-medium mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-amber-700">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
