import React, { FormEvent, SyntheticEvent, useState } from "react";
import { Chip, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "next/link";
import { useFetchProductListQuery } from "@/store/custom/customApi";
import
{
  transformSearchBarCategories,
  transformSearchBarProducts,
} from "@/services/transformers";
import variables from "@/styles/variables.module.scss";
import styles from "./styles.module.scss";
import { useFetchCategoryListQuery } from "@/store/custom/customApi";
import { useRouter } from "next/router";

const defaultStyles = {
  borderRadius: "10px",
  paddingTop: "2px",
  paddingBottom: "2px",
  backgroundColor: variables.inputLight,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: variables.inputLight,
  },
};

const hoverStyles = {
  backgroundColor: variables.inputDarker,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: variables.inputDarker,
  },
};

const focusStyles = {
  backgroundColor: variables.backgroundWhite,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: variables.accent,
  },
};

interface SearchBarOptionType
{
  key: string,
  name: string,
  type: string,
  slug: string,
  count?: number
}

const SearchBar = () =>
{
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setTyping] = useState(false);

  const { data: categoriesData = [] } = useFetchCategoryListQuery({});
  const categories = categoriesData?.data ? transformSearchBarCategories(categoriesData.data.items) : [];

  const { data: productsData = [], isLoading, isFetching } = useFetchProductListQuery({
    search: searchTerm,
    per_page: 20
  }, {
    skip: searchTerm?.length < 3 || isTyping
  });
  const products = productsData.data ? transformSearchBarProducts(productsData.data.items) : [];

  const searchResults = [...categories, ...products];

  const onSearch = (evt: SyntheticEvent, value: string) =>
  {
    setSearchTerm(value);

    if (value.length < 3) return

    setTyping(true);
    setTimeout(() =>
    {
      setTyping(false);
    }, 2000);
  }
  );
const products = productsData.data
  ? transformSearchBarProducts(productsData.data.items)
  : [];

const searchResults = [...categories, ...products];

const handleSubmit = (evt: FormEvent<HTMLFormElement>) =>
{
  evt.preventDefault();
  if (searchTerm?.length >= 3)
  {
    router.push(`/search/${searchTerm}`)
  }
  renderOption = { renderOption }
  onInputChange = { onSearch }
  inputValue = { searchTerm }
  renderInput = {(params) => (
    <TextField
      {...params}
      sx={{
        "& .MuiOutlinedInput-root": defaultStyles,
        "& .MuiOutlinedInput-root:hover": hoverStyles,
        "& .MuiOutlinedInput-root.Mui-focused": focusStyles,
      }}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {isLoading || isFetching ? (
              <CircularProgress
                sx={{ color: variables.darker }}
                size={20}
              />
            ) : null}
            {params.InputProps.endAdornment}
          </>
        ),
        placeholder: "Szukaj",
        type: "search",
      }}
    />
  )}
      />
    </form >
  );
};

export default SearchBar;
