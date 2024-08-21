
import { FC } from "react";
import { CategoryBars } from "../Common/CategoryBars";
import { Slider } from "../Sliders/Slider";
import { Features } from "../Common/Features";
import { Hero } from "../Common/Hero";
import { Split } from "../Common/Split";
import { transformBuilderSplitSection } from "@/services/transformers";
import { AdaptiveImage } from "../Common/AdaptiveImage";
import { RichTextComponent } from "../Common/RichTextComponent";
import { BlogList } from "../Blog/BlogList";
import { Section } from "../Layouts/Section";
import { PageBuilderProps } from "@/types/PageBuilder/PageBuilderProps";
import { CustomTabs } from "../Common/Tabs";
import { ProductCarousel } from "../Shop";
import { TopSeller } from "../Shop/TopSeller";
import { CatalogList } from "../Catalog/CatalogList";
import { Title } from "../Layouts/Title";
import { TitleBuilder } from "@/types/layouts/Title";
import { HeroSchema, SplitBuild } from "@/types/Common";

export const PageBuilder: FC<PageBuilderProps> = ({ sections, isContainer = true }) =>
{
    console.log(sections);
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
                            if ('split' in section || 'split_reversible' in section)
                            {
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
                            } else break;
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
                        case "topseller": {
                            if ('topseller' in section)
                            {
                                return (
                                    <Section className={'topseller'} isContainer={true} key={key}>
                                        <h3 className="sub-title" style={{ textTransform: 'uppercase', marginBottom: '30px' }}>Topseller</h3>
                                        <TopSeller />
                                    </Section>
                                );
                            }
                            break;
                        }
                        case "google_reviews": {
                            if ('google_reviews' in section)
                            {
                                break;
                            }
                            break;
                        }
                        case "catalogs":
                            if (!("catalogs" in section)) break;
                            return (
                                <Section className={"catalogs"} isContainer={true}>
                                    <CatalogList catalogs={section.catalogs} />
                                </Section>
                            )
                        case "split_image":
                            if ("title" in section && "image" in section)
                            {
                                return <AdaptiveImage
                                    imageUrl={section.image}
                                    alt={section.title}
                                    descOffset={'60%'}
                                    key={key}
                                />
                            }
                            break;
                        case "rich_text": {
                            if (!("text" in section)) break;
                            const richTextComponent = (
                                <RichTextComponent
                                    text={section.text}
                                    link_url={section.link_url}
                                    link_text={section.link_text}
                                    title={section.title}
                                    key={key}
                                />
                            );
                            if (isContainer)
                                return <Section isContainer={true} className={"rich-text"}>{richTextComponent}</Section>;

                            return richTextComponent;
                        }
                        case "title": {
                            const title = section as TitleBuilder;
                            return <Title title={title.title} isCenter={title.is_center} />
                        }
                        default:
                            console.error(`There's not section with this name.`)
                            break;
                    }
                }
            })}
        </>
    );
}