import { SectionProps } from "@/types"
import { FC } from "react"

export const Section: FC<SectionProps> = ({ children, className, isContainer, isBreadcrumbs }) =>
{
    return (
        <section className={`${className}`}>
            {isContainer ? <div className={`container ${isBreadcrumbs && 'container_bread'}`}>{children}</div> : children}
        </section>
    )
}