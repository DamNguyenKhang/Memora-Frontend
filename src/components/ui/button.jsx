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
                link: `
                    text-indigo-600
                    hover:text-indigo-700
                    hover:bg-indigo-50
                    px-2 py-1
                `,
                gradient: `
                    bg-gradient-to-r from-indigo-500 to-purple-500
                    text-white
                    shadow-md
                    hover:shadow-lg
                `,
            },

            interaction: {
                scale: `
                    hover:scale-[1.04]
                    active:scale-[0.96]
                `,
                none: '',
            },

            size: {
                sm: 'h-9 px-4',
                default: 'h-11 px-6',
                lg: 'h-12 px-8 text-base',
                icon: 'size-10',
                custom: '',
            },

            rounded: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                full: 'rounded-full',
                none: 'rounded-none',
            },
        },

        defaultVariants: {
            variant: 'default',
            size: 'default',
            interaction: 'scale',
            rounded: 'md',
        },
    },
);

function Button({ className, variant, size, interaction, rounded, asChild = false, ...props }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, interaction, rounded }), className)}
            {...props}
        />
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
