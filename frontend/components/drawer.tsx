"use client"
import Image from 'next/image';
import React, { useRef } from 'react';
import Logo_BlackOutline from '../assets/Logo_BlackOutline.svg';
import Link from 'next/link';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { usePathname } from 'next/navigation';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

const ListItem = ({ pathname, url, text, children, onClick, itemNum = 0 }: {
  pathname: string,
  url: string,
  text: string,
  children?: React.ReactNode,
  onClick?: (height: number) => void
  itemNum?: number
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li ref={ref} className={`text-lg  ${(pathname === url) ? "text-primaryPink" : "text-white text-opacity-50"} font-regular z-20 ml-4 mt-3`}>
      <Link href={"#"} prefetch={true} onClick={
        () => {
          if (ref.current) {
            onClick?.(itemNum * 58);
          }
        }}>
        {children}
        <text className='my-auto ml-3'>{text}</text>
      </Link>
    </li>
  );
};

const Drawer = () => {
  // get the current open url
  const pathname = usePathname();
  const [currentBgOffset, setCurrentBgOffset] = React.useState(0);

  return (
    <>
      <div className="w-52 fixed min-h-screen bg-glassmorphic-gradient border-r border-white border-opacity-[10%] flex flex-col">
        <div className="flex mx-auto mt-4 mb-6">
          <Image src={Logo_BlackOutline} alt="Logo" height={40} />
          <text className="my-auto ml-3 text-xl font-medium text-white">WealthWazeer</text>
        </div>
        <text className='uppercase text-sm text-opacity-50 ml-5 mb-3 text-white'>
          Main Menu
        </text>
        <ul className="mx-5 flex-col flex gap-4 relative">
          <div className={`absolute bg-glassmorphic-gradient border transition-all border-white border-opacity-5 shadow-glassmorphic rounded-lg z-10 w-full h-14`}
            style={
              {
                marginTop: currentBgOffset
              }
            }
          >
          </div>
          <ListItem pathname={pathname} url='/dashboard' text='Dashboard' onClick={(height: number) => setCurrentBgOffset(height)}>
            <GridViewRoundedIcon className='text-3xl' />
          </ListItem>

          <ListItem pathname={pathname} url='/signup' text='Transactions' onClick={(height: number) => setCurrentBgOffset(height)} itemNum={1}>
            <ReceiptLongRoundedIcon className='text-3xl' />
          </ListItem>

          <ListItem pathname={pathname} url='/signup' text='Loans' onClick={(height: number) => setCurrentBgOffset(height)} itemNum={2}>
            <CurrencyExchangeRoundedIcon className='text-3xl' />
          </ListItem>

          <ListItem pathname={pathname} url='/signup' text='Contacts' onClick={(height: number) => setCurrentBgOffset(height)} itemNum={3}>
            <PeopleRoundedIcon className='text-3xl' />
          </ListItem>

          <ListItem pathname={pathname} url='/signup' text='Goals' onClick={(height: number) => setCurrentBgOffset(height)} itemNum={4}>
            <FlagRoundedIcon className='text-3xl' />
          </ListItem>
        </ul>

        <ul className='mx-2 flex-col flex gap-4 relative mt-auto mb-5 '>

          <ListItem pathname={pathname} url='/signup' text='Settings' onClick={() => { }}>
            <SettingsRoundedIcon className='ml-3 text-3xl' />
          </ListItem>
          <div className='flex gap-1 bg-glassmorphic-gradient shadow-glassmorphic border border-white border-opacity-5 rounded-2xl px-2 py-2 cursor-pointer hover:bg-glassmorphic-gradient-hover transition-all duration-700'>
            <Avatar sx={{ bgcolor: deepOrange[500] }} className='w-8 h-8 text-base my-auto mr-1'>N</Avatar>
            <div className='flex flex-col'>
              <text className='text-white truncate w-28 text-opacity-80'>Nouman Iqbal</text>
              <text className='text-white truncate w-28 text-sm text-opacity-50'>nouman0103@gmail.com</text>
            </div>
            <ArrowRightRoundedIcon className='text-white text-opacity-50 my-auto ml-auto pr-2' />
          </div>
        </ul>



      </div>
      <div className='w-52 min-h-screen' />
    </>
  );
};

export default Drawer;