import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import Recovery from './components/Recovery.jsx'
import Reset from './components/Reset.jsx'
import Register from './components/Register.jsx'
import PageNotFound from './components/PageNotFound.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Login/>
  },
  {
    path : '/register',
    element : <Register/>
  },
  {
    path : '*',
    element : <PageNotFound/>
  },
  {
    path : '/reset',
    element : <Reset/>
  },
  {
    path : '/recovery',
    element : <Recovery/>
  },
  {
    path : '/profile',
    element : <Profile/>
  },
])

function App() {

  return (
    <main>
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;
