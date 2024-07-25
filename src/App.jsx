import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import AppLayout from "./layouts/app-layouts"
import LandingPage from "./pages/landing"
import Dashboard from "./pages/dashboard"
import Link from "./pages/link"
import Auth from "./pages/auth"
import RedirectLink from "./pages/redirect-link"
import UrlProvider from "./context"
import RequireAuth from "./components/require-auth"


// latest method to create a router
const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:(<RequireAuth>
          <Dashboard/>
          </RequireAuth>)
      },
      {
        path:'/link/:id',
        element:(<RequireAuth>
          <Link/>
          </RequireAuth>)
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
    ]

  }
])

function App() {
  return <UrlProvider><RouterProvider router = {router}/></UrlProvider>
}

export default App
