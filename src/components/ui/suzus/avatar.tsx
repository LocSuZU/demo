'use client'
import React from 'react'
import LabelAvatar from './labelavatar'
import { cn } from '@/lib/utils';
import Image from 'next/image';
type Size = {
  w: string;
  h: string;
}
type AvatarProps = {
  imageType?: string;
  size?: Size;
  icon?: boolean;
  image?: boolean;
  text?: string;
  textBackGround: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ imageType, size, icon, image, text, textBackGround }) => {
  const { w, h } = size || {};
  const width = Number(w);
  const height = Number(h);
  let rounded = ''
  if (text && text.trim() && !icon && !image) {
    rounded = 'rounded-avatar-radius'
    return (
      <div className={cn('flex flex-col justify-center items-center gap-6 flex-grow flex-shrink-0 basis-0 self-stretch bg-slate-100', rounded)} >
        <div className={cn('font-openSans text-37 not-italic font-normal leading-48.1', '', {
          'bg-slate-900': textBackGround
        })}>{text}</div>
      </div>
    )
  } else {
    if (image) {
      rounded = 'rounded-none'
      return (
        <div className='flex w-15 h-80 p-0 flex-col items-start gap-0 rounded-none relative '>
          <div className='flex flex-col items-start flex-grow flex-shrink-0 basis-0 self-stretch bg-gray-100 bg-cover bg-no-repeat
         bg-center'
          >
            <Image src={'/images/icons/placeholder-image.png'} width={width} height={height} alt='placeholder' />
          </div>
          {
            text && text.trim() ?
              (
                <div className={cn('flex h-15 p-0 flex-col justify-center items-center gap-6 flex-shrink-0 self-stretch   bg-slate-100', rounded)} >
                  <div className={cn('font-openSans text-15 not-italic font-normal leading-24', '', {
                    'bg-slate-900': textBackGround
                  })}>AB</div>
                </div>
              ) : null
          }
          {
            icon ?
              (
                <div className={cn('flex flex-col items-start', w, h)}>
                  <LabelAvatar type='Plus' icon={icon} image={image} />
                </div>
              ) : null
          }
        </div >
      )
    }
  }


}

export default Avatar