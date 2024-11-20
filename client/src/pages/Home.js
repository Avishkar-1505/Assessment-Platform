import React from 'react'
import main from "../assets/rb_4292.png";
import { Link } from 'react-router-dom';



const Home = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
          {/* info */}
          <div className='flex items-center justify-center flex-col gap-10'>
            <h1 className='text-2xl font-bold md:text-6xl'>Assessment Platform</h1>
            <p className='font-medium text-md text-left max-w-[40rem] text-black'>
            Our platform is designed to simplify and elevate the testing process for educators and learners alike.
            With powerful tools for creating, managing, and evaluating assessments, our platform helps instructors focus
            on what matters most supporting student growth.
            Join us in redefining assessments with technology that adapts to your needs, streamlines your workflow, and fosters learning success!
            </p>
            <Link to='/signup' className=' text-lg bg-olive px-[12px] py-[8px] text-black rounded-md'>
              Login/Register
            </Link>
          </div>
          <img src={main} className='h-[500px]'/>
    </div>
  )
}

export default Home