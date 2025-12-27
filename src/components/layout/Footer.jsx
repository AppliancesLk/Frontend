import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10 "  style={{ marginLeft: "-3.17%", marginRight: "-3.17%" }}>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Location: Mahargama, Colombo</p>
          <p>Email: <a href="mailto:sandaruwan@gmail.com" className="hover:text-yellow-400">sandaruwan@gmail.com</a></p>
          <p>Mobile: <a href="tel:7766448844" className="hover:text-yellow-400">7766448844</a></p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Shop</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social / Other Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
          </div>
          <p className="text-sm text-gray-400">
            Appliance.lk is your one-stop online store for electronics, accessories, and more. Enjoy secure shopping, fast delivery, and exclusive deals this holiday season.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Appliance.lk. All Rights Reserved.
      </div>
    </footer>
  );
}
