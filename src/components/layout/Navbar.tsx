import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cart';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-[#111217] font-['Poppins']">
              Serenè
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path
                    ? 'text-[#BDAAFF]'
                    : 'text-[#111217] hover:text-[#BDAAFF]'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#BDAAFF] transform origin-left transition-transform ${
                    location.pathname === link.path
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-[#111217] hover:bg-[#F5F5F7] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/account"
              className="p-2 text-[#111217] hover:bg-[#F5F5F7] rounded-full transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 text-[#111217] hover:bg-[#F5F5F7] rounded-full transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#BDAAFF] text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#111217] hover:bg-[#F5F5F7] rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#BDAAFF]'
                      : 'text-[#111217]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
