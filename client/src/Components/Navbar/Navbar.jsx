// Components/Navbar/Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import { FaIdBadge, FaSignOutAlt, FaUser, FaChevronDown } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../../Redux/Features/authSlice';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.user?.username) || 'User';

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(login(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/dashboard/login');
  };

  return (
    <nav className="fixed top-0 left-0 md:left-64 right-0 bg-white px-4 py-2 sm:py-3 flex justify-between items-center z-50 shadow ml-16 md:ml-0">
      <div className="flex items-center gap-3 text-base sm:text-lg">
        <FaPerson className="text-gray-700" />
        <span className="text-gray-800 font-semibold">Admin Dashboard</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-white bg-[#B72765] rounded hover:bg-[#B72790] transition duration-300 text-sm sm:text-base cursor-pointer"
        >
          <FaUser />
          {username}
          <FaChevronDown className="text-xs mt-0.5" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow z-50 py-1">
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              onClick={() => setDropdownOpen(false)}
            >
              <FaIdBadge />
              Visit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
