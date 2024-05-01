import { Stack } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";
import React, { ReactNode } from 'react';

interface TopBarProps
{
  children?: ReactNode;
}
const TopBar: React.FC<TopBarProps> = ({ children }) =>
{
  return (

    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      style={{ padding: '20px 0' }}
    >
      <Link href={'/'} passHref>
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>
      <Nav></Nav>

    </Stack>
  )
}

export default TopBar;