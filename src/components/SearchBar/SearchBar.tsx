import React, { useState } from "react";
import { Chip, CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
<<<<<<< HEAD
import styles from './SearchBar.module.scss'
import { styled } from "@mui/material";

const CustomTextField = styled(TextField)`
& .MuiOutlinedInput-root {
    border: 1px solid red;
  }

  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: blue; /* Change this to your desired hover border color */
  }
`;
=======
import variables from '@/styles/variables.module.scss';

const defaultStyles = {
    borderRadius: '10px',
    backgroundColor: variables.inputLight,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.inputLight
    }
};
>>>>>>> 99479462cbb9d2094b6c8f10f6a4dddf0d9a9a3b

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
<<<<<<< HEAD
                <CustomTextField
                    className={styles['search-bar__text-field']}
=======
                <TextField
>>>>>>> 99479462cbb9d2094b6c8f10f6a4dddf0d9a9a3b
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