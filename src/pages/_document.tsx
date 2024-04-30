import Document, { Html, Head, Main, NextScript } from 'next/document';
import { TopBar } from "@/components/TopBar/TopBar";
import Link from "next/link";
import Image from 'next/image';
import Nav from '@/components/Navigation/Nav';


const links = [
  {
    'url': '/',
    'title': 'Główna'
  },
  {
    'url': '/about',
    'title': 'O nas'
  },
  {
    'url': '/contacts',
    'title': 'Kontakt'
  },
  {
    'url': '/blog',
    'title': 'Blog'
  },
];

const socials = [
  {
    'href': 'mailto:biuro@ewagifts.pl',
    'title': 'biuro@ewagifts.pl',
    'isButton': false,
  },
  {
    'href': 'tel:+48 459 568 017',
    'title': '+48 459 568 017',
    'isButton': true,
  },
]

export default class MyDocument extends Document
{
  render()
  {
    return (
      <Html lang="pl">
        <Head>
        </Head>
        <body>
          <TopBar>
            <Link href={'/'} passHref>
              <Image src="/logo.svg" alt="Logo" width={100} height={100} />
            </Link>
            <Nav links={links}></Nav>
          </TopBar>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
