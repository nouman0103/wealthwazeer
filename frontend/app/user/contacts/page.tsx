import React from 'react';
import { List, Avatar, IconButton, Divider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Close as CloseIcon, Done as DoneIcon } from '@mui/icons-material';
import { GlassmorphicButton } from '@/components/buttons';
import {GlassmorphicInputField} from '@/components/inputs';
import SearchIconRounded from '@mui/icons-material/SearchRounded';
import { Fragment } from 'react';

interface Contact {
  name: string;
}

interface Friend {
  name: string;
  email: string;
}


const PendingRequests: React.FC<Friend> = ({ name, email }) => {
  const getAvatarColor = (initial: string): string => {
    const colors = ['#F87171', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#6EE7B7', '#93C5FD', '#FCD34D', '#EDE9FE'];
    const charCode = initial.charCodeAt(0) % colors.length;
    return colors[charCode];
  };

  const avatarStyle = {
    backgroundColor: getAvatarColor(name[0]),
    color: '#fff',
    marginRight: '20px',
    borderRadius: '50%'
  };

  return (
    <div className="friend-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border-opacity-5 border-white p-2 mb-4">
      <div className='contact-content flex items-center justify-between'>
        <Avatar style={avatarStyle}>
          {name[0]}
        </Avatar>
          <div className="name text-white text-sm  flex-grow">
            {name}
          </div>
          <div className=" text-white text-sm flex-grow">
            {email}
          </div>
        
        <div className="options flex items-center">
          <IconButton style={{ backgroundColor: 'transparent', padding: 4 }}>
            <CloseIcon style={{ color: '#FF0000', fontSize: 18 }} />
          </IconButton>
          <IconButton style={{ backgroundColor: 'transparent', padding: 4 }}>
            <DoneIcon style={{ color: '#6EE7B7', fontSize: 18 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const SentRequests: React.FC<Friend> = ({ name, email }) => {
  const getAvatarColor = (initial: string): string => {
    const colors = ['#F87171', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#6EE7B7', '#93C5FD', '#FCD34D', '#EDE9FE'];
    const charCode = initial.charCodeAt(0) % colors.length;
    return colors[charCode];
  };

  const avatarStyle = {
    backgroundColor: getAvatarColor(name[0]),
    color: '#fff',
    marginRight: '20px',
    borderRadius: '50%'
  };

  return (
    <div className="friend-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border-opacity-5 border-white p-2 mb-4">
      <div className='contact-content flex items-center justify-between'>
        <Avatar style={avatarStyle}>
          {name[0]}
        </Avatar>
          <div className="name text-white text-sm  flex-grow">
            {name}
          </div>
          <div className=" text-white text-sm flex-grow">
            {email}
          </div>
        
        <div className="options flex items-center">
          <IconButton style={{ backgroundColor: 'transparent', padding: 4 }}>
            <CloseIcon style={{ color: '#FF0000', fontSize: 18 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
const ContactItem: React.FC<Contact> = ({ name }) => {
  const getAvatarColor = (initial: string): string => {
    const colors = ['#F87171', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#6EE7B7', '#93C5FD', '#FCD34D', '#EDE9FE'];
    const charCode = initial.charCodeAt(0) % colors.length;
    return colors[charCode];
  };

  const avatarStyle = {
    backgroundColor: getAvatarColor(name[0]),
    color: '#fff',
    marginRight: '20px',
    borderRadius: '50%'
  };

  return (
    <div className="contact-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border border-opacity-5 border-white p-2 mb-4">
      <div className="contact-content flex items-center justify-between">
        <Avatar style={avatarStyle}>
          {name[0]}
        </Avatar>
        <div className="name text-white text-sm flex-grow mr-20">
          {name}
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

const FriendItem: React.FC<Friend> = ({ name, email }) => {
  const getAvatarColor = (initial: string): string => {
    const colors = ['#F87171', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#F472B6', '#6EE7B7', '#93C5FD', '#FCD34D', '#EDE9FE'];
    const charCode = initial.charCodeAt(0) % colors.length;
    return colors[charCode];
  };

  const avatarStyle = {
    backgroundColor: getAvatarColor(name[0]),
    color: '#fff',
    marginRight: '20px',
    borderRadius: '50%'
  };

  return (
    <div className="friend-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border border-opacity-5 border-white p-2 mb-2">
      <div className='contact-content flex items-center justify'>
        <Avatar style={avatarStyle}>
          {name[0]}
        </Avatar>
        <div className="name text-white text-sm flex-grow">
          {name}
        </div>
        <div className="text-white text-sm  flex-grow ">
          {email}
        </div >
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
    { name: "Charlie Davis" },
    { name: "Jughead Jones" },
    { name: "Charlie Dickens" },
    { name: "Danice Dave" }

  ];

  const friends: Friend[] = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
    { name: "June Doe", email: "june@example.com" }

  ];

  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden mb-1">
      <div className="flex">
        <div className="text-2xl font-medium text-white my-auto mr-40">
          Contacts
        </div>
        <div className="text-2xl  ml-40 font-medium text-white my-auto">
          Friends
        </div>
      </div>

      <div className="flex gap-5">
        <div>
          <div className="flex justify-between mb-3">
            <div className='flex gap-20 '>
            <GlassmorphicButton fontSize={16}>
             Add Account
           </GlassmorphicButton>
            </div>
            <div className="flex justify-end">
          <GlassmorphicInputField
          label={
            <Fragment>
              <SearchIconRounded className='w- text-white text-opacity-80 text-3xlmr-2  mb-2 ' />
              <text className='text-white text-opacity-80 -mt-[2px]'>Search for contacts</text>
            </Fragment>
          }
            size='small'
            className='w-96'
          />
         </div>
        </div>

          <List>
            {contacts.map((contact, index) => (
              <ContactItem key={index} {...contact} />
            ))}
          </List>
        </div>

        <Divider orientation="vertical" flexItem />
        <div className ="flex-grow">
        <div className='w- flex mb-2'>
            <GlassmorphicButton fontSize={16}>
             Add Friend
             </GlassmorphicButton>
          </div>


        <div className="friend-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border border-opacity-5 border-white flex-grow p-4 mb-2">
      
         
        <div className="flex justify-end ">
          <GlassmorphicInputField
          label={
            <Fragment>
              <SearchIconRounded className='w- text-white text-opacity-80 text-3xl mr-2  mb-2 ' />
              <text className=' text-white text-opacity-80 -mt-[2px]'>Search in requests</text>
            </Fragment>
          }
            size='small'
            className='w-96'
          />
         </div>
          <div className='flex flex-col flex-grow'>
            <List>
              {friends.map((friend, index) => (
                <SentRequests key={index} {...friend} />
              ))}
            </List>
          </div>
          </div>
          
          <div className="flex justify-end">
          <GlassmorphicInputField
          label={
            <Fragment>
              <SearchIconRounded className='text-white text-opacity-80 text-3xl mr-2  mb-2 ' />
              <text className='text-white text-opacity-80 -mt-[2px]'>Search for friends</text>
            </Fragment>
          }
            size='small'
            className='w-96'
          />
         </div>

          <div className='flex flex-col flex-grow'>
          <List>
            {friends.map((friend, index) => (
              <FriendItem key={index} {...friend} />
            ))}
          </List>
          </div>
        </div>
      </div>
    </div>
  );
}