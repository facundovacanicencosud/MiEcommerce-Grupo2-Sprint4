import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  return (
    <>
        <div className='main'>
            <Sidebar />
            <div className='main-area'>
                <Navbar />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    </>
  )
}

export default Layout