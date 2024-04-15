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


const ListItem = ({ pathname, url, text, children, onClick, itemNum=0}: {
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
        <ListItem pathname={pathname} url='/dashboard' text='Dashboard' onClick={(height:number) => setCurrentBgOffset(height)}>
          <GridViewRoundedIcon className='text-3xl'/>
        </ListItem>

        <ListItem pathname={pathname} url='/signup' text='Transactions' onClick={(height:number) => setCurrentBgOffset(height)} itemNum={1}>
          <ReceiptLongRoundedIcon className='text-3xl'/>
        </ListItem>

        <ListItem pathname={pathname} url='/signup' text='Loans' onClick={(height:number) => setCurrentBgOffset(height)} itemNum={2}>
          <CurrencyExchangeRoundedIcon className='text-3xl'/>
        </ListItem>

        <ListItem pathname={pathname} url='/signup' text='Contacts' onClick={(height:number) => setCurrentBgOffset(height)} itemNum={3}>
          <PeopleRoundedIcon className='text-3xl'/>
        </ListItem>

        <ListItem pathname={pathname} url='/signup' text='Goals' onClick={(height:number) => setCurrentBgOffset(height)} itemNum={4}>
          <FlagRoundedIcon className='text-3xl'/>
        </ListItem>

      </ul>

    </div>
    <div className='w-52 min-h-screen'/>
    </>
  );
};

export default Drawer;