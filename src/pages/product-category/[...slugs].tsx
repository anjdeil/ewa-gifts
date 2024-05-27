import React from "react";

export const getServerSideProps = ({ params }) => {
    const { slugs } = params;
    const categorySlug = slugs[slugs.length - 1];




}