import './App.css';
import {  Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import MyProfile from './components/Dashboard/MyProfile';
import TestDetailsId from './components/Dashboard/TestDetailsId';
import TestDetails from './components/Dashboard/TestDetails';
import CreateTest from './components/Dashboard/CreateTest';
import AddQuestion from './components/Dashboard/AddQuestion';
import StartTest from './pages/StartTest';
import PrivateTestRoute from './components/common/PrivateTestRoute';
import TestPage from './pages/TestPage';
import EndPage from './pages/EndPage';

// import Problem from './pages/Problem';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {student} = useSelector((state) => state.student);

  return (
    <div className="flex flex-col justify-evenly bg-zinc-100">
      { 
        !student &&
        <Navbar/>
      }
      <Routes >
          {/* <Route path="/problem" element={<Problem/>} />
          <Route path='*' element={<Navigate to="/problem"/>} /> */}
          <Route path="/home" element={<Home/>} />
          <Route path="/signup" element={<Register />} />
          <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
          >
            <Route path='/dashboard/my-profile' element={<MyProfile />}/>  
            <Route path='/dashboard/test-details/:testId' element={<TestDetailsId/>} />
            <Route path='/dashboard/test-details' element={<TestDetails/>} />
            <Route path='/dashboard/create-test' element={<CreateTest/>} />
            <Route path='/dashboard/create-question' element={<AddQuestion/>} />
          </Route>

          <Route path="/start-test" element={<StartTest/>}/>
          
          

          <Route path='/test/:testId' element={
            <PrivateTestRoute>
              <TestPage/>
            </PrivateTestRoute>
          } />

          <Route path='/test-end' element={<EndPage/>} />

          <Route path='*' element={<Navigate to={"/home"} />} />

      </Routes>
    </div>
    
    
  );
}

export default App;
