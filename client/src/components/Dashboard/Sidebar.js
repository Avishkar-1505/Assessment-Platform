import React from 'react'
import SidebarLinks from './SidebarLinks';
import { Button } from '@nextui-org/react';
import { logout } from "../../services/operations/instructorApi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'

const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "My Tests",
    path: "/dashboard/test-details",
    icon: "VscVm",
  },
  {
    id: 3,
    name: "Create Test",
    path: "/dashboard/create-test",
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "Contribute Question",
    path: "/dashboard/create-question",
    icon: "VscHeart",
  }
  
];

const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[2px] border-r-richblack-50 py-10 bg-dark-blue-s">
         <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        return (
                            <SidebarLinks link={link} iconName={link.icon} key={link.id} />
                        )
                    })
                }
          </div>

          <Button className='bg-teal-400 mt-8' onClick={()=>{dispatch(logout(navigate))}}>
                <VscSignOut className='text-lg'/>
                <span>Logout</span>
          </Button>
    </div>
  )
}

export default Sidebar