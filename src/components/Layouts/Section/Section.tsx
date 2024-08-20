import { SectionProps } from "@/types/layouts";
import { FC } from "react"

export const Section: FC<SectionProps> = ({ children, className, isContainer, isBreadcrumbs }) =>
{
    const breadcrumbsClassName = isBreadcrumbs ? 'container_bread' : "";

    return (
        <section className={`${className}`}>
            {isContainer ? <div className={`container ${breadcrumbsClassName}`}>{children}</div> : children}
        </section>
    )
}