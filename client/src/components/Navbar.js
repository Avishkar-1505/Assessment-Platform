import React, { useState } from 'react'
import logo from "../assets/logo.png"
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import {Link, matchPath} from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

const Navbar = () => {
    const location = useLocation();

    const NavbarLinks = [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "Instructor",
          path: '/dashboard/my-profile',
        },
        {
          title: "Start a Test",
          path: "/start-test",
        },
        {
          title: "Contact Us",
          path: "/contact",
        },
    ];

    const {token, user} = useSelector((state) => state.user);

    // console.log(token)

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    

  return (
    <div className='flex h-14 items-center justify-center border-b-[3px] border-b-richblack-50 bg-dark-blue-s'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>


            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy'/>
            </Link>

            {/* Nav links */}

            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                    <Link to={link?.path}>
                                        {<p className={`${matchRoute(link?.path) ? "text-white font-bold" :
                                        "text-richblack-50"}`}>
                                        {link.title}</p>}
                                    </Link>
                            }
                        </li>
                    ))
                }
                </ul>
            </nav>

            {/* LOgin/Signup button */}
            
            <div className='flex gap-x-4 items-center'>
            
            {
                token === null && (
                    <Link to='/signup'>
                        <button className='
                        bg-teal-400 px-[12px] py-[8px] text-black rounded-md'>
                        Login</button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to='/signup' className=' 
                        bg-teal-400 px-[12px] py-[8px] text-black rounded-md'>
                        <button>Register</button>
                    </Link>
                )
            }
            {/* {
                token !== null && <ProfileDropdown/>
            } */}
            </div>
            
            <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>

        </div>
    </div>
  )
}

export default Navbar