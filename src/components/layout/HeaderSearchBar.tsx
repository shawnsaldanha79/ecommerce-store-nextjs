import React from 'react';
import { MdOutlineSearch } from 'react-icons/md';

const HeaderSearchBar = () => {
    return (
        <form action='/search' className='relative'>
            <div className='absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none'>
                <MdOutlineSearch className='h-5 w-5 text-gray-500' />
            </div>

            <input
                type='text'
                name='query'
                placeholder='Search...'
                className='w-32 pl-8 pr-2 py-1 text-sm border border-gray-200 focus:ring-1 focus:ring-black focus:border-transparent transition-colors bg-white outline-none'
            />
        </form>
    );
};

export default HeaderSearchBar;