'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  rightIcon?: string;
  isDisabled?: boolean;
}

const CustomButton = ({
  title,
  containerStyles,
  textStyles,
  handleClick,
  type,
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={type || 'button'}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6 ">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
