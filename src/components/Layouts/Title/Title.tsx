import { TitleProps } from "@/types/layouts/Title";
import { FC } from "react";

export const Title: FC<TitleProps> = ({ title, isCenter = false }) =>
{
    const textAlign = isCenter ? 'center' : 'left';
    return <h2 className="sub-title sub-title_builder" style={{ textAlign: textAlign }}>{title}</h2>
}