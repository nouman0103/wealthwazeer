import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, IconButton, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Contact {
  name: string;
}

interface Friend {
  name: string;
  email: string;
}

const ContactItem: React.FC<Contact> = ({ name }) => {
    return (
    <div className ="p-10">
      <div className="bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border-opacity-5 border-white p-8">
        <div className="contact-content">
          <div className="avatar">
            <Avatar>{name[0]}</Avatar>
          </div>
          <div className="name">
            <text className = "text-white text-sm">
                {name}
            </text>
          </div>
          <div className="options">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  const FriendItem: React.FC<Friend> = ({ name, email }) => {
    return (
    <div className ="p-10">
      <div className=" bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border-opacity-5 border-white p-8">
        <div className="avatar">
          <Avatar>{name[0]}</Avatar>
        </div>
        <div className="details">
          <div className="name">
            <text className ="text-white text-sm text-opacity-70">
            {name}
             </text>
            </div>
          <div className="email">
          <text className ="text-white text-sm">
            {email}
            </text>
            </div>
        </div>
        <div className="options">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      </div>
    );
  };

export default function Home() {
  const contacts: Contact[] = [
    { name: "Alice Smith" },
    { name: "Bob Johnson" },
    { name: "Charlie Davis" }
  ];

  const friends: Friend[] = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
    { name: "Michael Smith", email: "michael@example.com" }
  ];

  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-white my-auto">
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
