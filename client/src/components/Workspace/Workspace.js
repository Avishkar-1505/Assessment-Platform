import React from 'react'
import Split from "react-split";
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';

const Workspace = ({problem}) => {

  return (
    <div>
        <Split className='split' minSize={0}>
			<ProblemDescription problem={problem} />
			<div className='bg-dark-fill-2'>
				<Playground problem={problem} />
				{/* {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />} */}
			</div>
		</Split>
    </div>
  )
}

export default Workspace