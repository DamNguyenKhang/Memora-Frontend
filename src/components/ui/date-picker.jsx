import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '~/components/ui/calendar';
import { cn } from '~/components/ui/utils';

function DatePicker({ value, onChange, placeholder, className, disabledDate }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(value);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSelect = (date) => {
        setSelectedDate(date);
        onChange?.(date);
        setIsOpen(false);
    };

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 13);

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    '!bg-transparent !shadow-none',
                    '!border-2 !border-gray-300 rounded-lg px-4 py-2 h-11 w-full text-base',
                    'bg-white dark:bg-gray-800',
                    'placeholder:text-gray-400',
                    'transition-all duration-300 ease-in-out',
                    'hover:!border-gray-400 hover:shadow-md',
                    'cursor-pointer',
                    'flex items-center justify-between',
                    'md:text-sm',
                    isOpen && '!border-gray-400 shadow-lg',
                    !selectedDate && 'text-gray-400',
                    className,
                )}
            >
                <span>{selectedDate ? formatDate(selectedDate) : placeholder}</span>
                <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 rounded-md border bg-white dark:bg-gray-800 shadow-lg">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleSelect}
                        defaultMonth={new Date(2000, 0)}
                        toDate={maxDate}
                        captionLayout="dropdown-buttons"
                        fromYear={1940}
                        toYear={maxDate.getFullYear()}
                        disabled={disabledDate}
                    />
                </div>
            )}
        </div>
    );
}

export { DatePicker };
