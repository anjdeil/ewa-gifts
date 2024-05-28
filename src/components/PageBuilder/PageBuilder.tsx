import { FC } from "react";
import { CategoryBars } from "../Common/CategoryBars";
import { Slider } from "../Sliders/Slider";
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
import { PageBuilderProp, PageBuilderSection } from "@/types";

export const PageBuilder: FC<PageBuilderProp> = ({ sections }) =>
{
    console.log(sections);
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <div>
            {sections.map((section: PageBuilderSection) =>
            {
                if ('_type' in section)
                {
                    switch (section._type)
                    {
                        case "slider":
                            if ('slider' in section)
                            {
                                return (
                                    <Section isContainer={true} className={'slider'}>
                                        <Slider slides={section.slider} />
                                    </Section>
                                );
                            }
                            break;

                        case "features":
                            if ('features' in section)
                            {
                                return (
                                    <Section isContainer={true} className={'features'}>
                                        <Features features={section.features} />
                                    </Section>
                                )
                            }
                            break;

                        case "categories": {
                            return (
                                <Section isContainer={true} className={'categories section'}>
                                    <CategoryBars />
                                </Section>
                            )
                        }

                        case "hero":
                            return (
                                <Section isContainer={true} className={'hero section'}>
                                    <Hero section={section} />
                                </Section>
                            )

                        case "split":
                        case "split_reversible": {
                            if ('split' in section || 'split_reversible' in section)
                            {
                                const leftSections = transformBuilderSplitSection((section.split)).leftSections;
                                const rightSections = transformBuilderSplitSection((section.split)).rightSections;
                                const isReversed = section._type === "split_reversible";
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
                            break;
                        }

                        case "tabs": {
                            if ('tabs' in section)
                            {
                                section.tabs[0].title = "Bestsellers";
                                section.tabs[1].title = "New";
                                return (
                                    <Section className={'topseller section'}>
                                        <CustomTabs tabs={section.tabs} ></CustomTabs>
                                    </Section>
                                )
                            }
                            break;
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
                            if ("title" in section)
                            {
                                return <AdaptiveImage
                                    imageUrl={section.image}
                                    alt={section.title}
                                    descOffset={'60%'}
                                />
                            }
                            break;

                        case "rich_text":
                            if ("text" in section)
                            {
                                return <RichTextComponent
                                    text={section.text}
                                    link_url={section.link_url}
                                    link_text={section.link_text}
                                    title={section.title}
                                />
                            }
                            break;

                        default:
                            console.error(`There's not section with this name.`)
                            break;
                    }
                }
            })}
        </div>
    );
}