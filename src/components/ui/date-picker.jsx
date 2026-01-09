import React, { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DatePicker = forwardRef(({ value, onChange }, ref) => {
    const { t } = useTranslation('common');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const months = t('date.months', { returnObjects: true });

    // Sync từ Antd Form -> state nội bộ
    useEffect(() => {
        if (!value) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDay('');
            setMonth('');
            setYear('');
            return;
        }

        const d = new Date(value);
        if (!isNaN(d)) {
            setDay(String(d.getDate()));
            setMonth(String(d.getMonth() + 1));
            setYear(String(d.getFullYear()));
        }
    }, [value]);

    const update = (d, m, y) => {
        setDay(d);
        setMonth(m);
        setYear(y);

        if (d && m && y) {
            onChange?.(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);

        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);
    const daysInMonth = new Date(year || 2000, month || 1, 0).getDate();

    return (
        <div className="grid grid-cols-3 gap-2" ref={ref}>
            <select
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm bg-white transition-colors"
                value={day}
                onChange={(e) => update(e.target.value, month, year)}
            >
                <option value="">{t('date.day')}</option>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                ))}
            </select>

            <select
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm bg-white transition-colors"
                value={month}
                onChange={(e) => update(day, e.target.value, year)}
            >
                <option value="">{t('date.month')}</option>
                {months.map((label, index) => (
                    <option key={index} value={index + 1}>
                        {label}
                    </option>
                ))}
            </select>

            <select
                className="w-full px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-sm bg-white transition-colors"
                value={year}
                onChange={(e) => update(day, month, e.target.value)}
            >
                <option value="">{t('date.year')}</option>
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default DatePicker;
