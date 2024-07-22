import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container'>
 
     {/* HEADER */}<Header/>
     {/* BODY */}<Outlet/>

        </main>

        {/* FOOTER */}
        <div className='p-10 bg-gray-800 text-center mt-10'>
            Made By Me 
        </div>
      
    </div>
  )
}

export default AppLayout
