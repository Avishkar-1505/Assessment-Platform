import React, { useEffect, useState } from 'react'
import { Editor } from '@monaco-editor/react';
import { Button, Card, Textarea } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { languages } from '../../data/languages';
import { useDispatch, useSelector } from 'react-redux';
import { createSubmission, runTest } from '../../services/operations/submissionApi';
import { SiTicktick } from "react-icons/si";
import { RxCross1 } from "react-icons/rx";


const CodeEditor = ({ question }) => {

  // console.log(question)

  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(false)

  const { student } = useSelector((state) => state.student)

  const [activeTestCaseId, setActiveTestCaseId] = useState(0);

  const [results, setResults] = useState([]);
  const [wrong, setWrong] = useState(false);

  
  const dispatch = useDispatch();


  const handleCodeChange = (value) => {
    setCode(value);
  };

  

  const handleRun = () => {

    const runtests = async () => {
      setLoading(true);
      try {
        const res = await runTest(student.testId, question._id, code, language.id, question.testCases);
  
        if (!res || res.length === 0) {
          throw new Error("No results found")
        }
        console.log(res)
        res.map((r) => {
          if (r.status.id !== 3) {
            setWrong(true)
          }
        })
        setResults(res);
  
  
      } catch (err) {
        console.log("Error in run test", err)
      }
      setLoading(false)
    }

    runtests()
  };

  const handleSubmit = async() => {
    
    setLoading(true);
    try{
      dispatch(createSubmission(student._id, student.testId, question._id, code, language.id, question.testCases))
    }
    catch(error){
      console.log("Error while Submitting", error)
      setLoading(false);
      return;
    }
    
    setLoading(false);

  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleLanguageChange = (selectedKey) => {
    for (const item of selectedKey.values()) {
      console.log(item);
      setLanguage(languages[item])
    }
    setCode('');
  };


  useEffect(() => {
    sessionStorage.setItem(`code-${question._id}`, code);
  }, [code]);


  useEffect(() => {
    const savedCode = sessionStorage.getItem(`code-${question._id}`); // Use a unique key per question
    if (savedCode) {
      setCode(savedCode);
    }
    else {
      setCode('')
    }
  }, [question])


  return (
    <div className={`flex flex-col ${isFullScreen ? 'fixed top-0 left-0 w-full h-full z-50 bg-white' : 'relative w-full max-h-full'} transition-all`}>



      <div className='flex justify-between p-2 bg-olive rounded-sm'>

        <div >
          <label>Select Language: </label>
          {/* <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          </select> */}

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="solid"
                className="capitalize"
              >
                {language.name}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={languages}
              onSelectionChange={handleLanguageChange}
            >
              {languages.map((lang, index) => (
                <DropdownItem key={index}>{lang.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Editor and Controls */}
        <div className='mr-3'>
          <Button onClick={toggleFullScreen}>
            {isFullScreen ? 'Minimize Editor' : 'Maximize Editor'}
          </Button>
        </div>
      </div>



      <div className={`flex-grow ${isFullScreen ? 'p-4' : ''}`}>
        <Editor
          height="60vh"
          theme="dark"
          language={language.key}
          value={code}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      {!loading && results.length === 0 ?
        <div className='w-full px-5 overflow-auto mt-2'>
          {/* testcase heading */}
          <div className='flex justify-between items-center space-x-6'>
            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
              <Card className='text-md font-medium leading-5 bg-gray-300 text-black p-2 '>Testcases</Card>
            </div>
            <div className='flex justify-between gap-5'>
              <Button color="success" onClick={handleRun}>Run</Button>
              <Button color="secondary" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>

          <div className='flex'>
            {question.testCases.slice(0, 3).map((testcase, index) => (
              <div
                className='mr-2 items-start mt-2 '
                key={index}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className='flex flex-wrap items-center gap-y-4'>
                  <Card
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-300 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-black" : "text-gray-500"}
									`}
                  >
                    Case {index + 1}
                  </Card>
                </div>
              </div>
            ))}
          </div>

          <div className='font-semibold my-4'>
            <p className='text-sm font-medium mt-4 text-black'>Input:</p>
            <Textarea
              isReadOnly
              label=""
              variant='bordered'
              placeholder=""
              value={question.testCases[activeTestCaseId].input}
              className="text-black mt-2 bg-white rounded-xl shadow-md"
            />
            <p className='text-sm font-medium mt-3 text-black'>Output:</p>
            <Card className='w-full cursor-text rounded-lg border px-3 p-3 text-black mt-2'>
              {question.testCases[activeTestCaseId].expectedOutput}
            </Card>
          </div>
        </div>

        :
        
        <div className='flex flex-col w-full justify-between overflow-auto'>

          <div className='flex justify-between'>
          
            {wrong ? <Card className='p-2 text-red-600'>Test Case Failed</Card> : <Card className='p-2 text-green-600'>All Test Passed </Card>}

            <Button color="danger" className='mr-10' onClick={() => {
              setResults([])
              setWrong(false)
            }}><RxCross1/></Button>
          </div>

          <div className='flex flex-wrap flex-col max-h-52 gap-2'>

            {results.map((res, index) => (
              <div key={index} className={`w-[150px] border-sm border-black mt-3 p-3 ${res.status.id === 3 ? "bg-green-300" : "bg-red-300"}`}>Test Case {index + 1} {res.status.id === 3 ? <SiTicktick className='inline' /> : <RxCross1 className='inline' />}</div>
            ))}

          </div>
        </div>

      }
    </div>
  )
}

export default CodeEditor
