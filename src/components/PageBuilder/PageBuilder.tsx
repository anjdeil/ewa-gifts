// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { FC } from "react";
import { CategoryBars } from "../Common/CategoryBars";
import { Slider } from "../Sliders/Slider";
import { Features } from "../Common/Features";
import { Hero } from "../Common/Hero";
import { Split } from "../Common/Split";
import { transformBuilderSplitSection } from "@/services/transformers";
import { AdaptiveImage } from "../Common/AdaptiveImage";
import { RichTextComponent } from "../Common/RichTextComponent";
// import { CustomTabs } from "../Common/Tabs";
import { BlogList } from "../Blog/BlogList";
// import { ProductCarousel } from "../Shop/ProductCarousel";
import { Section } from "../Layouts/Section";
import { HeroSchema, PageBuilderProp, SplitBuild } from "@/types";
// import { TopSeller } from "../Shop/TopSeller";

export const PageBuilder: FC<PageBuilderProp> = ({ sections }) =>
{
    // console.log(sections);
    return (
        <div>
            {sections.map((section) =>
            {
                if ('_type' in section)
                {
                    switch (section._type)
                    {
                        case "slider": {
                            if ('slider' in section)
                            {
                                return (
                                    <Section isContainer={true} className={'slider'}>
                                        <Slider slides={section.slider} />
                                    </Section>
                                );
                            }
                            break;
                        }

                        case "features": {
                            if ('features' in section)
                            {
                                return (
                                    <Section isContainer={true} className={'features'}>
                                        <Features features={section.features} />
                                    </Section>
                                )
                            }
                            break;
                        }

                        case "categories": {
                            if ('categories' in section)
                            {
                                return (
                                    <Section isContainer={true} className={'section'}>
                                        <CategoryBars />
                                    </Section>
                                )
                            }
                            break;
                        }

                        case "hero": {
                            const heroSection = section as HeroSchema;
                            return (
                                <Section isContainer={true} className={'hero section'}>
                                    <Hero section={heroSection} />
                                </Section>
                            )
                        }

                        case "split":
                        case "split_reversible": {
                            if ('split' in section || 'split_reversible' in section)
                            {
                                const splitSection = section as SplitBuild;
                                const { leftSections, rightSections } = transformBuilderSplitSection(splitSection.split);
                                const isReversed = section._type === "split_reversible";
                                return (
                                    <Section className={'split section'} isContainer={true}>
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

                        // case "tabs": {
                        //     if ('tabs' in section)
                        //     {
                        //         section.tabs[0].title = "Bestsellers";
                        //         section.tabs[1].title = "New";
                        //         return (
                        //             <Section className={'tabs'}>
                        //                 <div className="container">
                        //                     <CustomTabs tabs={section.tabs} ></CustomTabs>
                        //                 </div>
                        //             </Section>
                        //         )
                        //     }
                        //     break;
                        // }

                        case "blog": {
                            if ('blog' in section)
                            {
                                return (
                                    <Section className={'section'} isContainer={true}>
                                        <h3 className="sub-title" style={{ textTransform: 'uppercase', marginBottom: '30px' }}>Blog</h3>
                                        <BlogList />
                                    </Section>
                                )
                            }
                            break;
                        }

                        // case "topseller": {
                        //     if ('topseller' in section) {
                        //         return (
                        //             <Section className={'topseller'}>
                        //                 <div className="container">
                        //                     <h3 className="sub-title" style={{ textTransform: 'uppercase', marginBottom: '30px' }}>Topseller</h3>
                        //                     <TopSeller />
                        //                 </div>
                        //             </Section>
                        //         );
                        //     }
                        //     break;
                        // }

                        case "google_reviews": {
                            if ('google_reviews' in section)
                            {
                                break;
                            }
                            break;
                        }

                        // case "product_carousel": {
                        //     if ('product_carousel' in section)
                        //     {
                        //         return (
                        //             <ProductCarousel ids={section.products} />
                        //         )
                        //     }
                        //     break;
                        // }

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