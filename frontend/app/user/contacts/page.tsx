"use client";
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ContactItemProps {
    name: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ name }) => {
    return (
        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'background.paper', padding: '10px', marginBottom: '8px', borderRadius: '10px' }}>
            <ListItemIcon>
                <Avatar>{name[0]}</Avatar>
            </ListItemIcon>
            <ListItemText primary={name} />
            <IconButton edge="end" aria-label="options">
                <MoreVertIcon />
            </IconButton>
        </ListItem>
    );
}

export default function Home() {
    const contacts = [
        { name: "Alice Smith" },
        { name: "Bob Johnson" },
        { name: "Charlie Davis" }
    ];

    return (
        <main className="min-h-screen bg-dark-bg-gr-to-purple flex">
            <div className="p-10">
                <div className="w-72 bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-8">
                    <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>Contacts</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                            Add Contact
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            Search for Contacts
                        </div>
                    </div>
                    <List>
                        {contacts.map((contact, index) => (
                            <ContactItem key={index} name={contact.name} />
                        ))}
                    </List>
                </div>
            </div>
        </main>
    );
}