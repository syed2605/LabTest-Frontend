import React from 'react';
import { NavLink } from 'react-router-dom';
import type { MenuItem } from '../../interfaces/CommonInterface';
import { STAFF_MENU } from '../../constants/constants';



export const Sidebar: React.FC = () => {

    const menuItems : MenuItem[] = STAFF_MENU
  return (
    <div className="w-64 min-h-screen bg-[#e3e8e8] shadow-md flex flex-col">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-6 py-3 text-black hover:bg-[#c8cccc] font-medium rounded-[4px] ${
              isActive ? 'bg-[#c8cccc]' : ''
            }`
          }
        >
          <span className='text-black'>{item.label}</span>
          
        </NavLink>
      ))}
    </div>
  );
};
