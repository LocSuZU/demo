import Image from 'next/image'
import React from 'react'
import IconAvatarProps from './icon';
type LabelAvatarProps = {
  type?: 'Plus' | 'Punch' | 'User' | 'clap' | 'discussion' | 'followed';
  union?: boolean;
  icon?: boolean;
}


const LabelAvatar: React.FC<LabelAvatarProps> = ({ type, union, icon }) => {
  return (
    <div>
      <IconAvatarProps type={type} union={union} icon={icon} />
    </div>
  )
}

export default LabelAvatar