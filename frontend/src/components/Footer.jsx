import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-amber-50 to-stone-100 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-800 mb-3">
              Kashmiri Corner
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From the soul of Kashmir, to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-amber-700 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-amber-700 transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-amber-700 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-2 text-amber-700" />
                9810721166
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-2 text-amber-700" />
                info@kashmiricorner.com
              </li>
              <li className="flex items-start text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-amber-700 flex-shrink-0" />
                Greater Noida, Uttar Pradesh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Kashmiri Corner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
