const getCssGradient = (colorHexs: string[]): string => {
    const gradientParts = colorHexs.map((colorHex: string, index: number) => {
        const percent = index / (colorHexs.length - 1) * 100;
        return `${colorHex} ${percent}%`;
    });

    return `linear-gradient(90deg, ${gradientParts.join(', ')})`;
}

export default getCssGradient;