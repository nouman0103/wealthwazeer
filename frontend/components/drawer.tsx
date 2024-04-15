"use client"
import Image from 'next/image';
import React, { useRef } from 'react';
import Logo_BlackOutline from '../assets/Logo_BlackOutline.svg';
import Link from 'next/link';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { usePathname } from 'next/navigation';


const ListItem = ({ pathname, url, text, children, onClick }: {
  pathname: string,
  url: string,
  text: string,
  children?: React.ReactNode,
  onClick?: (height: number) => void
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li ref={ref} className={`text-xl  ${(pathname === url) ? "text-primaryPink" : "text-white text-opacity-50"} font-medium z-20 ml-4 mt-3`}>
      <Link href={url} prefetch={true} onClick={
        () => {
          if (ref.current) {
            onClick?.(ref.current.offsetTop);
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
    <div className="w-60 min-h-screen bg-white bg-opacity-[2%] border-r border-white border-opacity-[10%] flex flex-col">
      <div className="flex mx-auto mt-3 mb-9">
        <Image src={Logo_BlackOutline} alt="Logo" height={50} />
        <text className="my-auto ml-3 text-2xl font-medium text-white">WealthWazeer</text>
      </div>
      <text className='uppercase text-sm text-opacity-50 ml-5 mb-5 text-white'>
        Main Menu
      </text>
      <ul className="mx-5 flex-col flex gap-8 relative">
        <div className={`absolute bg-white bg-opacity-glassmorphic-bg border transition-all border-white border-opacity-5 shadow-glassmorphic rounded-lg z-10 w-full h-14`}
          style={
            {
              marginTop: currentBgOffset
            }
          }
        >
        </div>
        <ListItem pathname={pathname} url='/dashboard' text='Dashboard' onClick={(height:number) => setCurrentBgOffset(height)}>
          <GridViewRoundedIcon />
        </ListItem>

        <ListItem pathname={pathname} url='/signup' text='Transactions' onClick={(height:number) => setCurrentBgOffset(height)}>
          <GridViewRoundedIcon />
        </ListItem>

      </ul>

    </div>
  );
};

export default Drawer;