import React from 'react'

type DividerProps = {
  axis: string;
};


const Divider: React.FC<DividerProps> = ({ axis }) => {
  return (
    <div className='flex w-Content-breakpoint-Desktop py-4 items-start gap-1 rounded-[999px]'>
      <div className='mx-4 h-[1px] flex-grow flex-shrink-0 basis-0 bg-slate-100'>

      </div>
    </div>
  )
}

export default Divider