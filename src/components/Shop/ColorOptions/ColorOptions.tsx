import { Radio } from '@mui/material';
import { EwaColorPickIcon, EwaColorPickCheckedIcon } from '@/components/EwaComponents/EwaColorPickIcons';
import { FC, useState } from 'react';
import { ColorOptionsProps } from '@/types';


export const ColorOptions: FC<ColorOptionsProps> = ({ colorAttributes }) =>
{
    // console.log(colorAttributes);

    const [inputId, setInputId] = useState<string | null>(null);

    const onInputClick = (id: string | null) =>
    {
        setInputId(id);
    };

    return colorAttributes.map((color, index) =>
    {
        const uniqueId = `color-radio-${index}`;

        return (
            <Radio
                key={uniqueId}
                onChange={() => onInputClick(uniqueId)}
                checked={uniqueId === inputId}
                inputProps={{ 'aria-label': color.label }}
                value={color.name}
                icon={<EwaColorPickIcon color={color.cssColor} />}
                checkedIcon={< EwaColorPickCheckedIcon color={color.cssColor} />}
            />
        )
    });
}