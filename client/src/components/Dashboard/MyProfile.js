import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import {disableTest, enableTest} from "../../services/operations/testApi"
import { getDetails } from '../../services/operations/instructorApi'

const MyProfile = () => {

    const {user, token} = useSelector( (state) => state.user)
    const navigate = useNavigate();
    const [createdTests, setCreatedTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // console.log(token)

    // console.log(user.createdTests)

    const handleDisable = async(testId, testName) => {
        dispatch(disableTest(testId, testName, user._id, token))
        update()
    }

    const handleEnable = async(testId, testName) => {
        dispatch(enableTest(testId, testName, user._id, token))
        update()
    }


    const update = async() => {
        setLoading(true)
        dispatch(getDetails(token))
        if (user.createdTests) setCreatedTests(user.createdTests)
        setLoading(false)
    }

    useEffect(()=>{
        update()
    }, [])

    // useEffect(()=>{
    //     update()
    // }, [handleDisable, handleEnable])

  return (
    <div className='w-full'>
        <h1 className='mb-5 text-3xl font-medium text-black'>
            My Profile
        </h1>

        <div className='flex flex-col items-start gap-x-4'>
            
                    <h1 className="text-2xl font-bold text-black">
                        Hi {user?.firstName} 👋
                    </h1>
                    <p className="font-medium text-black mb-10">
                        Let's start something new
                    </p>
               
                
                <div className="flex min-w-[300px] rounded-md bg-teal-400 p-6 mb-5">
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-lg text-black">Total Tests Created</p>
                            <p className="text-3xl font-semibold text-black">
                                {createdTests.length}
                            </p>
                        </div>
                    </div>
                </div>

                <Card className="py-4" shadow='lg' fullWidth>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-lg uppercase font-bold">Recent Tests</p>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2 gap-y-5">
                    {createdTests.slice(0, 3).map((test) => (
                            <Card key={test._id} className="bg-richblack-50 ">
                            <CardBody className="mt-2 w-full">
                                <p className="text-lg font-medium text-black">
                                <span>Test Name: </span>
                                {test.testName}
                                </p>
                                <p>Questions: {test.questions.length}</p>
                                <p>Submissions: {test?.submissions}</p>
                            </CardBody>
                            <CardFooter className='gap-x-2'>
                                <Button className="text-sm bg-red-500" onClick={()=>{navigate(`/dashboard/test-details/${test._id}`)}}>
                                    See Details
                                </Button>
                                {
                                    test.enabled ?
                                    <Button className="text-tiny bg-red-500" onClick={()=>{handleDisable(test._id, test.testName);
                                    }}>
                                        Disable
                                    </Button>
                                    :
                                    <Button className="text-tiny bg-red-500" onClick={()=>{handleEnable(test._id, test.testName)}}>
                                        Enable
                                    </Button>
                                    
                                }
                                

                            </CardFooter>
                            </Card>
                    ))}
                    </CardBody>
                </Card>
                

                <div className="my-4 flex flex-col items-start  space-y-6">
                       
                </div>
                
        </div>



    </div>
  )
}

export default MyProfile