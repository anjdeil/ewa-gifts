// import { PageBuilderProps } from "@/types";
import { FC } from "react";
import { CategoryBars } from "../Common/CategoryBars";
import { Slider } from "../Sliders/Slider";
import { PageBuilderProps } from "@/types";
import { Features } from "../Common/Features";
import { Hero } from "../Common/Hero";
import { Split } from "../Common/Split";
import { transformBuilderSplitSection } from "@/services/transformers";
import { AdaptiveImage } from "../Common/AdaptiveImage";
import { RichTextComponent } from "../Common/RichTextComponent";
import { CustomTabs } from "../Common/Tabs";
import { BlogList } from "../Blog/BlogList";
import { ProductCarousel } from "../Shop/ProductCarousel";
import { TopSeller } from "../Shop/TopSeller";
import { Box, useMediaQuery } from "@mui/material";
import { Section } from "../Layouts/Section";

export const PageBuilder: FC<PageBuilderProps> = ({ sections }) =>
{
    const isMobile = useMediaQuery('(max-width: 1024px)');
    // console.log(sections);
    return (
        <div>
            {sections.map((section) =>
            {
                switch (section._type)
                {
                    case "slider":
                        return (
                            <Section className={'slider section'}>
                                <Slider slides={section.slider} />
                            </Section>
                        );

                    case "features":
                        return (
                            <Section className={'features'}>
                                <Features features={section.features} />
                            </Section>
                        )

                    case "hero":
                        return (
                            <Section className={'hero section'}>
                                <Hero section={section} />
                            </Section>
                        )

                    case "split":
                    case "split_reversible": {
                        const leftSections = transformBuilderSplitSection((section.split)).leftSections;
                        const rightSections = transformBuilderSplitSection((section.split)).rightSections;
                        const isReversed = section.type === "split_reversible";
                        return (
                            <Section className={'split section'}>
                                <Split
                                    leftContent={leftSections}
                                    rightContent={rightSections}
                                    isReversed={isReversed}
                                ></Split>
                            </Section>
                        )
                    }

                    case "tabs": {
                        section.tabs[0].title = "Bestsellers";
                        section.tabs[1].title = "New";
                        return (
                            <Section className={'topseller section'}>
                                <CustomTabs tabs={section.tabs} ></CustomTabs>
                            </Section>
                        )
                    }

                    case "categories": {
                        return (
                            <Section className={'categories section'}>
                                <CategoryBars />
                            </Section>
                        )
                    }

                    case "blog": {
                        return (
                            <Section className={'section'}>
                                <h3 className="sub-title" style={{ textTransform: 'uppercase', marginBottom: '30px' }}>Blog</h3>
                                <BlogList />
                            </Section>
                        )
                    }

                    case "topseller": {
                        return (
                            <Section className={'topseller section'}>
                                <h3 className="sub-title" style={{ textTransform: 'uppercase', marginBottom: '30px' }}>Topseller</h3>
                                <Box display={'flex'} gap={'20px'} marginBottom={'20px'} sx={{
                                    flexDirection: 'row'
                                }}>
                                    <TopSeller />
                                    <TopSeller />
                                </Box>
                                <ProductCarousel ids={['32746', '32686', '32681', '32653']} />
                            </Section>
                        );
                    }

                    case "google_reviews": {
                        // console.log(section);
                        break;
                    }

                    case "product_carousel": {
                        return (
                            <ProductCarousel ids={section.products} />
                        )
                    }

                    case "split_image":
                        return <AdaptiveImage
                            imageUrl={section.image}
                            alt={section.title}
                            descOffset={'60%'}
                        />


                    case "rich_text":
                        return <RichTextComponent
                            text={section.text}
                            link_url={section.link_url}
                            link_text={section.link_text}
                            title={section.title}
                        />

                    default:
                        console.log("AEEEA");
                        // console.error(`There's not section with this name.`)
                        // console.error(section._type)
                        break;
                }
            })}
        </div>
    );
}