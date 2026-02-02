import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';
import { products, categories } from '../data/mockProducts';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1586795335046-3ec9294d0808)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Kashmiri Corner
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
            From the soul of Kashmir, to your home.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Our Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-animate
        className={`py-20 bg-gradient-to-br from-amber-50 to-stone-50 transition-all duration-1000 ${
          visibleSections.has('about')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Authentic Kashmiri
                <span className="text-amber-700"> Heritage</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Kashmiri Corner, we bring you the finest selection of
                authentic Kashmiri products straight from the valley. Each
                product is carefully sourced to preserve the rich traditions
                and exquisite flavors of Kashmir.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                From aromatic spices to premium dry fruits, traditional teas to
                rare specialty items – experience the true taste of Kashmir in
                every product.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1758745464235-ccb8c1253074"
                alt="Kashmiri Spices"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="features"
        data-animate
        className={`py-20 bg-white transition-all duration-1000 delay-200 ${
          visibleSections.has('features')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We are committed to bringing you the finest Kashmiri products
              with uncompromising quality and authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Premium Quality',
                description:
                  'Handpicked products from trusted sources in Kashmir, ensuring the highest quality standards.',
              },
              {
                icon: Heart,
                title: 'Authentic & Pure',
                description:
                  '100% authentic Kashmiri products with no additives or artificial ingredients.',
              },
              {
                icon: Shield,
                title: 'Trusted Source',
                description:
                  'Direct sourcing from Kashmir valley, maintaining traditional methods and ethical practices.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl border border-amber-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        id="products"
        data-animate
        className={`py-20 bg-gradient-to-br from-stone-50 to-amber-50 transition-all duration-1000 delay-300 ${
          visibleSections.has('products')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our handpicked selection of premium Kashmiri products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
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
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-amber-700">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-amber-700 hover:bg-amber-800 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        data-animate
        className={`py-24 bg-gradient-to-r from-amber-700 to-amber-600 transition-all duration-1000 delay-400 ${
          visibleSections.has('cta')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Kashmir?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us to place your order or inquire about availability
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-amber-700 hover:bg-gray-100 font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get In Touch
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
