import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaGithub, FaRedditAlien } from 'react-icons/fa'
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone, HiOutlineClock } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-primary">SmartCCM</h3>
              <p className="text-sm text-gray-400">Coaching Dashboard</p>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your complete solution for coaching management. Manage batches, track attendance, 
              and publish notices - all from one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaRedditAlien className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/admin-dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Features</h4>
            <ul className="space-y-2 text-gray-300">
              {[
                "Batch Management",
                "Student Tracking",
                "Attendance System",
                "Notice Board",
                "Real-time Reports",
                "Admin Controls"
              ].map((feature, idx) => (
                <li key={idx}>
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Contact Info</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Mirpur,<br />Dhaka 1234</p>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="text-primary w-5 h-5 flex-shrink-0" />
                <p>+880 1234-567890</p>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineMail className="text-primary w-5 h-5 flex-shrink-0" />
                <p>info@smartccm.com</p>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineClock className="text-primary w-5 h-5 flex-shrink-0" />
                <p>Everyday: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-primary mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Subscribe to get the latest news and updates about SmartCCM features
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input input-bordered flex-1 md:w-64"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 SmartCCM. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
