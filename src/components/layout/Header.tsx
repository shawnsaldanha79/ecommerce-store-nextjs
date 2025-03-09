'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdOutlineSearch } from "react-icons/md"
import { HiOutlineShoppingBag } from "react-icons/hi"

const AnnouncementBar = () => {
    return (
        <div className='w-full bg-black py-2'>
            <div className='container mx-auto flex items-center justify-center px-8'>
                <span className='text-center text-sm font-medium tracking-wide text-white'>
                    FREE SHIPPING ON ORDERS OVER $15 * FREE RETURNS
                </span>
            </div>
        </div>
    )
}

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [prevScrollY, setPrevScrollY] = useState<number>(0)
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const scrolledUp = currentScrollY < prevScrollY
            if (scrolledUp) {
                setIsOpen(true)
            } else if (currentScrollY > 100) {
                setIsOpen(false)
            }
            setPrevScrollY(currentScrollY)
        }
        setPrevScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollY])
    
  return (
    <header className='w-full sticky top-0 z-50'>
        <div 
            className={`w-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <AnnouncementBar />
            <div className='w-full flex justify-between items-center py-3 sm:py-4 bg-white/80 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
                <div className='flex justify-between items-center container mx-auto px-8'>
                    <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'>
                        <button className='text-gray-700 hover:text-gray-900 md:hidden'>
                            button
                        </button>
                        <nav className='hidden md:flex gap-4 lg:gap-6 text-sm font-medium'>
                            <Link href={'#'} className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>Shop</Link>
                            <Link href={'#'} className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>New Arrivals</Link>
                            <Link href={'#'} className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>Sale</Link>
                        </nav>
                    </div>
                    <Link href={'#'} className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                        link
                    </Link>
                    <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4'>
                        <button className='text-gray-700 hover:text-gray-800 hidden sm:block'>
                            <MdOutlineSearch  className='h-5 w-5 sm:h-6 sm:w-6'/>
                        </button>
                        <Link href='/auth/sign-in' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>Sign In</Link>
                        <Link href='/auth/sign-up' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>Sign Up</Link>
                        <button className='text-gray-700 hover:text-gray-900 relative'>
                            <HiOutlineShoppingBag  className='h-5 w-5 sm:h-6 sm:w-6'/>
                            <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center'>
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header