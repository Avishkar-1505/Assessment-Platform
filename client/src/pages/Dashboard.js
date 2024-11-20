import { Button } from '@nextui-org/react'
import { logout } from '../services/operations/instructorApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar'


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading: authLoading} = useSelector( (state) => state.user)

    if (authLoading) {
        return (
          <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
            <div>loading</div>
          </div>
        )
    }


    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>

            <Sidebar/>

            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <div className='mx-auto w-11/12 py-10'>
                    <Outlet/>
                </div>
            </div>
            
            
        </div>
    )
}

export default Dashboard