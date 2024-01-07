import Image from 'next/image'
import React from 'react'

type IconAvatarProps = {
  type?: 'Plus' | 'Punch' | 'User' | 'clap' | 'discussion' | 'followed';
  union?: boolean;
  icon?: boolean;
}

const renderIconAvatar = ({ type }: IconAvatarProps) => {
  switch (type) {
    case "Plus":
      return (
        <div className='m-2.5 p-[1px] flex-shrink-0 stroke-1 stroke-base-white'>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
    case 'Punch':
      return (
        <div>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
    case 'User':
      return (
        <div>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
    case 'clap':
      return (
        <div>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
    case 'discussion':
      return (
        <div>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
    case 'followed':
      return (
        <div>
          <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
        </div>
      )
  }
}

const IconAvatarProps: React.FC<IconAvatarProps> = ({ type, union, icon }) => {
  return (
    <div className='m-1 flex flex-col justify-items-center items-center'>
      <div className='w-3 h-3'>
        {
          icon ? (
            <>
              {
                union ? (
                  <div className='flex w-3 h-3 justify-center items-center flex-shrink-0 bg-Transparent-White-30 '>
                    <div className='w-3 h-3 flex-shrink-0 fill-union'>
                      <div className='w-3 h-3 fill-union-first opacity-40'></div>
                      <div className='w-3 h-3 fill-union-secound'></div>
                    </div>
                  </div>
                ) : null
              }
              <div className='m-2.5 p-[1px] w-7 h-7 flex-shrink-0 stroke-1 stroke-white '>
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 0.5L4 7.5M0.5 4L7.5 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {renderIconAvatar({ type })}
              </div>
            </>
          ) : null
        }
      </div>
    </div>
  )
}

export default IconAvatarProps