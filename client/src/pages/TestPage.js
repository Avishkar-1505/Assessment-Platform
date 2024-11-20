import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Image, Card } from "@nextui-org/react";
import logo from "../assets/logo.png"
import {Pagination} from "@nextui-org/react";
import QuestionDisplay from '../components/Test/QuestionDisplay';
import CodeEditor from '../components/Test/CodeEditor';
import { useNavigate } from 'react-router-dom';
import { submitTest } from '../services/operations/studentApi';



const TestPage = () => {

  const { questions, test } = useSelector((state) => state.test)
  const { student, submissions } = useSelector((state) => state.student)


  const [currentPage, setCurrentPage] = useState(1);

  const currentQuestion = questions[currentPage - 1];
  

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handlePageChange = (page) => { 
      setCurrentPage(page);
  };

  const finishTest = async() => {
    try{
        dispatch(submitTest(student.name, student.email, student.testId, submissions, navigate));
    }catch(error){
      console.log("Error while Submitting", error)
      return;
    }
  }



  // console.log(questions)
  // console.log(test)

  // console.log(student)



  return (
    <div className='flex flex-col w-[100vw] h-[100vh]'>
      <Navbar className='bg-dark-blue-s text-white border-b-3 border-black'>
        <NavbarBrand className='mr-0'>
          <Image src={logo} width={160} height={42} />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            Test: {test.testName}
          </NavbarItem>

          <NavbarItem>
            Name: {student.name}
          </NavbarItem>

          <NavbarItem>
            Email: {student.email}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>

          <NavbarItem >
            <Button className="text-black bg-teal-400" size='lg' variant="flat" onClick={finishTest}>
              Finish Test
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      

      <div className="flex bg-zinc-100">
        {/* Left Section: Question Display */}
        
        <div className="w-2/5 border-r-2 p-2 ">
          <Card className='flex flex-row justify-between p-2 bg-teal-400 border-black border-2'>

            {currentQuestion && <h2 className="text-xl font-bold mb-2">{currentQuestion.title}</h2>}
            <Pagination 
              className="flex justify-center p-2" 
              color='danger'
              showControls
              total={questions.length}
              initialPage={1}
              onChange={handlePageChange}
            />
            
          </Card>
          
          {currentQuestion && <QuestionDisplay question={currentQuestion} />}
        </div>

        {/* Right Section: Code Editor */}
        <div className="w-3/5 ">
          <CodeEditor question={currentQuestion}/>
        </div>
      </div>


    </div>
  )
}

export default TestPage