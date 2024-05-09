import { InfiniteData } from "@tanstack/react-query";
import { ContactData } from "./page";
import { ListItem } from "@mui/material";
import { ContactItem } from "./contactItems";
import { Fragment } from "react";

export const ContactList = ({
  data,
}: {
  data?: InfiniteData<ContactData, unknown>;
}) => {
  return (
    <>
      {data?.pages.map((partnerpage, index) => (
        <>
          {partnerpage?.partners.map((partner, index) => (
            <ContactItem key={index} {...partner} />
          ))}
        </>
      ))}
    </>
  );
};
