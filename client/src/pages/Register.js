import React, { useState } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, signUp } from "../services/operations/instructorApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate()
;
  const validateSignup = () => {
    if(!firstName.length){
      toast.error("First Name is required")
      return false;
    }
    if(!lastName.length){
      toast.error("Last Name is required")
      return false;
    }
    if(!email.length){
        toast.error("Email is required")
        return false;
    }
    if(!password.length){
        toast.error("Password is required")
        return false;
    }
    if(password!==confirmPassword){
        toast.error("Password and Confirm Password should be same")
        return false;
    }
    return true;
  }

  const validateLogin = () => {
    if(!email.length){
        toast.error("Email is required")
        return false;
    }
    if(!password.length){
        toast.error("Password is required")
        return false;
    }

    return true;
  }

  const handleLogin = async () => {
    if(validateLogin()){
      dispatch(login(email, password, navigate))
    }
  };

  const handleSignup = async () => {
    if(validateSignup()){
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, navigate))
    }
};  

  return (
    <div className="flex flex-col h-full w-full justify-center items-center mt-16">
      <div className="mb-5 text-4xl font-bold">Welcome</div>
      <Card className="w-[340px] py-4">
        <CardBody className="justify-between">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => {
                    setSelected("sign-up");
                    setEmail("");
                    setPassword("");
                    }}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[415px]">
                <Input isRequired label="First Name" placeholder="Enter your First Name"
                  value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                />
                <Input isRequired label="Last Name" placeholder="Enter your Last Name"
                  value={lastName} onChange={(e)=>setLastName(e.target.value)}
                />
                <Input isRequired label="Email" placeholder="Enter your email" type="email"
                  value={email} onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Input
                  isRequired
                  label="ConfirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() =>{
                    setSelected("login")
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    }}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={handleSignup}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register