"use client";
import React, { useEffect, useState } from "react";
import { List, Avatar, IconButton, Divider, ListItem, CircularProgress, Grid, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Close as CloseIcon, Done as DoneIcon } from "@mui/icons-material";
import { GlassmorphicButton } from "@/components/buttons";
import { GlassmorphicInputField } from "@/components/inputs";
import SearchIconRounded from "@mui/icons-material/SearchRounded";
import { Fragment } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  ContactInterface,
  ContactItem,
  FriendInterface,
  FriendItem, PendingRequests,
  SentRequests,
} from "./contactItems";
import { AddContactPopup } from "./AddContactPopup";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { MetaResponse } from "@/utls/interface";
import { useAuth } from "@/context/AuthContex";
import { useInView } from "react-intersection-observer";
import { AddFriendPopup } from "./AddFriendPopup";
import { ContactList } from "./ContactList";

export interface ContactData {
  partners: ContactInterface[];
  meta: MetaResponse;
}
export default function Home() {
  const { api } = useAuth();
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ContactData>({
      queryKey: ["infiniteContacts"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await api.get<ContactData>("/partners", {
          params: {
            limit: 100,
            page: pageParam,
            search: search ?? null,
          },
        });
        return response.data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.meta.next;
      },
      initialPageParam: 0,
    });
  const [ref, inView] = useInView();

  const friends: FriendInterface[] = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
    { name: "June Doe", email: "june@example.com" },
    { name: "July Doe", email: "july@example.com" },
  ];
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState<
    "pendingRequests" | "sentRequests"
  >("pendingRequests");
  const selectedTabStyles =
    "border border-white border-opacity-10 bg-strongGlass  shadow-strongGlass";
  const unselectedTabStyles =
    "hover:bg-white hover:bg-opacity-10 border-opacity-0";

  const [newContactPopupOpen, setNewContactPopupOpen] = useState(false);
  const [newFriendPopupOpen, setNewFriendPopupOpen] = useState(false);

  return (
    <div className="p-8 flex gap-5 flex-grow overflow-hidden mb-1 w-full">
      <div className="flex flex-col w-full">
        <span className="text-2xl font-medium text-white mb-4">Contacts</span>
        <div className="flex justify-between">
          <GlassmorphicButton
            fontSize={16}
            startIcon={<AddRoundedIcon className="mr-2" />}
            onClick={() => setNewContactPopupOpen(true)}
          >
            Add Contact
          </GlassmorphicButton>
          <div className="my-auto">
            <GlassmorphicInputField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                queryClient.invalidateQueries({
                  queryKey: ["contacts"],
                });
              }}
              label={
                <Fragment>
                  <SearchIconRounded
                    className="text-white text-opacity-80 text-sm mr-2 my-auto"
                    fontSize="inherit"
                  />
                  <span className="text-white text-opacity-60 text-base">
                    Search for contacts
                  </span>
                </Fragment>
              }
              size="small"
              className="w-56"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <ContactList data={data} />
          <div about="End of Scroll" className="text-center" ref={ref}>
            {(isFetchingNextPage || isLoading) &&
              <CircularProgress />
            }
          </div>
        </div>
      </div>

      {/*

      <Divider orientation="vertical" flexItem />

      <div className="flex flex-col flex-grow">
        <span className="text-2xl font-medium text-white mb-4">Friends</span>
        <div>
          <GlassmorphicButton
            fontSize={16}
            startIcon={<AddRoundedIcon className="mr-2" />}
            className="mr-auto"
            onClick={() => setNewFriendPopupOpen(true)}>
            Add Friend
          </GlassmorphicButton>
        </div>

        <div className="mt-5 bg-glassmorphic-gradient shadow-glassmorphic rounded-3xl border border-opacity-5 border-white flex-grow p-4 mb-2">
          <div className="flex space-between">
            <div className="flex w-72 h-14 p-1 bg-white bg-opacity-5 mr-auto rounded-full">
              <div
                className={`w-1/2 rounded-full py-3 text-center cursor-pointer ${selectedTab === "pendingRequests"
                    ? selectedTabStyles
                    : unselectedTabStyles
                  }`}
                onClick={() => setSelectedTab("pendingRequests")}
              >
                Pending requests
              </div>
              <div
                className={`w-1/2 rounded-full py-3 text-center cursor-pointer ${selectedTab === "sentRequests"
                    ? selectedTabStyles
                    : unselectedTabStyles
                  }`}
                onClick={() => setSelectedTab("sentRequests")}
              >
                Requests sent
              </div>
            </div>
            <div className="my-auto">
              {/* <GlassmorphicInputField
                label={
                  <Fragment>
                    <SearchIconRounded
                      className="text-white text-opacity-80 text-sm mr-2 my-auto"
                      fontSize="inherit"
                    />
                    <span className=" text-white text-base text-opacity-80">
                      Search in requests
                    </span>
                  </Fragment>
                }
                size="small"
                className="w-72 ml-auto my-auto"
              /> 
            </div>
          </div>

          <List disablePadding className='snap-y snap-mandatory overflow-y-auto max-h-64'>
            {(selectedTab === 'pendingRequests') ? (
              friends.map((friend, index) => (
                <ListItem disablePadding sx={{ width: "100%" }} className='snap-start'>
                  <PendingRequests key={index} {...friend} />
                </ListItem>
              ))
            ) : (
              friends.map((friend, index) => (
                <ListItem disablePadding sx={{ width: "100%" }}>
                  <SentRequests key={index} {...friend} />
                </ListItem>
              ))
            )}
          </List>

        </div>

        {/*<div className="flex justify-end my-5">
           <GlassmorphicInputField
            label={
              <Fragment>
                <SearchIconRounded
                  className="text-white text-opacity-80 text-sm mr-2 my-auto"
                  fontSize="inherit"
                />
                <span className=" text-white text-base text-opacity-80">
                  Search in friends
                </span>
              </Fragment>
            }
            size="small"
            className="w-72 my-auto"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <List disablePadding>
            {friends.map((friend, index) => (
              <FriendItem key={index} {...friend} />
            ))}
          </List>
        </div>
      </div>
          */}
      {newContactPopupOpen &&
        <AddContactPopup
          open={newContactPopupOpen}
          handleClose={() => setNewContactPopupOpen(false)}
        />}
      <AddFriendPopup open={newFriendPopupOpen} handleClose={() => setNewFriendPopupOpen(false)} />
    </div>
  );
}
