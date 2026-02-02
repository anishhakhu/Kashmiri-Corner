import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Phone, Mail } from 'lucide-react';
import { getProductById } from '../data/mockProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
    
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Link
            to="/products"
            className="text-amber-700 hover:text-amber-800 font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>

            <div className="mb-8">
              <p className="text-5xl font-bold text-amber-700">
                ₹{product.price}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Availability Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 border-l-4 border-amber-600 p-6 rounded-lg mb-8">
              <div className="flex items-start">
                <Package className="w-6 h-6 text-amber-700 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Important Information
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Prices and availability may vary according to the market. To
                    check for availability and place an order, please contact us
                    directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Interested in this product?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:9810721166"
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </a>
                <Link
                  to="/contact"
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-white border-2 border-amber-700 text-amber-700 hover:bg-amber-50 font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
