import { Stack } from '@mui/material';
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Navigation/Nav";
import React, { ReactNode } from 'react';
// import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// import { MenuSlice, menuFetchingSuccess } from '@/store/reducers/MenuReducer';
// import { useSelector } from 'react-redux';

interface TopBarProps
{
  children?: ReactNode;
}
const TopBar: React.FC<TopBarProps> = ({ res }) =>
{
  // const dispatch = useAppDispatch();
  // dispatch(menuFetchingSuccess(res));

  // const { links } = useSelector(state => state.MenuSlice);
  // console.log(links);

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