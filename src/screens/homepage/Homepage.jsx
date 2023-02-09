import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { activeUser } from '../../helper/UserApi';
import NavBar from './components/NavBar'
import './homepage.css'


const Homepage = () => {
  return (
    <div className='container mx-auto homepageCss w-10/12'>
      <NavBar/>
    </div>
  )
}

export default Homepage