import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserProvider from './context/userContext'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateBasket from './components/CreateBasket.jsx'
import SelectInvestmentOption from './components/SelectInvestmentOption.jsx'
import Home from './pages/Home.jsx'
import Logout from './components/Logout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>
  }, 
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/my-dashboard',
    element: <Dashboard/>
  },
  {
    path: '/create-basket',
    element: <CreateBasket/>
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/logout',
    element: <Logout/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
