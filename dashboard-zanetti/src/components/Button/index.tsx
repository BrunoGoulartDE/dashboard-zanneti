import { cn } from '@/lib/utils';
import React, { ButtonHTMLAttributes } from 'react';
import { Icon, icon } from '../Icon';
import { VariantProps, cva } from 'class-variance-authority';

export interface ButtonRef extends React.HTMLAttributes<HTMLButtonElement> { }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: icon;
}

const buttonVariants = cva(
  'flex gap-2 items-center justify-center w-full text-sm font-medium border border-transparent rounded-sm disabled:pointer-events-none disabled:opacity-50 self-end',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 border-gray-200 hover:bg-gray-200',
        primary: 'bg-primary text-white hover:bg-primary-blue',
        secondary: 'bg-secondary-blue hover:bg-secondary-blue/80 text-white',
        outline: '!bg-transparent text-secondary-blue border-secondary-blue hover:border-primary hover:text-primary',
        ghost: '!bg-transparent text-inherit border-primary/50 hover:border-primary',
        link: 'text-primary underline-offset-4 hover:underline',
        transparent: 'bg-transparent text-primary hover:bg-gray-200',
      },
      size: {
        default: 'px-4 py-1.5',
        xs: 'px-2.5',
        sm: 'px-3 py-0.5',
        lg: 'px-4 py-3',
        icon: 'w-min h-min p-2 rounded-full',
      },
      iconSide: {
        left: 'flex-row',
        right: 'flex-row-reverse',
      }
    },
    defaultVariants: {
      iconSide: 'left',
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef<ButtonRef, ButtonProps>(({
  children,
  icon,
  loading,
  className,
  variant,
  size,
  iconSide,
  disabled,
  ...props
}, ref) => {
  return <button
    className={cn(buttonVariants({ variant, size, iconSide, className }))}
    disabled={disabled || loading}
    // @ts-ignore
    ref={ref}
    {...props}
    >
        { loading && <Icon name='Loader2' className='w-4 h-4 rotate' /> }
        { icon && !loading && <Icon name={icon} className={`w-4 h-4 ${children ? '-ml-2' : ''}`} /> }
        { children && <span>{children}</span> }
    </button>;
});

export { Button }
