import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CustomTab } from './CustomTab';
import { FC, useState, SyntheticEvent } from 'react';
import { CustomTabsType } from '@/types';
import { styled } from '@mui/material';

function tabsNavigationAttr(index: number)
{
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)`
  && {
    color: black; 
    font-weight: bold;
    opacity: 0.5;

    &.Mui-selected {
      opacity: 1;
    }

    &:active {
        background-color: transparent;
      }
  }
`;

export const CustomTabs: FC<CustomTabsType> = ({ children, titles }) =>
{
    const [value, setValue] = useState<number>(0);

    if (children.length !== titles.length)
    {
        console.error('The length of children and titles arrays must be equal.');
        return null;
    }

    const handleChange = (_: SyntheticEvent, newValue: number) =>
    {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs TabIndicatorProps={{ style: { display: 'none' } }} value={value} onChange={handleChange} aria-label="custom tabs">
                    {children.map((_, index) => (
                        <StyledTab key={index} label={titles[index]} {...tabsNavigationAttr(index)} />
                    ))}
                </Tabs>
            </Box>
            {children.map((children, index) => (
                <CustomTab value={value} key={index} index={index}>{children}</CustomTab>
            ))}
        </Box>
    );
}