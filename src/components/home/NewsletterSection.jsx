import React from "react";

export default function NewsletterSection() {
  return (
    <section className="bg-yellow-50 py-0">
      <div className="max-w-12xl mx-auto px-6 text-center">
       
        <p className="text-gray-700 mb-6">Subscribe to our newsletter for exclusive deals and updates.</p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-r-md font-semibold transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
