import React from 'react'
import { Contexto } from '../../context/AppContext'
import MainArea from '../MainArea/MainArea'
import Sidebar from '../Sidebar/Sidebar'

const Layout = () => {
  return (
    <>
        <div className='main'>
          <Contexto>
            <Sidebar />
            <MainArea />
          </Contexto>
        </div>
    </>
  )
}

export default Layout