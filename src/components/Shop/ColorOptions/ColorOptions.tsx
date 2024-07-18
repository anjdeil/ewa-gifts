import { Radio } from '@mui/material';
import { EwaColorPickIcon, EwaColorPickCheckedIcon } from '@/components/EwaComponents/EwaColorPickIcons';
import { FC, useEffect, useState } from 'react';
import { ColorOptionsProps } from '@/types';

export const ColorOptions: FC<ColorOptionsProps> = ({ colorAttributes, onColorChange }) =>
{
    const [inputId, setInputId] = useState<string | null>(null);
    const [currentInput, setCurrentInput] = useState<string>("");

    const onInputClick = (id: string | null, slug: string) =>
    {
        setInputId(id);
        setCurrentInput(slug);
    };

    useEffect(() =>
    {
        onColorChange(currentInput);
    }, [currentInput])


    return colorAttributes.map((color, index) =>
    {
        const uniqueId = `color-radio-${index}`;

        return (
            <Radio
                key={uniqueId}
                onChange={() => onInputClick(uniqueId, color.slug)}
                checked={uniqueId === inputId}
                inputProps={{ 'aria-label': color.label }}
                value={color.name}
                icon={<EwaColorPickIcon color={color.cssColor} />}
                checkedIcon={< EwaColorPickCheckedIcon color={color.cssColor} />}
            />
        )
    });
}