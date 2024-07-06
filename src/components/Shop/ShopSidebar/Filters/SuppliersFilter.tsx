import EwaCheckbox from "@/components/EwaComponents/EwaCheckbox/EwaCheckbox";
import { Box, FormControlLabel } from "@mui/material";
import React from "react";

const SuppliersFilter = ({ suppliers }) => {
    {
        suppliers?.map(supplier => (
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
        ))
    }
}

export default SuppliersFilter;