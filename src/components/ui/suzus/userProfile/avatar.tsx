import React from 'react'
import LabelAvatar from './labelavatar'

const Avatar = () => {
  return (
    <div className='flex p-15 flex-col items-start gap-15 border rounded bg-Blue-50'>
      <div className='flex w-15 h-20 p-0 flex-col items-start gap-0 rounded-none '>
        <div className='flex flex-col items-start flex-1 self-stretch bg-center bg-cover bg-no-repeat bg-placeholder bg-fallback'></div>
        <div className='flex h-10 p-0 flex-col justify-center items-center gap-6 shrink-0 self-stretch rounded-none bg-slate-100'>
          <p className='text-15 text-slate-900 font-openSans font-normal leading-6'>AB</p>
        </div>
        <div className='relative'>

          <LabelAvatar />
        </div>
      </div>
    </div >
  )
}

export default Avatar