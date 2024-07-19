import EwaCheckbox from "@/components/EwaComponents/EwaCheckbox/EwaCheckbox";
import { AttributeTermType } from "@/types/Services/customApi/Attribute/AttributeTermType";
import { Box, FormControlLabel } from "@mui/material";
import React, { FC } from "react";

interface SuppliersFilterPropsType {
    suppliers: AttributeTermType[]
}

const SuppliersFilter: FC<SuppliersFilterPropsType> = ({ suppliers }) => {
    return suppliers?.map(supplier => (
        <Box key={supplier.id}>
            <FormControlLabel
                sx={{
                    '.MuiTypography-root': {
                        fontSize: '0.9em',
                    }
                }}
                label={supplier.name}
                value={supplier.id}
                control={
                    <EwaCheckbox
                        inputProps={{
                            "aria-label": supplier.name,
                        }}
                    />
                }
            />
        </Box>
    ));
}

export default SuppliersFilter;