import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#111217] mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from a university project, LunaPatch is transforming wellness through natural aromatherapy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg"
              alt="LunaPatch Story"
              className="w-full h-96 object-cover rounded-3xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-[#111217] mb-6">
              From MU20 to Your Wellness Journey
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              LunaPatch began as a student project at MU20 in Indore, where we recognized a gap in the market for affordable, high-quality aromatherapy solutions made in India.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We noticed that imported aromatherapy products were prohibitively expensive, putting natural wellness out of reach for many. Our mission became clear: create premium-quality aromatherapy patches using pure essential oils, sustainable materials, and local manufacturing — all at prices that make wellness accessible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, LunaPatch serves thousands of customers across India, helping them sleep better, focus clearer, and feel calmer — naturally.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Heart,
              title: 'Made with Care',
              description: 'Handcrafted in Indore with attention to every detail'
            },
            {
              icon: Leaf,
              title: 'Eco-Friendly',
              description: 'Biodegradable materials and sustainable practices'
            },
            {
              icon: Users,
              title: 'Customer First',
              description: 'Your wellness and satisfaction are our priority'
            },
            {
              icon: Award,
              title: 'Quality Assured',
              description: '100% pure essential oils, rigorously tested'
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111217] mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">
            Join the Wellness Revolution
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Experience the power of natural aromatherapy, crafted with care in India, for India
          </p>
        </motion.div>
      </div>
    </div>
  );
};
