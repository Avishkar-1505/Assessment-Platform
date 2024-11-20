import React, { useState } from 'react'
import { Button, Image, Input } from '@nextui-org/react'
import starttest from "../assets/rb_2754.png"
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { startTest } from '../services/operations/studentApi'


const StartTest = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch();
  const navigate = useNavigate();



  const onClick = async(data) => {
      try{
        dispatch(startTest(data.name, data.email, data.testId, navigate))
      }catch(err){
        console.log("Unable to start test", err)
      }
  }


  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-evenly'>
      <Image src={starttest} width={600}/>
      <form className='w-[500px]' onSubmit={handleSubmit(onClick)}>
        <div className='space-y-4 mb-4'>
          <label className="text-lg text-black" htmlFor="name">
            Enter Full Name <sup className="text-pink-500">*</sup>
          </label>
          <Input
            id='name'
            size='lg'
            color='primary'
            placeholder="Enter Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
              Name is required
            </span>
          )}
        </div>

        <div className='space-y-2 mb-4'>
          <label className="text-lg text-black" htmlFor="email">
            Email <sup className="text-pink-500">*</sup>
          </label>
          <Input
            id='email'
            size='lg'
            color='primary'
            placeholder="Enter Email"
            {...register("email", { required: true })}
  
          />
          {errors.email && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
              email is required
            </span>
          )}
        </div>

        <div className='space-y-2 mb-4'>
          <label className="text-lg text-black" htmlFor="email">
            Test ID <sup className="text-pink-500">*</sup>
          </label>
          <Input
            id='testId'
            size='lg'
            color='primary'
            placeholder="Enter Test ID"
            {...register("testId", { required: true })}
  
          />
          {errors.testId && (
            <span className="ml-2 text-xs tracking-wide text-pink-500">
              Test ID is required
            </span>
          )}
        </div>

        <Button size='lg' color='success' type='submit'>Start Test</Button>
      </form>
    </div>
  )
}

export default StartTest