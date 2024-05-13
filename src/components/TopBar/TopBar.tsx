import { Stack } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";
import React from 'react';
import Socials from '../Socials/Socials';
import { wpNavLinks } from '@/modules';


interface topBarProps
{
  navLinks: wpNavLinks;
  links: wpNavLinks;
}

const TopBar: React.FC<topBarProps> = ({ navLinks, socials }) =>
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
      <Nav navLinks={navLinks} />
      <Socials links={socials} />
    </Stack >
  )
}

export default TopBar;