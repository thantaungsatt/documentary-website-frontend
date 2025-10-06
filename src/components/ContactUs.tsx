"use client";
import React from "react";
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

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl font-black text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="text-gray-700 text-lg text-center mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Have a question, feedback, or collaboration idea? Let’s connect — we’d
          love to hear from you.
        </motion.p>

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Google Map */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="w-full h-[450px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61108.04501695822!2d96.40441626028952!3d18.942074788045695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30caa7eae3c5f289%3A0x9a5eeed5cf5eb4a5!2sTaungoo!5e0!3m2!1sen!2smm!4v1696500000000!5m2!1sen!2smm"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0"
            ></iframe>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="space-y-6"
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Send Message
            </button>
          </motion.form>
        </div>

        {/* Footer Section: Get in Touch */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="mt-20 border-t pt-7"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-gray-700 text-center justify-items-center">
            {/* Column 1: Contact Info */}
            <div className="space-y-3">
              <p className="font-medium text-lg text-gray-800">Contact Info</p>
              <p>Email: info@taungoo.com</p>
              <p>Phone: +95 9 123 456 789</p>
              <p>Facebook: facebook.com/taungoo</p>
            </div>

            {/* Column 2: Office Info */}
            <div className="space-y-3">
              <p className="font-medium text-lg text-gray-800">Office</p>
              <p>Location: Taungoo, Myanmar</p>
              <p>Working Hours: Mon–Fri, 9 AM – 5 PM</p>
              <p>Closed: Sat & Sun</p>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-3">
              <p className="font-medium text-lg text-gray-800">Quick Links</p>
              <p>About Us</p>
              <p>Blog</p>
              <p>Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
