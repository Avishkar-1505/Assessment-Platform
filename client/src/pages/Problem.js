import React from 'react'
import Workspace from '../components/Workspace/Workspace'
import { twoSum } from '../utils/Problems/two-sum' 

const Problem = () => {
    const problem = twoSum;
  return (
    <div className='bg-dark-layer-2 min-h-screen'>
      
        <Workspace problem={problem}/>
    </div>
  )
}

export default Problem