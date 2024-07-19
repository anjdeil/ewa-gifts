import React, { FC, SyntheticEvent, useState } from 'react';
import { Chip, CircularProgress, Button, Paper, PaperOwnProps } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Link from "next/link";
import { useFetchProductListQuery, useFetchCategoryListQuery } from "@/store/custom/customApi";
import { transformSearchBarCategories, transformSearchBarProducts } from "@/services/transformers"
import variables from '@/styles/variables.module.scss';
import styles from './styles.module.scss';

const defaultStyles = {
    borderRadius: '10px',
    paddingTop: "3px",
    paddingBottom: "3px",
    backgroundColor: variables.backgroundWhite,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.backgroundWhite
    }
};

const hoverStyles = {
    backgroundColor: variables.inputLight,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.inputLight
    }
};

const focusStyles = {
    backgroundColor: variables.backgroundWhite,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: variables.accent
    }
};

interface SearchBarOptionType {
    key: string,
    name: string,
    type: string,
    slug: string,
    count?: number
}

const SearchPaper = (props: PaperOwnProps) => {
    return <Paper
        {...props}
        elevation={0}
        style={{
            width: "100vw",
            marginLeft: "-20px",
            marginTop: "10px",
            height: 'calc(100vh - 120px)'
        }}
    />;
};

interface MobileSearchPopup {
    onClose: () => void
}

const MobileSearchPopup: FC<MobileSearchPopup> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setTyping] = useState(false);

    const { data: categoriesData = [] } = useFetchCategoryListQuery({});
    const categories = categoriesData.data ? transformSearchBarCategories(categoriesData.data.items) : [];

    const { data: productsData = [], isLoading, isFetching } = useFetchProductListQuery({
        search: searchTerm,
        per_page: 20
    }, {
        skip: searchTerm?.length < 3 || isTyping
    });
    const products = productsData.data ? transformSearchBarProducts(productsData.data.items) : [];

    const searchResults = [...categories, ...products];

    const onSearch = (evt: SyntheticEvent, value: string) => {
        setSearchTerm(value);

        if (value.length < 3) return

        setTyping(true);
        setTimeout(() => {
            setTyping(false);
        }, 2000);
    }

    const renderOption = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLLIElement> & React.LiHTMLAttributes<HTMLLIElement>, option: SearchBarOptionType) => (
        <li
            {...props}
            className={styles['search-popup__list-item']}
            key={option.key}
        >
            <Link href={`/${option.slug}`} className={styles['search-popup__option']}>
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
        <div className={styles['search-popup']}>
            <div className={styles['search-popup__header']}>
                <Autocomplete
                    ListboxProps={{
                        style: {
                            maxHeight: 'none',
                        }
                    }}
                    PaperComponent={SearchPaper}
                    open={true}
                    freeSolo
                    loading={isLoading || isFetching}
                    options={searchTerm?.length >= 3 ? searchResults : []}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    renderOption={renderOption}
                    onInputChange={onSearch}
                    blurOnSelect
                    inputValue={searchTerm}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            inputRef={input => input && input.focus()}
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
                <Button
                    sx={{
                        textTransform: "none",
                        fontSize: "1rem",
                        color: variables.textGrey,
                        borderRadius: "10px",
                        padding: "8px",
                        '&:hover': {
                            backgroundColor: variables.inputLight,
                        }
                    }}
                    onClick={onClose}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}

export default MobileSearchPopup;