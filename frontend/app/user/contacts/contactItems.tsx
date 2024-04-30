import React, { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Close as CloseIcon, Done as DoneIcon } from '@mui/icons-material';

export interface ContactInterface {
    name: string;
}

export interface FriendInterface {
    name: string;
    email: string;
}

const generateRandomDarkColor = () => {
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = Math.floor(Math.random() * 128).toString(16);
        color += value.padStart(2, '0');
    }
    return color;
};

export const PendingRequests: React.FC<FriendInterface> = ({ name, email }) => {
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

export const SentRequests: React.FC<FriendInterface> = ({ name, email }) => {

    const [avatarColor] = useState(generateRandomDarkColor);

    const avatarStyle = {
        backgroundColor: avatarColor,
        color: '#fff',
        marginRight: '20px',
        borderRadius: '50%',
        fontSize: '1.2rem'
    };

    return (
        <div className="flex justify-between w-full bg-glassmorphic-gradient border border-opacity-5 border-white shadow-glassmorphic rounded-2xl p-2 mt-3">
            <Avatar style={avatarStyle} className='my-auto ml-2'>
                {name[0]}
            </Avatar>
            <div className="w-min text-white text-base my-auto max-w-32 truncate">
                {name}
            </div>
            <div className=" text-white text-opacity-50 text-base my-auto mx-auto">
                {email}
            </div>

            <IconButton style={{ backgroundColor: 'transparent', padding: 4 }}>
                <CloseIcon style={{ color: '#FF0000', fontSize: 18 }} />
            </IconButton>
        </div>
    );
};
export const ContactItem: React.FC<ContactInterface> = ({ name }) => {
    const [avatarColor] = useState(generateRandomDarkColor);

    const avatarStyle = {
        backgroundColor: avatarColor,
        color: '#fff',
        marginRight: '20px',
        borderRadius: '50%',
        fontSize: '1.2rem'
    };

    return (
        <div className="flex bg-glassmorphic-gradient shadow-glassmorphic rounded-2xl border border-opacity-5 border-white p-1 mt-3">
            <Avatar style={avatarStyle} className='my-auto ml-2'>
                {name[0]}
            </Avatar>
            <div className="text-white text-base my-auto flex-grow w-72 truncate">
                {name}
            </div>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
    );
};

export const FriendItem: React.FC<FriendInterface> = ({ name, email }) => {
    const [avatarColor] = useState(generateRandomDarkColor);

    const avatarStyle = {
        backgroundColor: avatarColor,
        color: '#fff',
        marginRight: '20px',
        borderRadius: '50%',
        fontSize: '1.2rem'
    };

    return (
        <div className="flex justify-between bg-glassmorphic-gradient shadow-glassmorphic rounded-2xl border border-opacity-5 border-white p-1 mt-3">
            <Avatar style={avatarStyle} className='my-auto ml-2'>
                {name[0]}
            </Avatar>
            <div className="name text-white text-base my-auto truncate">
                {name}
            </div>
            <div className=" text-white text-opacity-50 text-base my-auto mx-auto">
                {email}
            </div>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
    );
};