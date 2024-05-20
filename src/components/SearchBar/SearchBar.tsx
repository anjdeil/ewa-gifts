import React, { useState, useEffect } from "react";
import { Chip, CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import { useFetchProductListQuery, useFetchAllCategoriesListQuery } from "@/services/wooCommerceApi";
import { transformSearchBarCategories, transformSearchBarProducts } from "@/services/transformers"
import variables from '@/styles/variables.module.scss';
import styles from './styles.module.scss';

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
    const [isTyping, setTyping] = useState(false);

    let { data: categories = [] } = useFetchAllCategoriesListQuery();
    categories = categories.length ? transformSearchBarCategories(categories) : [];

    let { data: products = [], isLoading, isFetching, isError, error } = useFetchProductListQuery({
        search: searchTerm
    }, {
        skip: searchTerm?.length < 3 || isTyping
    });
    products = transformSearchBarProducts(products);

    const searchResults = [...categories, ...products];

    const onSearch = (evt, value) => {
        setSearchTerm(value);

        if (value.length < 3) return

        setTyping(true);
        setTimeout(() => {
            setTyping(false);
        }, 2000);
    }

    const renderOption = (props, option) => (
        <li key={option.id} {...props}>
            <Link href={option.slug} className={styles['search-bar__option']}>
                {option.name}
                <Chip
                    label={option.type}
                    size="small"
                    sx={{
                        marginLeft: 1,
                    }}
                />
            </Link>
        </li>
    );

    return (
        <Autocomplete
            freeSolo
            loading={isLoading || isFetching}
            options={searchTerm?.length >= 3 ? searchResults : []}
            getOptionLabel={(option) => option.name}
            renderOption={renderOption}
            onInputChange={onSearch}
            blurOnSelect
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
                                {isLoading || isFetching ?
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