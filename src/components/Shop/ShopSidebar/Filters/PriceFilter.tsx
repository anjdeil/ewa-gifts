import { Box, Slider, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import variables from "@/styles/variables.module.scss";
import FormInput from "@/components/EwaComponents/EwaInput";
import EwaInput from "@/components/EwaComponents/EwaInput";
import EwaSlider from "@/components/EwaComponents/EwaSlider";

function valueText(value: number) {
    return `${value}°C`;
}

interface PriceFilterPropsType {
    priceRange: {
        min: number,
        max: number
    }
}

const PriceFilter: FC<PriceFilterPropsType> = ({ priceRange }) => {
    const [value, setValue] = useState<number[]>([priceRange.min, priceRange.max]);

    const onChangeRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    // const onChangeMin

    return (
        <>
            <Box
                sx={{
                    padding: "0 10px",
                    marginBottom: "1em"
                }}
            >
                <EwaSlider
                    min={priceRange?.min} max={priceRange?.max}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={onChangeRange}
                    valueLabelDisplay="off"
                    getAriaValueText={valueText}
                />
            </Box>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: `1fr 20px 1fr auto`,
                gap: "15px",
                fontSize: ".9em",
                alignItems: 'center',
                color: variables.textGray
            }}>
                <EwaInput
                    value={value[0]}
                    type="number"
                    sx={{ textAlign: 'right' }}
                />
                <div
                    aria-hidden
                    style={{
                        height: "1px",
                        backgroundColor: variables.inputDarker
                    }}
                ></div>
                <EwaInput
                    value={value[1]}
                    type="number"

                />
                <p>zł</p>
            </Box>
        </>
    );
}

export default PriceFilter;