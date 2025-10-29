import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { HowItWorks } from "./pages/HowItWorks";
import { Blog } from "./pages/Blog";
import { Account } from "./pages/Account";



const Contact: React.FC = () => (
  <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-bold text-[#111217] mb-8">Contact Us</h1>
      <p className="text-xl text-gray-600">Coming soon...</p>
    </div>
  </div>
);

const FAQ: React.FC = () => (
  <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl font-bold text-[#111217] mb-8">Frequently Asked Questions</h1>
      <p className="text-xl text-gray-600">Coming soon...</p>
    </div>
  </div>
);



const OrderConfirmation: React.FC = () => {
  const orderId = window.location.pathname.split('/').pop();

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111217] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thanks for your order. Your LunaPatch order is on the way — dream well.
          </p>
          <div className="bg-[#F5F5F7] rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-[#BDAAFF]">{orderId}</p>
          </div>
          <p className="text-gray-600 mb-8">
            You'll receive a confirmation email shortly with your order details and tracking information.
          </p>
          <a href="/" className="inline-block px-8 py-3 bg-[#BDAAFF] text-white font-medium rounded-xl hover:bg-[#A890FF] transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
