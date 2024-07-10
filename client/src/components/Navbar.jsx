import React, { useContext, useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

import logo from '../images/logo (2).png'
import darkLogo from '../images/logo-black.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'


const NavbarItems = ({title, classProps}) => {
  return(
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )
}

const Navbar = ({mode="dark"}) => {

  const navigate = useNavigate()

  const { currentUser } = useContext(UserContext);
  console.log(currentUser)

  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <nav className={`${mode === "dark" ? "" : "border-b border-black border-b-3"} w-full flex md:justify-center justify-between items-center p-4 `}>
      <div className={`md:${mode === "dark" ? "flex-[0.5]" : "flex-[0.3]"} flex-initial justify-center items-center`}>
        <Link to={'/'}><img src={mode === 'dark' ? logo : darkLogo} alt="logo" className='w-56 cursor-pointer'/></Link>
      </div>
      <ul className={`${mode==="dark"?"text-white":"text-black"} md:flex hidden list-none flex-row justify-between items-center flex-initial`}>
        {["Simulator", "Services", "About"].map((item, index) => {
          if (item === "Simulator" && currentUser) {
            return (
              <Link to='/my-dashboard' key={item+index}>
                <NavbarItems title={item} />
              </Link>
            );
          } else {
            return <NavbarItems key={item+index} title={item} />;
          }
})}
        {!currentUser ? <Link to={`/login`}>
          <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            Login
          </li>
        </Link> : <Link to={`/logout`}>
          <li className='bg-red-600 text-white py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-red-600' onClick={() => navigate('/login')}>
            Logout
          </li>
        </Link>}
      </ul>

      <div className='flex relative'>
        { toggleMenu 
          ? <AiOutlineClose fontSize={28} className={`${mode==="dark"?"text-white":"text-black"} md:hidden cursor-pointer`} onClick={() => setToggleMenu(!toggleMenu)}/>
          : <HiMenuAlt4 fontSize={28} className={`${mode==="dark"?"text-white":"text-black"} md:hidden cursor-pointer`} onClick={() => setToggleMenu(!toggleMenu)}/>
        }

        {toggleMenu && (
          <ul className={`z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism ${mode==="dark"?"text-white":"text-black"} animate-slide-in`}>
            <li className='text-xl w-full my-2'><AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(!toggleMenu)}/></li>

            {["Simulator", "Services", "About"].map((item, index) => (
              <NavbarItems key={item+index} title={item} classProps={`my-2 text-lg`}/>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
