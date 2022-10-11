import React from 'react'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Navbar from '../Navbar/Navbar'

const MainArea = () => {
  const {theme} = useContext(AppContext);
  return (
    <main className={`main-area ${theme?"dark":""}`}>
        <Navbar />
        <section>
            <Outlet />
        </section>
    </main>
  )
}

export default MainArea