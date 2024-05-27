import { FC } from "react"

export const Section: FC = ({ children, className }) =>
{
    return (
        <section className={`${className}`}>
            {children}
        </section>
    )
}