import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Check, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../store/cart';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const totalPrice = getTotalPrice();
  const shipping = totalPrice >= 500 ? 0 : 50;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderId = 'LP' + Date.now().toString().slice(-8);

    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#111217] mb-2">
            Checkout
          </h1>
          <p className="text-xl text-gray-600">
            Complete your order securely
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#BDAAFF] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-24 h-0.5 ${step >= 2 ? 'bg-[#BDAAFF]' : 'bg-gray-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[#BDAAFF] text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold text-[#111217] mb-6">
                  Shipping Information
                </h2>

                <form onSubmit={handleSubmitShipping} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#111217] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111217] mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                        placeholder="400001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#111217] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BDAAFF]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Continue to Payment
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold text-[#111217] mb-6 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-[#BDAAFF]" />
                  Secure Payment
                </h2>

                <div className="bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm opacity-80">DEMO CARD</span>
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div className="text-2xl tracking-wider mb-6 font-mono">
                    **** **** **** 1234
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80 mb-1">Cardholder</div>
                      <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80 mb-1">Expires</div>
                      <div className="font-semibold">12/25</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    This is a demo checkout. No real payment will be processed. In production, Stripe would be integrated here.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handlePlaceOrder}
                    loading={loading}
                    className="flex-1"
                  >
                    Place Order
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-md sticky top-28"
            >
              <h2 className="text-xl font-bold text-[#111217] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#111217]">
                        {item.productTitle}
                      </h4>
                      <p className="text-xs text-gray-600">{item.variantName}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-[#111217]">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-lg text-[#111217]">Total</span>
                  <span className="font-bold text-lg text-[#111217]">₹{finalTotal}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
