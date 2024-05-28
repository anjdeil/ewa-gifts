import { SectionProps } from "@/types"
import { FC } from "react"

export const Section: FC<SectionProps> = ({ children, className, isContainer }) =>
{
    return (
        <section className={`${className}`}>
            {isContainer ? <div className="container">{children}</div> : children}
        </section>
    )
}