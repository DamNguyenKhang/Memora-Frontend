import * as React from 'react';
import { Input as AntdInput } from 'antd';
import { cn } from './utils';

/* ================= BASE STYLE ================= */
const baseInputClass = cn(
    '!bg-transparent !shadow-none',
    '!border-2 !border-gray-300 rounded-lg px-4 py-2 h-11 w-full text-base',
    'bg-white dark:bg-gray-800',
    'placeholder:text-gray-400',
    'transition-all duration-300 ease-in-out',
    'focus-within:!border-gray-400 focus-within:shadow-lg ',
    'hover:!border-gray-400 hover:shadow-md',
    'aria-invalid:!border-red-500 aria-invalid:shadow-lg aria-invalid:shadow-red-100',
    'disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-50 md:text-sm',
);

/* ================= INPUT ================= */
const InputBase = React.forwardRef(({ className, size = 'middle', ...props }, ref) => (
    <AntdInput ref={ref} size={size} className={cn(baseInputClass, className)} {...props} />
));

InputBase.displayName = 'Input';

/* ================= PASSWORD ================= */
const Password = React.forwardRef(({ className, size = 'middle', ...props }, ref) => (
    <AntdInput.Password ref={ref} size={size} className={cn(baseInputClass, className)} {...props} />
));

Password.displayName = 'Input.Password';

/* ================= TEXTAREA ================= */
const TextArea = React.forwardRef(({ className, ...props }, ref) => (
    <AntdInput.TextArea
        ref={ref}
        className={cn(baseInputClass, 'min-h-[80px] py-3 resize-none', className)}
        {...props}
    />
));

TextArea.displayName = 'Input.TextArea';

/* ================= SEARCH ================= */
const Search = React.forwardRef(({ className, size = 'middle', ...props }, ref) => (
    <AntdInput.Search ref={ref} size={size} className={cn(baseInputClass, className)} {...props} />
));

Search.displayName = 'Input.Search';

/* ================= EXPORT COMPOUND ================= */
export const Input = Object.assign(InputBase, {
    Password,
    TextArea,
    Search,
});
