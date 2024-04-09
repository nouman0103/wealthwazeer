import React from 'react';
import Image from 'next/image';
import Logo_BlackOutline from '../assets/Logo_BlackOutline.svg';

const Header: React.FC = () => {
    return (
        <header className='flex justify-between p-6'>
            <div className="flex">
                <Image src={Logo_BlackOutline} alt="Logo" height={60} />
                <text className='my-auto ml-3 text-3xl font-bold'>WealthWazeer</text>
            </div>
            <nav className='ml-auto my-auto mr-3'>
                <ul className='flex gap-6 text-3xl font-bold'>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;