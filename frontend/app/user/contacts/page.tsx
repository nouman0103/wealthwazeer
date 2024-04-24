import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const ContactItem = ({ name }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar>{name[0]}</Avatar>
      </ListItemIcon>
      <ListItemText primary={name} />
      <IconButton edge="end">
        <MoreVertIcon />
      </IconButton>
    </ListItem>
  );
};

const FriendItem = ({ name, email }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Avatar>{name[0]}</Avatar>
      </ListItemIcon>
      <ListItemText primary={name} secondary={email} />
      <IconButton edge="end">
        <MoreVertIcon />
      </IconButton>
    </ListItem>
  );
};

export default function Home() {
  const contacts = [
    { name: "Alice Smith" },
    { name: "Bob Johnson" },
    { name: "Charlie Davis" }
  ];

  const friends = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
    { name: "Michael Smith", email: "michael@example.com" }
  ];

  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-white text-opacity-80 my-auto">
          Contacts
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-white rounded-full bg-blue-500 px-3 py-1">
            + Add Contact
          </button>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <Divider />

      <List>
        {contacts.map((contact, index) => (
          <ContactItem key={index} {...contact} />
        ))}
      </List>

      <Divider />

      <div className="text-xl font-semibold text-white mt-5">Friends</div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-white rounded-full bg-blue-500 px-3 py-1">
          + Add Friend
        </button>
      </div>

      <div>
        <div className="text-white font-semibold mt-5">Requests</div>
        {/* Requests List */}
      </div>
      <div>
        <div className="text-white font-semibold mt-5">Friend Cards</div>
        <List>
          {friends.map((friend, index) => (
            <FriendItem key={index} {...friend} />
          ))}
        </List>
      </div>
    </div>
  );
}
