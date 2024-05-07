import React, { useState } from "react";
import { Chip, CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import variables from '@/styles/variables.module.scss';

const defaultStyles = {
    borderRadius: '10px',
    backgroundColor: variables.inputLight,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.inputLight
    }
};

const hoverStyles = {
    backgroundColor: variables.inputDarker,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.inputDarker
    }
};

const focusStyles = {
    backgroundColor: variables.backgroundWhite,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.accent
    }
};

const SearchBar = () => {

    const [options, updateOptions] = useState([
        // { name: "Gadżety biurowe", type: 'Category' },
        // { name: "Akcesoria biurkowe", type: 'Category' },
        // { name: "Wizytowniki reklamowe", type: 'Category' },
        // { name: "Notesy i notatniki reklamowe", type: 'Category' },
        // { name: "Lampki", type: 'Category' },
        // { name: "Soft cover notebooks", type: 'Category' },
        // { name: "Zegary reklamowe", type: 'Category' },
        // { name: "Teczki na dokumenty", type: 'Category' },
        // { name: "Artykuły piśmiennicze", type: 'Category' },
        // { name: "Długopisy", type: 'Category' },
        // { name: "Inne", type: 'Category' },
        // { name: "Markery", type: 'Category' },
        // { name: "Długopis metalowy 2w1 GETAFE", type: 'Product' },
        // { name: "Czapka z daszkiem 6-panelowa SAN FRANCISCO", type: 'Product' },
        // { name: "Teczka A4 PANAMA", type: 'Product' },
        // { name: "Jednorazowa zapalniczka KARLSRUHE", type: 'Product' },
        // { name: "Zapalniczka plastikowa LICHTENSTEIN", type: 'Product' },
        // { name: "Piłka plażowa ORLANDO", type: 'Product' }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const renderOption = (props, option) => (
        <li {...props}>
            {option.name}
            <Chip
                label={option.type}
                size="small"
                sx={{
                    marginLeft: 1,
                }}
            />
        </li>
    );

    return (
        <Autocomplete
            freeSolo
            loading={loading}
            options={options}
            getOptionLabel={(option) => option.name}
            renderOption={renderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{
                        '& .MuiOutlinedInput-root': defaultStyles,
                        '& .MuiOutlinedInput-root:hover': hoverStyles,
                        '& .MuiOutlinedInput-root.Mui-focused': focusStyles,
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ?
                                    <CircularProgress
                                        sx={{ color: variables.darker }}
                                        size={20} />
                                    : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                        placeholder: "Search",
                        type: 'search'
                    }}
                />
            )}
        />
    );
}

export default SearchBar;