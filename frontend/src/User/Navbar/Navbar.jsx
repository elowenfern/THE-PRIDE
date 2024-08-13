import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCaretDown, FaSearch, FaShoppingCart } from 'react-icons/fa';
import Logo from '../../Asset/Logo.png';
import { LOGOUT } from '../../Redux/ActionType';

function Navbar() {
  const Menu = [
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'Courses', link: '/course' },
    { id: 3, name: 'About Us', link: '/About' },
    { id: 4, name: 'Contact', link: '/Contact' },
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user information from Redux store
  const user = useSelector((state) => state.user);
  console.log("User object from Redux:", user);

  // Load the theme from localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Update localStorage and apply the theme class to the document body
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Toggle the theme state
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Toggle the menu visibility on small screens
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('token');
    navigate('/');
  };

  // Determine which dropdown links to show based on user login status and type
  const DropdownLinks = user && user.userType ? (
    [
      { id: 1, name: 'Profile', link: user.userType === 'student' ? '/student' : '/teacher' },
      { id: 2, name: 'Logout', link: '' }, // Use a placeholder link
    ]
  ) : (
    [
      { id: 1, name: 'Login', link: '/login' },
      { id: 2, name: 'Register', link: '/register' },
    ]
  );

  return (
    <div>
      {/* Upper Navbar */}
      <div className={`py-3 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'}`}>
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-bold text-2xl flex items-center gap-2">
            <img src={Logo} alt="Logo" className="w-20 h-auto" />
            THE PRIDE
          </a>

          {/* Mobile Menu Button */}
          <button
            className={`block lg:hidden p-2 ${isDarkMode ? 'text-white' : 'text-white'}`}
            onClick={toggleMenu}
          >
            <FaCaretDown className={`transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Right-aligned Items */}
          <div className={`flex flex-col lg:flex-row items-center lg:ml-auto gap-4 mt-4 lg:mt-0 w-full lg:w-auto ${isMenuOpen ? 'block' : 'hidden lg:flex'}`}>
            {/* Search Bar */}
            <div className="relative w-full lg:w-auto flex-1 lg:flex-none group">
              <input
                type="text"
                placeholder="Search"
                className={`w-full lg:w-48 group-hover:w-60 transition-all duration-300 rounded-full border px-2 py-1 focus:outline-none 
                  ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-white text-black placeholder-gray-500 border-gray-300'} 
                `}
              />
              <FaSearch className={`text-gray-500 group-hover:text-primary absolute top-1/2 transform -translate-y-1/2 right-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Order Button */}
            <button
              onClick={() => alert('Ordering not available yet')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-1 px-4 rounded-full flex items-center gap-2 group hover:from-orange-500 hover:to-yellow-400 transition duration-300"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order
              </span>
              <FaShoppingCart className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="bg-secondary text-white py-2 px-4 rounded-full transition duration-300 hover:bg-secondary-dark"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="lg:hidden">
        <ul className={`flex flex-col items-center gap-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className="inline-block px-4 py-2 hover:text-primary duration-200">
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-2 py-2">
              Pages
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-40 rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a 
                      href={data.link} 
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      onClick={data.name === 'Logout' ? (e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleLogout(); // Call logout handler
                      } : undefined}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      
      {/* Lower Navbar for larger screens */}
      <div className="hidden lg:flex justify-center">
        <ul className="flex items-center gap-4">
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className="inline-block px-4 py-2 hover:text-primary duration-200">
                {data.name}
              </a>
            </li>
          ))}
          {/* Simple Dropdown */}
          <li className="group relative cursor-pointer">
            <a href="#" className="flex items-center gap-2 py-2">
              Pages
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-40 rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a 
                      href={data.link} 
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      onClick={data.name === 'Logout' ? (e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleLogout(); // Call logout handler
                      } : undefined}
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;