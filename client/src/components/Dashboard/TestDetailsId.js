import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getTest } from '../../services/operations/testApi' 
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import { apiConnector } from '../../services/apiConnector'
import ReactMarkdown from 'react-markdown';
import axios from 'axios'
import { getResults } from '../../services/operations/instructorApi'
import { updateSubmissions } from '../../services/operations/submissionApi'

const TestDetailsId = () => {
    const HOST = "http://localhost:5000"
    const dispatch = useDispatch()
    const { testId } = useParams()
    const [loading, setLoading] = useState(false)
    const { token, user } = useSelector((state) => state.user)
    const [test, setTest] = useState();
    const [questions, setQuestions] = useState([]);
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    // console.log(testId)

    const apiClient = axios.create({
        baseURL: HOST,
    })

    
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true)
            const result = await getTest(testId, token)
            
            

            const res = await getResults(testId, token);

            console.log(result)
            if (result) {
              setTest(result)
            }

            // console.log("test", test)


            if(res.length){
                setResults(res);
            }

            // console.log("results", results)
            
            setLoading(false);
        };

        // setTotal(0);
        fetchData()

        
    }, [])

    useEffect(()=> {
        
        const fetchQues = async()=>{
            setLoading(true)
            let quetotal = 0; 
            const ques = await Promise.all(
                test.questions.map(async (que) => {
                    quetotal +=que.testCases.length
                    const res = await apiClient.get(`${HOST}/${que.description}`, {
                        responseType: "blob"
                    });
                    return await res.data.text();
                })
            );
            setTotal(quetotal)
            setQuestions(ques)

            setLoading(false)
        }


        if (test && test.questions && test.questions.length > 0) {
            // setTotal(0)
            fetchQues();
            // console.log("questions", questions)
        }

        

    },[test])

    useEffect(()=>{

        const updateSubmissionsAsync = async () => {
            setLoading(true);
            if (results && results.length > 0) {
                const subs = results.flatMap((stu) => stu.submissions.map((sub) => sub._id));
                console.log(subs)
                try {
                    dispatch(updateSubmissions(subs));
                } catch (error) {
                    console.error("Failed to update submissions:", error);
                }
            }
            setLoading(false)
        };
    
        updateSubmissionsAsync();
    }, [results])

    

    // console.log(loading)
    // console.log(test)
    // console.log(questions)


//   console.log(testId)
  return (
    <>
        {
            test && results && questions.length ? 
            
        
        (
        <div>
        <h1 className="text-2xl font-medium text-black pb-3">TEST DETAILS</h1>
        <Card className="py-4" shadow='lg' fullWidth>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-xl uppercase font-bold">{test.testName}</p>
            <p className="text-xl font-bold">Test ID: {test.testId}</p>
            <p className='text-lg'>Questions: {test.questions.length}</p>
            <p className='text-lg'>Submissions: {test?.submissions}</p>
        </CardHeader>
        <CardBody className='gap-y-4'>
            {test.questions.map((que, index)=>(
                <Card key={que._id} className="bg-yellow-200">
                <CardBody className="mt-2 w-full">
                    <p className="text-md font-medium text-black">
                        <span>Question: </span>
                        {que.title}
                    </p>
                    <p className="text-md font-medium text-black">
                        Description:
                    </p>
                    <ReactMarkdown>{questions[index]}</ReactMarkdown>

                </CardBody>
                </Card>
            ))}
        </CardBody>
        </Card>

        
        <h1 className="text-2xl font-medium text-black pb-3 mt-4">RESULTS</h1>
        <Card className="py-4" shadow='lg' fullWidth>
        
        <CardBody className='gap-y-4'>
            {
                results.length ? 
                results.map((stu, index)=>{
                    var correct = 0;
                return(
                <Card key={index} className="bg-olive">
                
                    <CardBody className="w-full">
                        <p className="text-md font-medium text-black">
                            <span>Name: </span>
                            {stu.name}
                        </p>
                        {stu.submissions.length>0 ? stu.submissions.map((sub)=>{
                            return(
                            <div key={sub._id}>
                                <p className="text-md font-medium text-black">Question: {sub.questionId.title}</p>
                                {sub.results.map((res, index)=>{
                                    if(res.result==="Accepted"){
                                        correct += 1;
                                    }
                                    return(
                                    <div key={index}>
                                        <p>Test Case {res.testCase}: {res.result}</p>
                                    </div>
                                    )
                                })}
                            </div>)
                            
                        }): <p className="text-md font-medium text-black">No Submissions</p>}

                    </CardBody>
                    <Divider className='bg-black'/>
                    <CardFooter>
                        <div>Total: {correct}/{total}</div>
                    </CardFooter>
                </Card>)
            }) 
            :<p className="text-md font-medium text-black">No Submissions</p>}
        </CardBody>
        </Card>
        

        
    </div>
    ) : (<div>Loading</div>)
    }
    </>
    
  )
}

export default TestDetailsId