import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const MainArea = () => {
  return (
    <main className='main-area'>
        <Navbar />
        <section>
            <Outlet />
        </section>
    </main>
  )
}

export default MainArea