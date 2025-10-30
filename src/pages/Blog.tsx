import React from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export const Blog: React.FC = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Aromatherapy Works — The Science of Scent",
      date: "August 10, 2025",
      category: "Science",
      description:
        "A friendly, evidence-informed explanation of how smell influences mood, memory, and sleep — and how Serené harnesses these effects safely.",
      image:
        "https://images.unsplash.com/photo-1582719478171-2b6b6a4d77b3?auto=format&fit=crop&w=1500&q=80",
    },
    {
      id: 2,
      title: "5 Scents That Instantly Lift Your Mood",
      date: "September 5, 2025",
      category: "Wellness",
      description:
        "Discover five natural aromas scientifically shown to improve mood and motivation — and how Serené brings them into daily life.",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7ac2df4e0?auto=format&fit=crop&w=1500&q=80",
    },
    {
      id: 3,
      title: "How to Build a Calming Night Routine That Works",
      date: "July 24, 2025",
      category: "Lifestyle",
      description:
        "Simple, science-backed habits to combine with Serené Sleep Series for deeper rest and easier mornings.",
      image:
        "https://images.unsplash.com/photo-1544698310-3bdfbbac43c2?auto=format&fit=crop&w=1500&q=80",
    },
    {
      id: 4,
      title: "Behind the Blend — Inside Serené’s Aroma Lab",
      date: "June 15, 2025",
      category: "Inside Serené",
      description:
        "Peek inside our aroma lab, where neuroscientists and perfumers co-create blends designed to soothe your senses and mind.",
      image:
        "https://images.unsplash.com/photo-1600180758890-6dfd3c437d25?auto=format&fit=crop&w=1500&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF9F2] to-white pt-32 pb-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16 px-6"
      >
        <h1 className="text-5xl font-bold text-[#111217] mb-4 font-playfair">
          Insights & Stories
        </h1>
        <p className="text-xl text-gray-600 font-poppins">
          Read science-backed articles, brand stories, and real-world ways to
          bring calm, focus, and sleep into everyday life.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-500"
          >
            <div className="overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-left">
              <div className="flex items-center justify-between mb-3 text-gray-500 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={16} /> {blog.category}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-[#111217] mb-3 font-playfair">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-5 font-poppins leading-relaxed">
                {blog.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#6D5DF6] hover:gap-3 transition-all duration-300 font-medium"
              >
                Read article <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
