import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const CustomerAvatar = (url: string | StaticImport) => {
  return (
    <div className='flex p-15 items-start gap-15 rounded bg-Blue-50'>
      <div className='flex w-15 h-80 p-0 flex-col items-start first-letter gap-0 rounded-none'>
        <Image className='flex flex-col items-start flex-1 self-stretch bg-backgroundImage' src={url ? url : "/images/icons/image_avatar.png"} alt='avatar' />
        <div className='flex h-15 p-0 flex-col justify-center items-center gap-6 flex-shrink-0 self-stretch rounded-none bg-slate-100' >
          <div className='text-slate-900 font-openSans text-15 not-italic leading-5 font-normal'>
            AB
          </div>
        </div>
      </div>

    </div>

  )
}

export default CustomerAvatar