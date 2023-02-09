import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import Recovery from './components/Recovery.jsx'
import Reset from './components/Reset.jsx'
import Register from './components/Register.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import Homepage from './screens/homepage/Homepage';

const router = createBrowserRouter([
  {
    path : '/login',
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
  {
    path : '/',
    element : <Homepage/>
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
