import { Box, Stack } from '@mui/material';
import React, { ReactNode } from 'react';

interface TopBarProps
{
  children?: ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ children }) =>
{
  return (

    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      style={{ padding: '20px 0' }}
    >
      {children}

    </Stack>
  )
}   