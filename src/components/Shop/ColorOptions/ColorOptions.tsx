import { Radio } from '@mui/material';
import { EwaColorPickIcon, EwaColorPickCheckedIcon } from '@/components/EwaComponents/EwaColorPickIcons';
import { FC } from 'react';
import { ColorOptionsProps } from '@/types';

export const ColorOptions: FC<ColorOptionsProps> = ({ colorAttributes, currentColor, onColorChange }) =>
{
    return colorAttributes.map(color =>
    {
        return (
            <Radio
                key={color.slug}
                onChange={() => onColorChange(color.slug)}
                checked={color.slug === currentColor}
                inputProps={{ 'aria-label': color.label }}
                value={color.label}
                icon={<EwaColorPickIcon color={color.cssColor} />}
                checkedIcon={< EwaColorPickCheckedIcon color={color.cssColor} />}
            />
        )
    });
}