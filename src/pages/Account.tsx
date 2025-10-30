import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, LogIn, LogOut, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * This is a client-side mock account page.
 * Replace auth logic with real backend calls when ready.
 */

export const Account: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({ name: 'Asha Kapoor', email: form.email || 'asha@example.com' });
    setMode('dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    setUser({ name: form.name || 'New User', email: form.email || 'new@example.com' });
    setMode('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setMode('login');
    navigate('/');
  };

  if (mode === 'dashboard' && user) {
    return (
      <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-10 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#111217]">Welcome back, {user.name}</h2>
                <p className="text-sm text-gray-600">Manage orders, subscriptions and account details.</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleLogout} className="px-4 py-2 rounded-full bg-[#FFCE6B] text-[#111217] font-semibold flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F5F5F7] rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-4">Subscription</div>
                <div className="font-semibold text-[#111217]">Calm Monthly Box</div>
                <div className="text-sm text-gray-600 mt-2">Next shipment: 12 Nov 2025</div>
                <Link to="/account" className="mt-4 inline-block text-[#6D5DF6]">Manage subscription</Link>
              </div>

              <div className="bg-[#F5F5F7] rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-4">Orders</div>
                <div className="font-semibold text-[#111217]">Order #LP012345</div>
                <div className="text-sm text-gray-600 mt-2">Delivered • 3 Oct 2025</div>
                <Link to="/orders" className="mt-4 inline-block text-[#6D5DF6]">View order history</Link>
              </div>

              <div className="bg-[#F5F5F7] rounded-2xl p-6">
                <div className="text-sm text-gray-600 mb-4">Account</div>
                <div className="font-semibold text-[#111217]">{user.email}</div>
                <div className="text-sm text-gray-600 mt-2">Member since Aug 2025</div>
                <Link to="/account/settings" className="mt-4 inline-block text-[#6D5DF6]">Settings</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#111217] mb-2">Your Serené Account</h1>
          <p className="text-gray-600">Sign in to manage subscriptions and orders — or create an account to get started.</p>
        </motion.div>

        <div className="bg-[#FFF9F2] rounded-3xl p-8 shadow-md">
          <div className="flex gap-6 items-start mb-6">
            <button onClick={() => setMode('login')} className={`flex-1 py-3 rounded-xl ${mode === 'login' ? 'bg-white shadow-md' : 'bg-transparent'}`}> <LogIn className="inline mr-2" /> Login</button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-3 rounded-xl ${mode === 'signup' ? 'bg-white shadow-md' : 'bg-transparent'}`}> <UserPlus className="inline mr-2" /> Sign up</button>
          </div>

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#111217] mb-2">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#111217] mb-2">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Don’t have an account? <button type="button" onClick={() => setMode('signup')} className="text-[#6D5DF6]">Create one</button></div>
                <button type="submit" className="px-6 py-3 rounded-full bg-[#6D5DF6] text-white font-semibold">Sign in</button>
              </div>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#111217] mb-2">Full name</label>
                <input name="name" type="text" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111217] mb-2">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#111217] mb-2">Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Already registered? <button type="button" onClick={() => setMode('login')} className="text-[#6D5DF6]">Sign in</button></div>
                <button type="submit" className="px-6 py-3 rounded-full bg-[#6D5DF6] text-white font-semibold">Create account</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
