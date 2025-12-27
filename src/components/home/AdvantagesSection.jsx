import React from "react";

const advantages = [
  { icon: "🚚", title: "Fast Shipping", description: "On orders above $50, fast and reliable delivery." },
  { icon: "💳", title: "Secure Payments", description: "All transactions are encrypted and 100% secure." },
  { icon: "🔄", title: "Easy Returns", description: "Hassle-free returns within 30 days of purchase." },
  { icon: "📞", title: "24/7 Support", description: "We are here to help you anytime, anywhere." },
];

export default function AdvantagesSection() {
  return (
    
      <div className="max-w-17xl mx-auto px-6 text-center">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {advantages.map((adv, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{adv.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{adv.title}</h3>
              <p className="text-gray-600 text-sm">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>

  );
}
