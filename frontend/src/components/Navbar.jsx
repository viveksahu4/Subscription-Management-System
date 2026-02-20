import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdown, setDropdown] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top contact bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <span className="icon-phone">📞</span> 8966977389, 9981068683
            </span>
            <span className="top-bar-item">
              <span className="icon-email">✉</span> cstechsv2531@gmail.com
            </span>
          </div>
          <div className="top-bar-right">
            <a href="#" className="social-icon" aria-label="Facebook">f</a>
            <a href="#" className="social-icon" aria-label="Google+">G+</a>
            <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="navbar">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <span className="brand-main">CStech</span>
            <span className="brand-sub">Gym</span>
          </Link>

          <div className="nav-links">
            <Link to="/" className={isActive('/') ? 'active' : ''}>HOME</Link>

            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdown('about')}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link to="/about" className={location.pathname.startsWith('/about') ? 'active' : ''}>ABOUT US</Link>
              {dropdown === 'about' && (
                <div className="dropdown-menu">
                  <Link to="/about">The CStech Gym</Link>
                  <Link to="/about#vision">Vision & Mission</Link>
                </div>
              )}
            </div>

            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdown('classes')}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link to="/classes" className={location.pathname.startsWith('/classes') ? 'active' : ''}>CLASSES</Link>
              {dropdown === 'classes' && (
                <div className="dropdown-menu">
                  <Link to="/classes/aerobics">Aerobics</Link>
                  <Link to="/classes/bhangra">Bhangra</Link>
                  <Link to="/classes/body-sculpting">Body Sculpting</Link>
                  <Link to="/classes/cardio">Cardio</Link>
                  <Link to="/classes/crossfit">CrossFit</Link>
                  <Link to="/classes/fitness-studio">Fitness Studio</Link>
                  <Link to="/classes/power-yoga">Power Yoga</Link>
                  <Link to="/classes/spinning">Spinning</Link>
                  <Link to="/classes/strength">Strength</Link>
                  <Link to="/classes/zumba">Zumba</Link>
                </div>
              )}
            </div>

            <Link to="/diet" className={isActive('/diet') ? 'active' : ''}>DIET COUNSELING</Link>

            <div
              className="nav-dropdown"
              onMouseEnter={() => setDropdown('fitness')}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link to="/workout" className={location.pathname.startsWith('/workout') || location.pathname.startsWith('/nutrition') ? 'active' : ''}>HEALTH & FITNESS</Link>
              {dropdown === 'fitness' && (
                <div className="dropdown-menu">
                  <Link to="/workout">Workout</Link>
                  <Link to="/nutrition">Nutrition</Link>
                  <Link to="/calculators">Fitness Calculators</Link>
                </div>
              )}
            </div>

            <Link to="/spa" className={isActive('/spa') ? 'active' : ''}>SPA</Link>
            <Link to="/swimming" className={isActive('/swimming') ? 'active' : ''}>SWIMMING</Link>

            {user ? (
              <>
                <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>CONTACT US</Link>
                <div
                  className="nav-dropdown"
                  onMouseEnter={() => setDropdown('member')}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <span className="nav-member">MEMBER AREA</span>
                {dropdown === 'member' && (
                  <div className="dropdown-menu">
                    {user.role === 'admin' ? (
                      <>
                        <Link to="/admin">Dashboard</Link>
                        <Link to="/admin/users">Manage Users</Link>
                        <Link to="/admin/subscriptions">Manage Subscriptions</Link>
                        <Link to="/admin/reports">Reports</Link>
                        <Link to="/admin/settings">Settings</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/subscriptions">My Subscriptions</Link>
                        <Link to="/purchase">Purchase</Link>
                        <Link to="/reports">Reports</Link>
                        <Link to="/profile">Profile</Link>
                      </>
                    )}
                    <button onClick={handleLogout} className="dropdown-logout">Logout</button>
                  </div>
                )}
              </div>
              </>
            ) : (
              <>
                <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>CONTACT US</Link>
                <Link to="/login" className="nav-login">LOGIN</Link>
                <Link to="/register" className="btn btn-primary btn-sm nav-register">REGISTER</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
