import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";
import {disableTest, enableTest} from "../../services/operations/testApi"
import { getDetails } from '../../services/operations/instructorApi'

const TestDetails = () => {

    const {user, token} = useSelector( (state) => state.user)
    const navigate = useNavigate();
    const [createdTests, setCreatedTests] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDisable = (testId, testName) => {
        dispatch(disableTest(testId, testName, user._id, token))
        
    }

    const handleEnable = (testId, testName) => {
        dispatch(enableTest(testId, testName, user._id, token))
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

  return (
    <div className='w-full'>

    <Card className="py-4" shadow='lg' fullWidth>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-lg uppercase font-bold">All Tests</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2 gap-y-5">
            {createdTests.map((test) => (
            <Card key={test._id} className="bg-richblack-50">
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

    </div>
  )
}

export default TestDetails