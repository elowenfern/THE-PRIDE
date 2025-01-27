import React from 'react';
import { FcSelfServiceKiosk } from 'react-icons/fc';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/Navigation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { ADMINLOGOUT } from '../../Redux/ActionType';

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/adminn/logout/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      // Clear token from redux
      dispatch({ type: ADMINLOGOUT });
      // Redirect to login page
      navigate('/adminn');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <FcSelfServiceKiosk fontSize={24} />
        <span className='text-neutral-100 text-lg'>The Pride</span>
      </div>
      <div className='flex-1 py-8 flex flex-col gap-0.5'>
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames('text-red-500 cursor-pointer', linkClasses)}
          onClick={handleLogout}
        >
          <span className='text-xl'><HiOutlineLogout /></span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();

  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'text-white' : 'text-neutral-400', linkClasses)}>
      <span className='text-xl'>{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}

export default Sidebar;

