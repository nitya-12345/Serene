import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111217] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold font-['Poppins']">
                LunaPatch
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Natural aromatherapy patches designed to help you sleep deeper, focus clearer, and feel calmer. Handcrafted in Indore with pure essential oils.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#BDAAFF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#BDAAFF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#BDAAFF] rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-['Poppins']">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?series=Sleep"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sleep Series
                </Link>
              </li>
              <li>
                <Link
                  to="/products?series=Focus"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Focus Series
                </Link>
              </li>
              <li>
                <Link
                  to="/products?series=Mood"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mood Series
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-['Poppins']">Learn</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 font-['Poppins']">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} LunaPatch. All rights reserved. Made with care in Indore.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Accepted at MU20</span>
              <span>•</span>
              <span>Handcrafted Quality</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h4 className="font-bold text-xl mb-2 font-['Poppins']">
              Subscribe to our newsletter
            </h4>
            <p className="text-gray-400">
              Get wellness tips and exclusive offers
            </p>
          </div>
          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 bg-gray-800 text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#BDAAFF] hover:bg-[#A890FF] text-white font-medium rounded-r-xl transition-colors flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};
