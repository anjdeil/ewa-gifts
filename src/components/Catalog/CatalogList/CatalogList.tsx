import { CatalogType } from "@/types/Catalog";
import
{
  Box,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface CatalogListProps
{
  catalogs: CatalogType[];
}

export const CatalogList: FC<CatalogListProps> = ({ catalogs }) =>
{
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () =>
  {
    setShowAll(true);
  };

  const visibleCatalogs =
    isMobile && !showAll ? catalogs.slice(0, 4) : catalogs;

  return (
    <Box className={styles.catalogList}>
      <ImageList cols={isMobile ? 2 : 6} gap={20}>
        {visibleCatalogs.map((catalog) => (
          <ImageListItem
            key={catalog.image}
            className={styles.catalogList__item}
          >
            <a href={catalog.link_url} target="_blank">
              <Image
                src={catalog.image}
                alt={catalog.title!}
                objectFit="cover"
                objectPosition="center"
                loading="lazy" />
            </a>
          </ImageListItem>
        ))}
      </ImageList>

      {isMobile && !showAll && catalogs.length > 4 && (
        <div className={styles.catalogList__buttonWrapper}>
          <button onClick={handleShowMore}>Więcej</button>
        </div>
      )}
    </Box>
  );
};
