import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, Focus, Heart, Star } from 'lucide-react';
import { Hero3DScene } from '../components/3d/Hero3DScene';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import productsData from '../data/products.json';

export const Home: React.FC = () => {
  const featuredProducts = productsData.filter((p) => p.featured);

  const fadeInUp: any = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.2, 1] }
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF9F2] via-[#F5F5F7] to-[#BDAAFF]/10">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-[#BDAAFF]/20 to-[#F8E7C6]/20" />}>
            <Hero3DScene />
          </Suspense>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#111217] mb-6 text-balance">
              Feel. Heal. Sleep.
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto text-balance">
              Natural aromatherapy patches to sleep deeper, focus sharper, and feel calmer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Serené
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => {}}>
                Take the Patch Quiz
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400"
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Moon,
                title: 'Sleep',
                color: '#BDAAFF',
                description: 'Drift into peaceful slumber with calming lavender and chamomile blends.',
                link: '/products?series=Sleep'
              },
              {
                icon: Focus,
                title: 'Focus',
                color: '#FFCE6B',
                description: 'Sharpen your mind with invigorating peppermint and refreshing citrus.',
                link: '/products?series=Focus'
              },
              {
                icon: Heart,
                title: 'Mood',
                color: '#F8E7C6',
                description: 'Lift your spirits with joyful florals and uplifting botanical blends.',
                link: '/products?series=Mood'
              }
            ].map((series, index) => (
              <motion.div
                key={series.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link to={series.link} className="block">
                  <div className="bg-gradient-to-br from-white to-[#F5F5F7] rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all h-full border border-gray-100">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: series.color }}
                    >
                      <series.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#111217]">
                      {series.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{series.description}</p>
                    <div className="flex items-center text-[#111217] font-medium group">
                      Explore {series.title}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#111217] mb-6">
              Why Choose Serené?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality at accessible prices, crafted with care in India
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Pure Essential Oils', value: '100%' },
              { label: 'Biodegradable Materials', value: 'Eco-Friendly' },
              { label: 'Cost vs Imported', value: '40% Less' },
              { label: 'Made in India', value: 'Indore' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-md"
              >
                <div className="text-3xl font-bold text-[#BDAAFF] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#111217] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to wellness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Peel',
                description: 'Remove the protective backing from your Patch.'
              },
              {
                step: '02',
                title: 'Stick',
                description: 'Apply to clean, dry skin on your chest, wrist, or shoulder.'
              },
              {
                step: '03',
                title: 'Breathe',
                description: 'Enjoy 8-12 hours of continuous aromatherapy benefits.'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#BDAAFF]/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-[#111217] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 -right-6 w-12 h-0.5 bg-[#BDAAFF]/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

                

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#111217] mb-6">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya S.',
                role: 'Software Engineer',
                rating: 5,
                text: 'Deep Sleep has transformed my nights. I fall asleep faster and wake up feeling refreshed. The lavender scent is divine!'
              },
              {
                name: 'Rahul M.',
                role: 'Student',
                rating: 5,
                text: 'Study Mode is a game-changer during exam prep. The peppermint keeps me alert without the jitters of coffee.'
              },
              {
                name: 'Anjali K.',
                role: 'Yoga Instructor',
                rating: 5,
                text: 'Happy Soul lifts my mood instantly. I use it before teaching classes and my students notice the positive energy!'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-[#F5F5F7] rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FFCE6B] text-[#FFCE6B]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-[#111217]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Wellness?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands who have discovered the power of natural aromatherapy
            </p>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
