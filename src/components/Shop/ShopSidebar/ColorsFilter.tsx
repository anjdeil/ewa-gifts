import React from "react";
import { Radio } from '@mui/material';
import { EwaColorPickIcon, EwaColorPickCheckedIcon } from '@/components/EwaComponents/EwaColorPickIcons';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const ColorsFilter = ({ colors }) => {

    const router = useRouter();

    const searchParams = useSearchParams();
    const selectedColor = searchParams.get('color')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, color: event.target.value },
        })

    };

    return colors.length && colors.map(color => (
        <Radio
            key={color.id}
            onChange={handleChange}
            checked={selectedColor === String(color.id)}
            inputProps={{ 'aria-label': color.label }}
            value={color.id}
            icon={<EwaColorPickIcon color={color.cssColor} />}
            checkedIcon={< EwaColorPickCheckedIcon color={color.cssColor} />}
        />
    ));
}

export default ColorsFilter;