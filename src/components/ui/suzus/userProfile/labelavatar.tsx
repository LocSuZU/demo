import Image from 'next/image'
import React from 'react'

const LabelAvatar = () => {
  return (
    <div className='flex flex-col p-1 items-start absolute right-0 bottom-0 rounded-[999px] bg-slate-900 mt-[60px] ml-5'>
      <div className='flex fex-col justify-center items-center m-1'>
        <div className='w-3 h-3'>
          <div className='flex w-3 h-3 justify-center items-center flex-shrink-0 bg-Transparent-White-30'>
            <div className='w-3 h-3 flex-shrink-0 fill-union'>
              <div className='w-3 h-3 fill-union-first opacity-40'>
                <div className='w-3 h-3 fill-union-secound'>
                </div>
              </div>
            </div>
            <div className='w-[7px] h-[7px] shrink-0 stroke-1 stroke-base-white p-[1px] m-[2.5px] '>
              <Image src='/images/icons/icon.svg' width={7} height={7} alt='icon' />
            </div>

          </div>
        </div>

      </div >
    </div >
  )
}

export default LabelAvatar