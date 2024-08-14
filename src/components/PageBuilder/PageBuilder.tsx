
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
import { PageBuilderProps } from "@/types/PageBuilder/PageBuilderProps";
import { HeroSchema, SplitBuild } from "@/types";
import { CustomTabs } from "../Common/Tabs";
import { ProductCarousel } from "../Shop";
// import { HeroSchema, PageBuilderProp, SplitBuild } from "@/types";
// import { TopSeller } from "../Shop/TopSeller";

export const PageBuilder: FC<PageBuilderProps> = ({ sections }) =>
{
    return (
        <>
            {sections.map((section, index) =>
            {
                const key = `${('_type' in section) && section._type}-${index}`;
                if ('_type' in section)
                {
                    switch (section._type)
                    {
                        case "slider": {
                            if (!('slider' in section)) break;
                            return (
                                <Section isContainer={true} className={'slider'} key={key}>
                                    <Slider slides={section.slider} />
                                </Section>
                            );
                        }
                        case "features": {
                            if (!('features' in section)) break;
                            return (
                                <Section isContainer={true} className={'features'} key={key}>
                                    <Features features={section.features} />
                                </Section>
                            )
                        }
                        case "categories": {
                            if (!('categories' in section)) break;
                            return (
                                <Section isContainer={true} className={'section'} key={key}>
                                    <CategoryBars />
                                </Section>
                            )
                        }
                        case "hero": {
                            const heroSection = section as HeroSchema;
                            return (
                                <Section isContainer={true} className={'hero section section_offset'} key={key}>
                                    <Hero section={heroSection} />
                                </Section>
                            )
                        }
                        case "split":
                        case "split_reversible": {
                            if (!('split' in section) || !('split_reversible' in section)) break;
                            const splitSection = section as SplitBuild;
                            const { leftSections, rightSections } = transformBuilderSplitSection(splitSection.split);
                            const isReversed = section._type === "split_reversible";
                            return (
                                <Section className={'split section section_offset'} isContainer={true} key={key}>
                                    <Split
                                        leftContent={leftSections}
                                        rightContent={rightSections}
                                        isReversed={isReversed}
                                    ></Split>
                                </Section>
                            )
                        }
                        case "tabs": {
                            if (!('tabs' in section)) break;
                            return (
                                <Section className={'tabs section section_offset'} isContainer={true} key={key}>
                                    <CustomTabs tabs={section.tabs} ></CustomTabs>
                                </Section>
                            )
                        }
                        case "product_carousel": {
                            if (!("products" in section)) break;
                            return (
                                <ProductCarousel ids={section.products} key={key} />
                            )
                        }
                        case "blog": {
                            if ('blog' in section)
                            {
                                return (
                                    <Section className={'section section_offset'} isContainer={true} key={key}>
                                        <BlogList />
                                    </Section>
                                )
                            }
                            break;
                        }
                        // case "topseller": {
                        //     if ('topseller' in section)
                        //     {
                        //         return (
                        //             <Section className={'topseller'} key={key}>
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
                        case "split_image":
                            if ("title" in section)
                            {
                                return <AdaptiveImage
                                    imageUrl={section.image}
                                    alt={section.title}
                                    descOffset={'60%'}
                                    key={key}
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
                                    key={key}
                                />
                            }
                            break;
                        default:
                            console.error(`There's not section with this name.`)
                            break;
                    }
                }
            })}
        </>
    );
}