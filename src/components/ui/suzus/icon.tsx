import Image from 'next/image'
import React from 'react'

type IconAvatarProps = {
  type?: 'Plus' | 'Punch' | 'User' | 'clap' | 'discussion' | 'followed';
  union?: boolean;
  icon?: boolean;
  image?: boolean;
}

const renderIconAvatar = ({ type }: IconAvatarProps) => {
  switch (type) {
    case "Plus":
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    case 'Punch':
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    case 'User':
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    case 'clap':
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    case 'discussion':
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    case 'followed':
      return (
        <Image src={`/images/icons/LabelAvatar/${type}.png`} width={24} height={24} alt='labelavatar' />
      )
    default:
      return (
        <div>No icon found for this type</div>
      )
  }
}

const IconAvatarProps: React.FC<IconAvatarProps> = ({ type, union }) => {

  return (
    <div className='ml-5 mt-[60px] p-1 flex flex-col items-start rounded-999 bg-slate-900 absolute right-0 bottom-0 ' >
      <div className='m-1 flex flex-col justify-items-center items-center'>
        {
          <div className='w-3 h-3'>
            <div className='flex w-3 h-3 justify-center items-center flex-shrink-0 bg-Transparent-White-30 '>
              {
                union ? (
                  <div className=' flex-shrink-0 fill-union'>
                    <div className=' fill-union-first opacity-40'></div>
                    <div className=' fill-union-secound'></div>
                  </div>
                ) : null
              }
              <div className='m-2.5 p-[1px] w-7 h-7 flex-shrink-0 stroke-1 stroke-white'>
                {
                  renderIconAvatar({ type })
                }
              </div>
            </div>
          </div>
        }
      </div >
    </div >
  )
}

export default IconAvatarProps

