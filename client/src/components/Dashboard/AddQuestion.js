import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import {Textarea} from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { createQuestion } from '../../services/operations/questionsApi'



const AddQuestion = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const { token } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);


  // Function to add a new test case
  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  // Function to remove a test case
  const removeTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  // Function to handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTestCases = [...testCases];
    updatedTestCases[index][name] = value;
    setTestCases(updatedTestCases);
  };

  const onSubmit = async(data) => {
    setLoading(true);

    const markdownBlob = new Blob([data.description], { type: "text/markdown" });
    const markdownFile = new File([markdownBlob], "description.md");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", markdownFile);

    testCases.forEach((testCase, index) => {
      formData.append(`testCases[${index}][input]`, testCase.input);
      formData.append(`testCases[${index}][expectedOutput]`, testCase.output);
    });


    try{
      dispatch(createQuestion(formData, token));
    }catch(err){
      console.log("Error while creating question", err)
    }

    setLoading(false);
    navigate("/dashboard/my-profile")
  }


  return (
    <div>
      {!loading  ? (
        <div>
          <p className="text-2xl font-semibold text-black">Add Question</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
          <div className='space-y-2'>
              <label className="text-lg text-black" htmlFor="title">
                Title <sup className="text-pink-500">*</sup>
              </label>
              <Input
                id='title'
                size='lg'
                color='primary'
                placeholder="Enter A Title"
                {...register("title", { required: true })}
                className="max-w-xs"
              />
              {errors.title && (
                <span className="ml-2 text-xs tracking-wide text-pink-500">
                  Title is required
                </span>
              )}
          </div>
          
          <div>
            <p className='text-black text-lg mt-5'>Description<sup className="text-pink-500 mb-3">*</sup></p>
            <Textarea
              id='description'
              isRequired
              placeholder="Enter your description in markdown format with explanation about input and output"
              className="text-xl text-black"
              varient="bordered"
              color='primary'
              size='md'
              {...register("description", { required: true })}
            />
            {errors.description && (
                <span className="ml-2 text-xs tracking-wide text-pink-500">
                  Description is required
                </span>
              )}
          </div>
          
          <div>
            <p className='text-black text-lg mt-5'>Test Cases<sup className="text-pink-500 mb-3">*</sup></p>
            {testCases.map((testCase, index) => (
              <Card key={index} className="gap-y-5 p-3 mb-4">
                <Textarea
                  type="text"
                  name="input"
                  placeholder="Input"
                  value={testCase.input}
                  varient="bordered"
                  onChange={(e) => handleInputChange(index, e)}
                  color='primary'
                />
                <Textarea
                  type="text"
                  name="output"
                  placeholder="Output"
                  value={testCase.output}
                  varient="bordered"
                  onChange={(e) => handleInputChange(index, e)}
                  color='primary'
                />
                {testCases.length > 1 && (
                  <Button className="max-w-[100px]" color='danger' onClick={() => removeTestCase(index)}><MdDelete />
                  </Button>
                )}
              </Card>
            ))}
            <Button className='mt-4' onClick={addTestCase} color='secondary'>+</Button>
          </div>
          

          <Button type='submit' color='success' size='lg'>Submit</Button>

          </form>
        </div>
        
      )
        :<div>Loading</div>
      }
      
    </div>
  )
}

export default AddQuestion