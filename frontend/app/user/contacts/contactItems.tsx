import React, { useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Close as CloseIcon, Done as DoneIcon } from '@mui/icons-material';
import { GlassmorphicIconButton } from '@/components/buttons';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';

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

            <div className="options flex items-center gap-3">
                <GlassmorphicIconButton className='p-3'>
                    <CloseIcon className='text-red-500' fontSize="small" />
                    <div className='absolute w-4 h-4 bg-red-700 opacity-60 blur-md' />
                </GlassmorphicIconButton>
                <GlassmorphicIconButton className='p-3'>
                    <DoneIcon className='text-green-500' fontSize="small" />
                    <div className='absolute w-4 h-4 bg-green-700 opacity-60 blur-md' />
                </GlassmorphicIconButton>
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

            <GlassmorphicIconButton className='p-3'>
                <CloseIcon className='text-red-500' fontSize="small" />
                <div className='absolute w-4 h-4 bg-red-700 opacity-60 blur-md' />
            </GlassmorphicIconButton>
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