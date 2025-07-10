import React from 'react';
import { useAuth } from '../api/UseAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
<div className="navbar bg-slate-900 text-white shadow-lg sticky top-0 z-50">

      <div className="flex-1">
        <button
          className="btn btn-ghost text-xl"
          onClick={() => navigate('/')}
        >
          SmartCCM
        </button>
      </div>

      <div className="flex-none items-center">
        {/* Hamburger Menu - visible only on mobile & tablet */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><button onClick={() => navigate('/')}>Home</button></li>
            <li><button onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</button></li>
            <div className="divider my-1"></div>
            {currentUser ? (
              <li>
                <button onClick={handleLogout} className="text-error">Logout</button>
              </li>
            ) : (
              <>
                <li><button onClick={() => navigate('/login')}>Login</button></li>
                <li><button onClick={() => navigate('/register')}>Register</button></li>
              </>
            )}
          </ul>
        </div>

        {/* Menu - only on large screens */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="btn btn-ghost" onClick={() => navigate('/')}>Home</button>
          <button className="btn btn-ghost" onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</button>

          {currentUser ? (
            <>
              <button onClick={handleLogout} className="btn btn-error btn-sm">Logout</button>
              <div className="flex items-center gap-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-8">
                    <span className="text-xs">
                      {currentUser?.email?.charAt(0).toUpperCase() || ''}
                    </span>
                  </div>
                </div>
                <span className="text-sm">{currentUser?.email || ''}</span>
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => navigate('/login')}>Login</button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
