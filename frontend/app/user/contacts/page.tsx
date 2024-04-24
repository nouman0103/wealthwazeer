import React from 'react';
import { List, Avatar, IconButton, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { Close as CloseIcon, Done as DoneIcon } from '@mui/icons-material';

interface Contact {
  name: string;
}

interface Friend {
  name: string;
  email: string;
}

interface AddButtonProps {
  title: string;
}

interface SearchButtonProps {
  title: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ title }) => {
  return (
    <div className="bg-glassmorphic-gradient rounded-full border-opacity-5 border-white p-2 flex items-center space-x-2">
      <IconButton size="small">
        <SearchIcon fontSize="small" />
      </IconButton>
      <span className="text-white text-sm text-opacity-70">
        {title}
        </span>
    </div>
  );
};

const AddButton: React.FC<AddButtonProps> = ({ title }) => {
  return (
    <div className="flex items-center space-x-8">
      <div className="bg-glassmorphic-gradient border-opacity-5 border-white p-2 flex items-center space-x-0 rounded-lg mr-10">
        <IconButton size="small">
          <AddIcon style={{ fontSize: '2rem', color: 'white', opacity: 0.7, marginRight: '0.5rem', marginTop: 'auto', marginBottom: 'auto' }} />
          <span className="text-white text-sm text-opacity-70 my-auto">{
          title}
          </span>
        </IconButton>
      </div>
    </div>
  );
};

const Requests: React.FC<Friend> = ({ name, email }) => {
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
        <div className="details flex-grow">
          <div className="name text-white text-sm">
            {name}
          </div>
          <div className="email text-white text-sm">
            {email}
          </div>
        </div>
        <div className="options flex items-center">
          <IconButton style={{ backgroundColor: 'transparent', padding:4 }}>
            <CloseIcon style={{ color: '#FF0000', fontSize:18 }} />
          </IconButton>
          <IconButton style={{ backgroundColor: 'transparent', padding:4 }}>
            <DoneIcon style={{ color: '#6EE7B7',fontSize:18 }} />
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
    <div className="contact-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border-opacity-5 border-white p-2 mb-4">
      <div className="contact-content flex items-center justify-between">
        <Avatar style={avatarStyle}>
          {name[0]}
          </Avatar>
        <div className="name text-white text-sm flex-grow mr-40">
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
    <div className="friend-item bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border-opacity-5 border-white p-2 mb-2">
      <div className='contact-content flex items-center justify'>
        <Avatar style = {avatarStyle}>
          {name[0]}
        </Avatar>
          <div className="name text-white text-sm flex-grow mr-20">
            {name}
          </div>
          <div className="text-white text-sm  mr-20">
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
        <div className="text-2xl font-semibold text-white my-auto mr-40">
          Contacts
        </div>
        <div className="text-2xl  ml-40 font-semibold text-white my-auto">
        Partners
      </div>
      </div>
      <Divider orientation="vertical" flexItem />
    <div className="flex items-center space-x-8">
      <AddButton title="Add Account" />
      <div className="ml-4"> 
      <SearchButton title = "Search Contacts" />
      </div>
    </div> 
      
      <div className="flex gap-5">
        <List>
          {contacts.map((contact, index) => (
            <ContactItem key={index} {...contact} />
          ))}
        </List>
  
        <Divider orientation="vertical" flexItem />
        <div>
        <List>
          {friends.map((friend, index) => (
            <Requests key={index} {...friend} />
          ))}
        </List>
        </div>
        <div>
        <List>
          {friends.map((friend, index) => (
            <FriendItem key={index} {...friend} />
          ))}
        </List>
        </div>
      </div>
    </div>
  );
}