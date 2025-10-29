import React from 'react';
import { motion } from 'framer-motion';
import { Play, Atom, Zap, Moon, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Formulated by Experts',
      desc:
        'Our blends are created by aromatherapists and validated with neuroscience principles — focusing on neurotransmitters linked to sleep, focus, and mood.',
      icon: Atom,
      color: 'from-[#BDAAFF] to-[#F8E7C6]'
    },
    {
      id: 2,
      title: 'Infused into Patch',
      desc:
        'Essential oils (therapeutic-grade) are micro-encapsulated into a breathable, skin-safe polymer that releases scent gradually as it warms to body temperature.',
      icon: Play,
      color: 'from-[#F8E7C6] to-[#FFEFDB]'
    },
    {
      id: 3,
      title: 'Easy to Use',
      desc:
        'Peel, stick on a clean area (wrist, shoulder, collar) and let the patch release aroma for 8–12 hours — perfect for study sessions, work, or sleep routines.',
      icon: Zap,
      color: 'from-[#FFCE6B] to-[#FFDCA0]'
    },
    {
      id: 4,
      title: 'Feel the Effect',
      desc:
        'Scent molecules reach the olfactory bulb and influence the limbic system — supporting relaxation (sleep), alertness (focus), or uplifted mood — without drugs.',
      icon: Moon,
      color: 'from-[#A87CE5] to-[#BDAAFF]'
    }
  ];

  const researchBullets = [
    'Olfactory signals reach limbic areas that modulate emotion and memory.',
    'Lavender and chamomile are clinically associated with better sleep quality.',
    'Citrus and peppermint are linked to increased alertness in short cognitive tasks.'
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#111217] mb-4">How Serenè Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A science-first approach to wearable aromatherapy — simple to use, carefully formulated, and designed for real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="mb-8 flex gap-6 items-start"
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${s.color} text-white shadow-lg flex-shrink-0`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#111217] mb-2">{s.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-[#111217] mb-4">The Science Snapshot</h3>
            <p className="text-gray-700 mb-4">
              We combine aromatherapy literature with product engineering to create safe, reliable, and effective scent experiences.
            </p>

            <ul className="space-y-3 mb-6">
              {researchBullets.map((b, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="w-3 h-3 bg-[#BDAAFF] rounded-full mt-2" />
                  <div className="text-gray-700">{b}</div>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-[#111217] mb-2">Safety & Testing</h4>
              <p className="text-sm text-gray-600 mb-4">
                Hypoallergenic adhesives, dermatologically tested carrier materials, and third-party oil purity verification.
              </p>
              <Link to="/products" className="inline-block">
                <button className="px-6 py-3 rounded-full bg-[#6D5DF6] text-white font-medium hover:bg-[#5a4bdc] transition">Browse Patches</button>
              </Link>
            </div>
          </motion.div>
        </div>

        <section className="mb-16">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-[#111217] mb-6">
            Visual Explainer
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#F8F7FF] to-[#FFFFFF] rounded-2xl p-6 shadow-md">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#EDEBFF] to-[#FFF7EA] flex items-center justify-center">
                <span className="text-gray-400">[Infographic / SVG]</span>
              </div>
              <h4 className="mt-4 font-semibold text-[#111217]">Olfactory Pathways</h4>
              <p className="text-sm text-gray-600">Scent → Olfactory Bulb → Limbic System → Mood & Memory modulation.</p>
            </motion.div>

            <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#FFF9F2] to-[#FFFFFF] rounded-2xl p-6 shadow-md">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#FFF9F2] to-[#FFF1E0] flex items-center justify-center">
                <span className="text-gray-400">[Patch Lifecycle]</span>
              </div>
              <h4 className="mt-4 font-semibold text-[#111217]">Consistent Diffusion</h4>
              <p className="text-sm text-gray-600">Micro-encapsulation ensures stable release over hours without a heavy top note.</p>
            </motion.div>

            <motion.div initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#F8E7C6] to-[#FFF7F0] rounded-2xl p-6 shadow-md">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-[#FFF4E6] to-[#FFEFD6] flex items-center justify-center">
                <span className="text-gray-400">[Safety/Materials]</span>
              </div>
              <h4 className="mt-4 font-semibold text-[#111217]">Dermatology & Materials</h4>
              <p className="text-sm text-gray-600">Biodegradable backing and medical-grade adhesives tested for irritation.</p>
            </motion.div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-[#111217] mb-6">Common Questions</motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'How long does one patch last?', a: 'Typically 8–12 hours; may vary with activity and skin temperature.' },
              { q: 'Is it safe for sensitive skin?', a: 'Yes — our materials are dermatologically tested. Patch test recommended for very sensitive individuals.' },
              { q: 'Can I wear while sleeping?', a: 'Absolutely — the Sleep series is optimized for overnight use.' },
              { q: 'Are there drug interactions?', a: 'No — Serenè uses essential oils and contains no prescription ingredients.' }
            ].map((faq, i) => (
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 bg-[#BDAAFF] rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-[#111217] mb-2">{faq.q}</div>
                    <div className="text-sm text-gray-600">{faq.a}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-[#BDAAFF] to-[#F8E7C6] rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Curious about specific blends?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">Explore the scent families and recommended use-cases in our product pages — or try the Patch Quiz for a personalized suggestion.</p>
          <div className="flex justify-center gap-4">
            <Link to="/products">
              <button className="px-6 py-3 rounded-full bg-white text-[#6D5DF6] font-semibold">Browse Patches</button>
            </Link>
            <Link to="/blog">
              <button className="px-6 py-3 rounded-full border border-white text-white font-semibold">Read Research</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
