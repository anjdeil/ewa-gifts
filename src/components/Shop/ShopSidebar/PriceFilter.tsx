import { Box, Slider, TextField } from "@mui/material";
import React from "react";
import variables from "@/styles/variables.module.scss";

function valueText(value: number) {
    return `${value}°C`;
}
const PriceFilter = () => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };
    return (
        <>
            <Box
                sx={{
                    padding: "0 10px",
                    marginBottom: "1em"
                }}
            >
                <Slider
                    min={10} max={110}
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    getAriaValueText={valueText}
                    sx={{
                        color: variables.accent,
                        ".MuiSlider-rail": {
                            opacity: 1,
                            backgroundColor: variables.whiteLilac,
                        },
                        ".MuiSlider-track": {
                            backgroundColor: variables.accentLight,
                            borderColor: variables.accentLight,
                        },
                        ".MuiSlider-thumb": {
                            "&:hover, &.Mui-focusVisible": {
                                boxShadow: `0px 0px 0px 8px rgba(254, 203, 0, 0.2)`
                            },
                            "&.Mui-active": {
                                boxShadow: `0px 0px 0px 14px rgba(254, 203, 0, 0.2)`
                            },
                            "&::before": {
                                boxShadow: "none"
                            }
                        }
                    }}
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
                <TextField
                    value={value[0]}
                    sx={{
                        ".MuiOutlinedInput-root": {
                            ".MuiInputBase-input": {
                                color: variables.blackColor,
                                borderRadius: '10px',
                                padding: "0.6em",
                                fontSize: ".9em",
                                textAlign: 'center',
                                backgroundColor: variables.whiteLilac,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '10px',
                                borderColor: variables.whiteLilac,
                            },
                            "&:hover": {
                                ".MuiInputBase-input": {
                                    backgroundColor: variables.inputLight,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: variables.inputLight
                                },
                            },
                            "&.Mui-focused": {
                                ".MuiInputBase-input": {
                                    backgroundColor: variables.backgroundWhite,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: variables.accent,
                                },
                            }
                        }
                    }}
                />
                <div
                    aria-hidden
                    style={{
                        height: "1px",
                        backgroundColor: variables.inputDarker
                    }}
                ></div>
                <TextField
                    value={value[1]}
                    sx={{
                        ".MuiOutlinedInput-root": {
                            ".MuiInputBase-input": {
                                color: variables.blackColor,
                                borderRadius: '10px',
                                padding: "0.6em",
                                fontSize: ".9em",
                                textAlign: 'center',
                                backgroundColor: variables.whiteLilac,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '10px',
                                borderColor: variables.whiteLilac,
                            },
                            "&:hover": {
                                ".MuiInputBase-input": {
                                    backgroundColor: variables.inputLight,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: variables.inputLight
                                },
                            },
                            "&.Mui-focused": {
                                ".MuiInputBase-input": {
                                    backgroundColor: variables.backgroundWhite,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: variables.accent,
                                },
                            }
                        }
                    }}
                />
                <p>zł</p>
            </Box>
        </>
    );
}

export default PriceFilter;