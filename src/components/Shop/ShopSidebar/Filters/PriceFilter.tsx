import { Box } from "@mui/material";
import React, { FC, FormEvent, useEffect, useState } from "react";
import variables from "@/styles/variables.module.scss";
import EwaInput from "@/components/EwaComponents/EwaInput";
import EwaSlider from "@/components/EwaComponents/EwaSlider";

type PriceRangeType = {
    min: number,
    max: number
}

interface PriceFilterPropsType {
    onChange: (changedPriceRange: PriceRangeType) => void,
    priceRange: PriceRangeType,
    currentRange: PriceRangeType
}

const PriceFilter: FC<PriceFilterPropsType> = ({ onChange, priceRange, currentRange }) => {
    const [values, setValues] = useState([currentRange.min, currentRange.max]);
    const [hasChanged, setChanged] = useState(false);

    const onChangeRange = (event: Event, newValue: number | number[]) => {
        setValues(newValue as number[]);
        setChanged(true);
    };

    const onChangeMin = (event: FormEvent) => {
        const target = event.target as HTMLInputElement;
        const value = +target.value;

        setValues((values) => [
            (value >= priceRange.min) ? value : priceRange.min,
            values[1]
        ]);
        setChanged(true);
    }

    const onChangeMax = (event: FormEvent) => {
        const target = event.target as HTMLInputElement;
        const value = +target.value;

        setValues((values) => [
            values[0],
            (value <= priceRange.max) ? value : priceRange.max,
        ]);
        setChanged(true);
    }

    useEffect(() => {
        if (hasChanged) {
            const timeout = setTimeout(() => {
                onChange({
                    min: values[0],
                    max: values[1]
                });
                setChanged(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasChanged, values]);

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
                    value={values}
                    onChange={onChangeRange}
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
                    value={values[0]}
                    type="number"
                    onInput={onChangeMin}
                />
                <div
                    aria-hidden
                    style={{
                        height: "1px",
                        backgroundColor: variables.inputDarker
                    }}
                ></div>
                <EwaInput
                    value={values[1]}
                    type="number"
                    onInput={onChangeMax}
                />
                <p>zł</p>
            </Box>
        </>
    );
}

export default PriceFilter;