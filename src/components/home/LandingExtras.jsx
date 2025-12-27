import React from "react";

const advantages = [
  {
    icon: "🚚",
    title: "Free Shipping",
    description: "On all orders above $50, fast and reliable delivery.",
  },
  {
    icon: "💳",
    title: "Secure Payments",
    description: "All transactions are encrypted and 100% secure.",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days of purchase.",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "We are here to help you anytime, anywhere.",
  },
];

const testimonials = [
  {
    name: "John Doe",
    avatar: "/avatars/user1.jpg",
    comment:
      "Amazing products and fast delivery. Highly recommended!",
  },
  {
    name: "Jane Smith",
    avatar: "/avatars/user2.jpg",
    comment:
      "Excellent customer service and great deals on electronics.",
  },
  {
    name: "Michael Brown",
    avatar: "/avatars/user3.jpg",
    comment:
      "High quality products and smooth shopping experience.",
  },
];

export default function LandingExtras() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-17xl mx-auto px-6 space-y-16">

        {/* Advantages Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Why Shop With Us
          </h2>
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

        {/* Testimonials Section */}
        {/* <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <h4 className="font-semibold">{t.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">{t.comment}</p>
              </div>
            ))}
          </div>
        </div> */}

   

      </div>
    </section>
  );
}
