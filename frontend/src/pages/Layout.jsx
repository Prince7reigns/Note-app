import Navbar from '@/components/Header/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className='p-3 h-full'>
      <Navbar/>
      <main className='h-full' >
        <Outlet/>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
       
    </div>
  )
}

export default Layout
