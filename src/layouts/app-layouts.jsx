import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main>
 
     {/* HEADER */}
     {/* BODY */}<Outlet/>

        </main>

        {/* FOOTER */}
      
    </div>
  )
}

export default AppLayout
