import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Label } from '../Label';

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
  onClick?: () => void;
};

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  label?: string;
  placeholder?: string;
  options: SelectOption[] | undefined;
  className?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(({ label, placeholder = 'Selecione', options, className, ...props }, ref) => (
  <div className='flex flex-col gap-1 w-full'>
    <Label>{ label }</Label>
    <SelectPrimitive.Root
      // @ts-ignore
      ref={ref}
      {...props}>
      <SelectPrimitive.Trigger className={cn('flex items-center justify-between rounded-sm text-sm w-full h-9 max-h-[34px] px-2 py-1 text-input-gray border border-input placeholder:text-sm outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed', className)}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position='popper' defaultValue={props.value} className='bg-white rounded-sm overflow-hidden border border-input shadow-md p-2 relative data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'>
          <SelectPrimitive.ScrollUpButton className='flex items-center justify-center cursor-default'>
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className='h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'>
            <SelectPrimitive.Group>
              {options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled} onClick={() => option.onClick && option.onClick()}>
                  {option.onClick?.toString()}
                  {option.label}
                </SelectItem>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className='flex items-center justify-center cursor-default'>
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  </div>
));

const SelectItem = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof SelectPrimitive.Item>>(({ children, ...props }, ref) => (
    <SelectPrimitive.Item
      className='flex items-center justify-between px-3 py-1 select-none relative text-sm text-gray-900 rounded-sm hover:bg-accent outline-none cursor-pointer data-[disabled]:text-gray-400 data-[disabled]:cursor-default data-[disabled]:hover:bg-transparent'
      // @ts-ignore
      ref={ref}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className='text-secondary-blue'>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
));

export { Select };