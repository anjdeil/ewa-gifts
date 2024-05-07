import { Stack } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";
import React from 'react';
import { wpNavLinksProps } from '@/modules';
import Socials from '../Socials/Socials';

const TopBar: React.FC<wpNavLinksProps> = ({ navLinks }) =>
{
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0}
      style={{ padding: '15px 50px 0' }}
    >
      <Link href={'/'} passHref>
        <Image src="/logo.svg" alt="Logo" width={150} height={40} />
      </Link>
      <Nav navLinks={navLinks} />
      <Socials navLinks={navLinks} />
    </Stack >
  )
}

export default TopBar;