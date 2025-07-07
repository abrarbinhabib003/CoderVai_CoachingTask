import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOfficeBuilding, HiUserGroup, HiBadgeCheck } from 'react-icons/hi';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="hero min-h-screen bg-gray-200">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SmartCCM
            </h1>
            <h2 className="text-3xl font-semibold text-base-content mt-2">
              Coaching Dashboard
            </h2>

          </div>

          {/* Subtitle */}
          <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Manage batches, track attendance, and publish notices – all from one place.
            Your complete solution for coaching management made simple.
          </p>

          {/* Achievements */}
<div className="stats stats-vertical lg:stats-horizontal shadow-lg mb-10 bg-base-100">
  <div className="stat">
    <div className="stat-figure text-primary">
      <HiOfficeBuilding className="w-8 h-8" />
    </div>
    <div className="stat-title">Branches</div>
    <div className="stat-value text-primary">64+</div>
    <div className="stat-desc">In All District</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <HiUserGroup className="w-8 h-8" />
    </div>
    <div className="stat-title">Teachers</div>
    <div className="stat-value text-secondary">50+</div>
    <div className="stat-desc">Qualified & Experienced Faculty</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-accent">
      <HiBadgeCheck className="w-8 h-8" />
    </div>
    <div className="stat-title">Successes</div>
    <div className="stat-value text-accent">500+</div>
    <div className="stat-desc">University Admissions Achieved</div>
  </div>
</div>

          {/* CTA Button */}
          <div className="flex justify-center items-center mb-10">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/login')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Get Started
            </button>
          </div>

          
        
        </div>
      </div>
    </div>
  );
};

export default Banner;