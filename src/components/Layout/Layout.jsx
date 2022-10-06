import React from 'react'
import MainArea from '../MainArea/MainArea'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  return (
    <>
        <div className='main'>
            <Sidebar />
            <MainArea />
        </div>
    </>
  )
}

export default Layout