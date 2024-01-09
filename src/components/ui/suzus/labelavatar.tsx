import Image from 'next/image'
import React from 'react'
import IconAvatarProps from './icon';
type LabelAvatarProps = {
  type?: 'Plus' | 'Punch' | 'User' | 'clap' | 'discussion' | 'followed';
  union?: boolean;
  icon?: boolean;
  image?: boolean;
}


const LabelAvatar: React.FC<LabelAvatarProps> = ({ type, union, icon }) => {
  return (
    <IconAvatarProps type={type} union={union} icon={icon} />
  )
}

export default LabelAvatar