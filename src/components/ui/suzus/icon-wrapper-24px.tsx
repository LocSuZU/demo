import Image from 'next/image';
import React from 'react'
type IconWrapper24Props = {
  Union?: boolean;
  Icon?: string;
}
const IconWrapper24: React.FC<IconWrapper24Props> = ({ Icon, Union }) => {
  return (
    <div className='mr-2 flex flex-col justify-center items-center'>
      <div className='w-6 h-6'>
        {/* union */}
        <div className='flex justify-center items-center flex-shrink-0 bg-Transparent-White-30'>
          {
            Union ? (
              <div className=' flex-shrink-0 fill-union'>
                <div className=' fill-union-first opacity-40'></div>
                <div className=' fill-union-secound'></div>
              </div>
            ) : null
          }
        </div>
        {/* icon */}
        <div className='m-[2px] w-10 h-10'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default IconWrapper24