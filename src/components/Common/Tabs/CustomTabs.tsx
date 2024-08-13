// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CustomTab } from './CustomTab';
import { FC, useState, SyntheticEvent } from 'react';
import { CustomTabsProps } from '@/types';
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

export const CustomTabs: FC<CustomTabsProps> = ({ tabs }) =>
{
    const [value, setValue] = useState<number>(0);
    const handleChange = (_: SyntheticEvent, newValue: number) => setValue(newValue);
    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs TabIndicatorProps={{ style: { display: 'none' } }} value={value} onChange={handleChange} aria-label="custom tabs">
                    {tabs.map((tab, index) => (
                        <StyledTab key={index} label={tab.title} {...tabsNavigationAttr(index)} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <CustomTab
                    sections={tab.sections}
                    value={value}
                    key={index}
                    index={index} />
            ))}
        </Box>
    );
}
