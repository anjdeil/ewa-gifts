const transformBreadcrumbsCategories = (categories) => {
    return categories.reduce((prev, { name, slug }) => {
        const prevUrl = prev.length ? prev[0].url : '/product-category';
        return [...prev, { name, url: `${prevUrl}/${slug}` }];
    }, [])
}
export default transformBreadcrumbsCategories;