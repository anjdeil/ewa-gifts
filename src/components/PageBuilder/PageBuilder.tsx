// import { PageBuilderProps } from "@/types";
import { FC } from "react";
import { CategoryBars } from "../Common/CategoryBars";
import { Slider } from "../Sliders/Slider";
import { PageBuilderProps } from "@/types";
import { Features } from "../Common/Features";
import { Hero } from "../Common/Hero";
import { Split } from "../Common/Split";

export const PageBuilder: FC<PageBuilderProps> = ({ sections }) =>
{
    // console.log(sections)
    return (
        <div>
            {sections.map((section, index) =>
            {
                switch (section._type)
                {
                    case "slider":
                        return <Slider slides={section.slider} />;

                    case "features":
                        return <Features features={section.features} />

                    case "hero":
                        return <Hero section={section} />

                    case "split":
                    case "split_reversible":
                        console.log(section);
                        return <div></div>
                    // return <Split />

                    default:
                        return <div></div>
                }
            })}
        </div>
    );
}