import React, { useState, useEffect } from "react";
import { Chip, CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useFetchProductListQuery } from "@/services/wooCommerceApi";
import variables from '@/styles/variables.module.scss';

const defaultStyles = {
    borderRadius: '10px',
    paddingTop: "2px",
    paddingBottom: "2px",
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

    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    let { data: searchResults = [], isLoading, isFetching, isError, error, refetch } = useFetchProductListQuery({
        per_page: 12,
        search: searchTerm
    }, {
        skip: searchTerm?.length < 3
    });

    useEffect(() => {
        if (searchTerm.length >= 3) {
            setHasSearched(true);
            refetch();
        } else {
            setHasSearched(false);
        }
    }, [searchTerm, refetch]);

    const renderOption = (props, option) => (
        <li key={option.id} {...props}>
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
        <>
            <Autocomplete
                freeSolo
                loading={isLoading || isFetching}
                options={searchResults}
                getOptionLabel={(option) => option.name}
                filterOptions={(options) => options}
                renderOption={renderOption}
                onInputChange={(evt, value) => setSearchTerm(value)}
                inputValue={searchTerm}
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
                                    {isLoading ?
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
            {/* <p style={{ marginTop: 400, color: 'black' }}>{searchTerm} {(isLoading || isFetching) ? "(Loading)" : ""}</p>
            <div>
                {isLoading ? (
                    'Loading...'
                ) : hasSearched ? (
                    <ul>
                        {searchResults?.map((result) => (
                            <li key={result.id}>{result.name}</li>
                        ))}
                    </ul>
                ) : null}
            </div> */}
        </>
    );
}

export default SearchBar;