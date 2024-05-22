import { Stack } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Layouts/Navigation/Nav";
import React from 'react';
import Socials from '../Socials/Socials';

const TopBar: React.FC = () =>
{
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={"space-between"}
      spacing={0}
      style={{ padding: '15px 50px' }}
    >
      <Link href={'/'} passHref>
        <Image src="/logo.svg" alt="Logo" width={150} height={40} />
      </Link>
      <Nav menuId={358} />
      <Socials menuId={358} />
    </Stack >
  )
}

export default TopBar;