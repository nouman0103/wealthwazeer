"use client";
import Image from "next/image";
import React, { memo, useEffect, useRef, useState } from "react";
import Logo_BlackOutline from "../assets/Logo_BlackOutline.svg";
import Link from "next/link";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { usePathname } from "next/navigation";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { GlassmorphicMenu } from "./menus";
import Paper from "@mui/material/Paper";
import { useAuth } from "@/context/AuthContex";
import { useQueryClient } from "@tanstack/react-query";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { ProfilePopup } from "./profilePopup";

const ListItem = ({
  pathname,
  url,
  text,
  children,
  onClick,
  itemNum = 0,
}: {
  pathname: string;
  url: string;
  text: string;
  children?: React.ReactNode;
  onClick?: (height: number) => void;
  itemNum?: number;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (pathname === url && ref.current) {
      onClick?.(ref.current.offsetTop - ref.current.clientHeight / 4.8);
    }
  }, [pathname, url, ref, onClick, itemNum]);
  return (
    <li
      ref={ref}
      className={`text-base  ${pathname === url
          ? "text-primaryPink"
          : "text-white text-opacity-50 hover:text-opacity-80 active:text-opacity-50"
        } font-normal z-20 ml-4 mt-3`}
    >
      <Link
        href={url}
        prefetch={true}
        onClick={() => {
          if (ref.current) {
            onClick?.(ref.current.offsetTop + 50);
          }
        }}
        className="w-full inline-flex"
      >
        {children}
        <text className="my-auto ml-3 ">{text}</text>
      </Link>
    </li>
  );
};

const _Drawer = () => {
  // get the current open url
  const pathname = usePathname();
  const [currentBgOffset, setCurrentBgOffset] = React.useState(0);
  const { user, setToken } = useAuth();
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setToken(null);
    queryClient.clear();
  };

  // get width of the screen
  const width = window.innerWidth;
  const [hideDrawerTexts, setHideDrawerTexts] = React.useState(false);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHideDrawerTexts(true);
      } else {
        setHideDrawerTexts(false);
      }
    };

    // Call handleResize right away so that the state gets updated with the initial window size
    handleResize();

    // Subscribe to window resize events
    window.addEventListener('resize', handleResize);
  }, []);

  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  const handleProfilePopupOpen = () => {
    setProfilePopupOpen(true);
  };

  const handleProfilePopupClose = () => {
    setProfilePopupOpen(false);
  };

  return (
    <>
      <div>
        <div className="w-28 md:w-56 fixed min-h-screen bg-glassmorphic-gradient border-r border-white border-opacity-[10%] flex flex-col">
          <Link
            href="/user/dashboard"
            prefetch={true}
            className="flex mx-auto mt-4 mb-6"
          >
            <Image src={Logo_BlackOutline} alt="Logo" height={30} />
            <text className="hidden md:block my-auto ml-3 text-xl font-normal text-white">
              WealthWazeer
            </text>
          </Link>
          <text className="uppercase text-xs text-opacity-50 ml-5 mb-3 text-white">
            Main Menu
          </text>
          <ul className="mx-5 flex-col flex gap-4 relative">
            <div
              className={`absolute bg-glassmorphic-gradient border transition-all border-white border-opacity-5 shadow-glassmorphic rounded-lg z-10 w-full h-[3.1rem]`}
              style={{
                marginTop: currentBgOffset,
              }}
            ></div>
            <ListItem
              pathname={pathname}
              url="/user/dashboard"
              text={hideDrawerTexts ? "" : "Dashboard"}
              onClick={(height: number) => setCurrentBgOffset(height)}
            >
              <GridViewRoundedIcon className="text-2xl" />
            </ListItem>

            <ListItem
              pathname={pathname}
              url="/user/transactions"
              text={hideDrawerTexts ? "" : "Transactions"}
              onClick={(height: number) => setCurrentBgOffset(height)}
              itemNum={1}
            >
              <ReceiptLongRoundedIcon className="text-2xl" />
            </ListItem>

            <ListItem
              pathname={pathname}
              url="/user/accounts"
              text={hideDrawerTexts ? "" : "Accounts"}
              onClick={(height: number) => setCurrentBgOffset(height)}
              itemNum={2}
            >
              <AccountBalanceOutlinedIcon className="text-2xl" />
            </ListItem>

            <ListItem
              pathname={pathname}
              url="/user/loans"
              text={hideDrawerTexts ? "" : "Loans"}
              onClick={(height: number) => setCurrentBgOffset(height)}
              itemNum={3}
            >
              <CurrencyExchangeRoundedIcon className="text-2xl" />
            </ListItem>

            <ListItem
              pathname={pathname}
              url="/user/contacts"
              text={hideDrawerTexts ? "" : "Contacts"}
              onClick={(height: number) => setCurrentBgOffset(height)}
              itemNum={4}
            >
              <PeopleRoundedIcon className="text-2xl" />
            </ListItem>

          </ul>

          <ul className="mx-2 flex-col flex gap-4 relative mt-auto mb-5 ">
            <div
              className="flex gap-1 bg-glassmorphic-gradient shadow-glassmorphic border border-white border-opacity-5 rounded-2xl px-2 py-2 cursor-pointer hover:bg-glassmorphic-gradient-hover transition-all duration-700"
              onClick={handleClick}
            >
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                className="w-8 h-8 text-base my-auto mr-1"
              >
                {user?.name[0].toLocaleUpperCase()}
              </Avatar>
              <div className="hidden md:flex flex-col">
                <text className="text-white truncate w-28 text-opacity-80">
                  {user?.name}
                </text>
                <text className="text-white truncate w-28 text-sm text-opacity-50">
                  {user?.email}
                </text>
              </div>
              <ArrowRightRoundedIcon className="text-white text-opacity-50 my-auto ml-auto pr-2" />
            </div>
            <GlassmorphicMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              className="ml-40"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleProfilePopupOpen}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  logOut();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </GlassmorphicMenu>
          </ul>
        </div>
        <div className="w-28 md:w-56 min-h-screen" />
      </div>
      {open &&
        <ProfilePopup open={isProfilePopupOpen} handleClose={handleProfilePopupClose} />}
    </>
  );
};

export const Drawer = memo(_Drawer);
