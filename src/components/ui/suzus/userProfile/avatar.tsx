'use client'
import React from 'react'
import LabelAvatar from './labelavatar'
import { cn } from '@/lib/utils';
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
}

const Avatar: React.FC<AvatarProps> = ({ imageType, size, icon, image, text }) => {
  const { w, h } = size || { w: '', h: '' }
  return (
    <div className={cn('flex flex-col items-start', w, h)}>

      <LabelAvatar type='Plus' icon={icon} />
    </div>
  )
}

export default Avatar