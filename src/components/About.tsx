"use client";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function About() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          We’re a passionate team dedicated to sharing authentic stories,
          insights, and perspectives about Taungoo’s culture, history, and
          modern development. Our goal is to connect people with the essence of
          Taungoo — where tradition meets progress, and every story adds depth
          to our city’s identity.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {[
            {
              title: "Our Vision",
              content:
                "To become a trusted digital space where culture, technology, and community come together — inspiring learning and meaningful connection across generations.",
            },
            {
              title: "What We Do",
              content:
                "We curate stories, research historical sites, and showcase local creativity through digital media — ensuring Taungoo’s heritage and innovation are shared with the world.",
            },
            {
              title: "Our Values",
              content:
                "Authenticity, creativity, and respect for cultural identity. We believe in progress that honors the past and builds a stronger, smarter future for our community.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate="visible"
              custom={index + 2}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {item.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Join the Journey
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Whether you’re a storyteller, developer, or cultural enthusiast —
            you’re part of this evolving story. Together, we’re building a
            bridge between Taungoo’s proud heritage and its digital future.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
