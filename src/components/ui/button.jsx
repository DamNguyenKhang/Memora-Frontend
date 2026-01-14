import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from './utils';

const buttonVariants = cva(
    `
    inline-flex items-center justify-center gap-2 whitespace-nowrap
    text-sm font-semibold
    transition-all cursor-pointer
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none
    [&_svg:not([class*='size-'])]:size-4
    shrink-0 [&_svg]:shrink-0
    outline-none
    focus-visible:ring-ring/50 focus-visible:ring-[3px]
    `,
    {
        variants: {
            variant: {
                default: `
                    bg-indigo-600 text-white
                    hover:bg-indigo-700
                    shadow-lg hover:shadow-xl
                `,
                outline: `
                    bg-white
                    text-gray-900
                    border border-gray-300
                    hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700
                    shadow-sm
                `,
                destructive: `
                    bg-destructive text-white
                    hover:bg-destructive/90
                `,
                ghost: `
                    hover:bg-accent hover:text-accent-foreground
                `,
                link: `
                    text-indigo-600
                    hover:text-indigo-700
                    hover:bg-indigo-50
                    px-2 py-1
                `,
            },
            size: {
                sm: 'h-9 px-4 rounded-md',
                default: 'h-11 px-6 rounded-lg',
                lg: 'h-12 px-8 text-base rounded-xl',
                icon: 'size-10 rounded-full',
                custom: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? Slot : 'button';

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
