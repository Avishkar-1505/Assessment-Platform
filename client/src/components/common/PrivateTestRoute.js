import React from 'react'
import { useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const PrivateTestRoute = ({children}) => {

    const location = useLocation();

    const {student} = useSelector((state) => state.student)

    console.log(student)

    if(!student){
        return (
            <Navigate to={"/start-test"}/>
        )
    }

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    const route = "/test/" + student.testId
    if(matchRoute(route)){
        return children
    }

    return (
        <Navigate to={"/start-test"}/>
    )
}

export default PrivateTestRoute