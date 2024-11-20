import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { getQuestions } from '../../services/operations/questionsApi'
import { Button, Input } from '@nextui-org/react'
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { createTest } from '../../services/operations/testApi'
import { useNavigate } from 'react-router-dom'


const CreateTest = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const { token, user } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([]);
    const dispatch = useDispatch()
    const [values, setValues] = React.useState(new Set([]));

    const arrayValues = Array.from(values);

    console.log(arrayValues)

    const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow

        className="w-full flex py-0.5 px-2 gap-1 border-medium border-b-dark-blue-s pb-2"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>{questions.find((que) => `${que._id}` === `${value}`).title}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

    const onSubmit = async(data) => {
        setLoading(true);
        if (!arrayValues.length) {
            alert("Add atleast one question in test")
            setLoading(false);
            return;
        }

        try{
            dispatch(createTest(data.testName, user._id, arrayValues, token))
        }
        catch(err){
            console.log("Error while Creating test", err)
            setLoading(false);
            return;
        }
        setLoading(false);
        navigate("/dashboard/test-details")
        

    }



    useEffect(()=>{
        const fetchData = async() => {
            setLoading(true)

            try{
                const ques = await getQuestions(token);

                if(ques.length > 0){
                    setQuestions(ques)
                }
            }
            catch(err){
                console.log("Questions fetch error", err)
            }

            setLoading(false)
        }

        fetchData()
    }, [])

  return (
        <>
            {!loading ?
            <div>
                <p className="text-2xl font-semibold text-black">Create Test</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
                    <div className='space-y-2'>
                        <label className="text-lg text-black" htmlFor="testName">
                            Test Name <sup className="text-pink-500">*</sup>
                        </label>
                        <Input
                        id='testName'
                        size='lg'
                        color='primary'
                        placeholder="Enter A Suitable Name"
                        {...register("testName", { required: true })}
                        className="max-w-xs"
                        />
                        {errors.testName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-500">
                                Test name is required
                            </span>
                        )}
                    </div>
                    
                    <p className='text-black text-lg mt-5'>Select Questions <sup className="text-pink-500">*</sup></p>
                    <ListboxWrapper>
                        <Listbox
                            topContent={topContent}
                            classNames={{
                            base: "",
                            list: "max-h-[300px] overflow-scroll",
                            }}
                            items={questions}
                            label="Assigned to"
                            selectionMode="multiple"
                            onSelectionChange={setValues}
                            variant="flat"
                        >
                            {(item) => (
                            <ListboxItem key={item._id} textValue={item.title}>
                                <div className="flex gap-2 items-center">
                                
                                <div className="flex flex-col">
                                    <span className="text-small">{item.title}</span>
                                </div>
                                </div>
                            </ListboxItem>
                            )}
                        </Listbox>
                        
                    </ListboxWrapper>

                    <Button type='submit' size='lg' color='success' variant="shadow" disabled={loading}
                    >Create</Button>
                    
                </form>
            </div>
        : <div>Loading</div>
        }
    
        </>
    )
  
}

export default CreateTest