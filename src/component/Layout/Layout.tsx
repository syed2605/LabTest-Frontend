import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useNavigate } from 'react-router-dom';
import API from '../../axios/axios';
import { BASE_URL } from '../../constants/URL';
// import { Outlet } from 'react-router-dom';
// import API from '../api/axios';
// import { BASE_URL } from '../constant/URL';

interface layoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<layoutProps> = ({ children }) => {
  const [path,setPath] = useState<string>("")
  const router=useNavigate();
  const handleLogout = async () => { 

    const userId: string = localStorage.getItem('userId')?? "";
    const res = await API.post(`${BASE_URL}/api/users/logout/${userId}`)
    console.log(res)
    if(res.status === 200){
      router("/login")
      localStorage.clear();
    }
    
  };
  setInterval(() => {
    setPath(window.location.pathname)
  },50)
  return (
    <>
      {path == '/login' ? (
        <>{children}</>
      ) : (
        <div className="flex w-screen h-screen overflow-hidden  flex-col">
          <Navbar onLogout={handleLogout} />
          <div className="flex flex-1 w-full overflow-hidden">
            <Sidebar />
            <main className="p-6 bg-gray-50 flex-1">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};
