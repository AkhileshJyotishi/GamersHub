import React, { ReactNode } from 'react';

interface SocialIconProps {
  icon: ReactNode;
  alt: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon,label }) => {
  return (
    <div className='flex flex-col items-center cursor-pointer gap-y-1'>
      <span className='p-[10px] bg-user_interface_4 rounded-full'>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default SocialIcon;