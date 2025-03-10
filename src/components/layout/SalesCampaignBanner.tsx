'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdLocalFireDepartment } from "react-icons/md";

const SalesCampaignBanner = () => {
    const router = useRouter();

    return (
        <div className='w-full bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 py-3 relative overflow-hidden border-b border-gray-200'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xl sm:text-2xl font-bold text-gray-900 animate-bounce'>🔥</span>
                        <div className='text-sm sm:text-base font-bold text-gray-900'>FLASH SALE ENDS IN:</div>
                        <div className='bg-white px-2 py-1 font-mono font-bold text-gray-900 border border-gray-300 shadow-sm'>
                            23:59:59
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='text-xl sm:text-2xl font-bold text-gray-900'>⚡</span>
                        <span className='font-bold text-gray-900'>UP TO 95% OFF!</span>
                    </div>

                    <button
                        className='bg-gray-900 text-white px-4 py-1 font-bold text-sm hover:bg-gray-800 transition-colors shadow-sm border border-gray-900'
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        SHOP NOW!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesCampaignBanner;