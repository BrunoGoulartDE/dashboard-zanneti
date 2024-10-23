import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../Label';

export type InputType = 'text' | 'password' | 'number' | 'date';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: InputType;
    label?: string;
}

const classes = 'text-sm w-full h-9 max-h-[34px] px-2 py-1 text-input-gray border border-input rounded-sm placeholder:text-sm outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed';

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  type = 'text',
  label,
  autoComplete = 'off',
  ...props
}, ref) => (
  <div className='flex flex-col gap-1 w-full'>
    <Label>{ label }</Label>
    <input autoComplete={autoComplete} type={type} className={cn(classes, className)} ref={ref} {...props}/>
  </div>
))

export { Input }
