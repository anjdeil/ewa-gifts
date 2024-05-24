import { TextProps } from "@/types/Common/Text";
import { FC } from "react";

export const Text: FC<TextProps> = ({ text, className }) =>
{
    const paraph = text.split("\r\n\r\n");
    return (
        paraph.map((el, index) => <p className={className} key={index}>{el}</p>)
    )
}