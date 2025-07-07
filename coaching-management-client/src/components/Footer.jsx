import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content">
 
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-primary">SmartCCM</h3>
              <p className="text-sm text-base-content/70">Coaching Dashboard</p>
            </div>
            <p className="text-base-content/80 leading-relaxed">
              Your complete solution for coaching management. Manage batches, track attendance, 
              and publish notices - all from one place.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.482-1.995.699 0 1.037.219 1.037 1.142 0 .695-.442 1.737-.219 2.695.199.662.939 1.142 1.737 1.142 2.081 0 3.482-2.19 3.482-5.057 0-2.634-1.897-4.477-4.597-4.477-3.139 0-4.976 2.355-4.976 4.794 0 .946.365 1.96.823 2.513a.311.311 0 0 1 .072.303c-.079.324-.256 1.044-.292 1.192-.046.188-.151.228-.349.137-1.284-.599-2.088-2.477-2.088-3.979 0-3.464 2.513-6.64 7.252-6.64 3.805 0 6.765 2.718 6.765 6.348 0 3.785-2.386 6.83-5.698 6.83-1.112 0-2.162-.583-2.518-1.271 0 0-.552 2.103-.687 2.615-.249.948-.923 2.137-1.374 2.866C9.505 23.68 10.746 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

        
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-base-content/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/admin-dashboard" className="text-base-content/80 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-base-content/80 hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-base-content/80 hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <a href="#" className="text-base-content/80 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/80 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Features</h4>
            <ul className="space-y-2">
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Batch Management
              </li>
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Student Tracking
              </li>
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Attendance System
              </li>
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Notice Board
              </li>
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Real-time Reports
              </li>
              <li className="text-base-content/80">
                <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
                Admin Controls
              </li>
            </ul>
          </div>

          {/*Contact*/}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-base-content/80 text-sm">
                   Mirpur,<br />
                    Dhaka 1234
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <p className="text-base-content/80 text-sm">+880 1234-567890</p>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <p className="text-base-content/80 text-sm">info@smartccm.com</p>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p className="text-base-content/80 text-sm">
                 Everyday: 8:00 AM - 8:00 PM<br />
               
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter*/}
      <div className="bg-base-200 border-t border-base-content/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-primary mb-2">Stay Updated</h3>
              <p className="text-base-content/80">
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

      {/* Bottom */}
      <div className="bg-base-300 border-t border-base-content/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-base-content/60 text-sm text-center md:text-left">
              © 2025 SmartCCM. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer