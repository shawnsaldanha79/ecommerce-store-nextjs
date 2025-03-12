'use client';

import { formatPrice } from '@/lib/utils';
import { useCartStore, type CartItem as CartItemType } from '@/stores/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { MdOutlineClose, MdOutlineShoppingCart } from 'react-icons/md';
import { useShallow } from 'zustand/shallow';

const freeShippingAmount = 15; // $15 for free shipping

const CartItem = ({ item }: { item: CartItemType }) => {
    const { removeItem, updateQuantity } = useCartStore(
        useShallow((state) => ({
            removeItem: state.removeItem,
            updateQuantity: state.updateQuantity,
        }))
    );
    return (
        <div key={`cart-item-${item.id}`} className='flex gap-4 p-4 hover:bg-gray-50 border-b border-gray-200'>
            <div className='relative w-20 h-20 flex-shrink-0 border border-gray-200'>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover'
                />
            </div>

            <div className='flex-1 min-w-0'>
                <h3 className='font-medium text-gray-900 truncate'>
                    {item.title}
                </h3>

                <div className='text-sm text-gray-500 mt-1'>
                    { formatPrice(item.price) }
                </div>

                <div className='flex items-center gap-3 mt-2'>
                    <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className='border border-gray-200 px-2 py-1 text-sm bg-white focus:ring-1 focus:ring-black focus:border-transparent transition-colors'
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={`cart-qty-slct-${item.id}-${num}`} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => removeItem(item.id)}
                        className='text-red-600 text-sm hover:text-red-700 transition-colors'
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

const Cart = () => {
    const { cartId, removeItem, updateQuantity, items, close, isOpen, syncWithUser, setLoaded, getTotalPrice, getTotalItems } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId,
            removeItem: state.removeItem,
            updateQuantity: state.updateQuantity,
            items: state.items,
            close: state.close,
            isOpen: state.isOpen,
            syncWithUser: state.syncWithUser,
            setLoaded: state.setLoaded,
            getTotalPrice: state.getTotalPrice,
            getTotalItems: state.getTotalItems,
        }))
    );

    useEffect(() => {
        const initCart = async () => {
            await useCartStore.persist.rehydrate();
            await syncWithUser();
            setLoaded(true);
        };
        initCart();
    }, []);

    // ADD CHECKOUT FUNCTION

    const totalPrice = getTotalPrice();

    const remainingForFreeShipping = useMemo(() => {
        return Math.max(0, freeShippingAmount - totalPrice);
    }, [totalPrice]);

    return (
        <>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity backdrop-blur-sm'
                    onClick={close}
                />
            )}

            <div
                className={`
                    fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out z-50
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className='flex flex-col h-full'>
                    <div className='flex items-center justify-between p-4 border-b bg-gray-50'>
                        <div className='flex items-center gap-2'>
                            <MdOutlineShoppingCart className='w-5 h-5' />
                            <h2 className='text-lg font-semibold'>Shopping Cart</h2>
                            <span className='bg-gray-200 px-2 py-1 rounded-full text-sm font-medium'>
                                {getTotalItems()}
                            </span>
                        </div>
                        <button
                            onClick={close}
                            className='p-2 hover:bg-gray-200 rounded-full transition-colors'
                        >
                            <MdOutlineClose className='w-5 h-5' />
                        </button>
                    </div>
                    
                    <div className='flex-1 overflow-y-auto'>
                        {items.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full p-4 text-center'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                                    <MdOutlineShoppingCart className='w-8 h-8 text-gray-400' />
                                </div>
                                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                    Your cart is empty
                                </h3>
                                <p className='text-gray-500 mb-6'>
                                    Looks like you have not added any items to your cart yet!
                                </p>
                                <Link
                                    href="/"
                                    onClick={close}
                                    className='bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors'
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className='divide-y'>
                                {items.map((item) => (
                                    <CartItem key={'cart-item-'+item.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className='border-t'>
                            {remainingForFreeShipping > 0 ? (
                                <div className='p-4 bg-blue-50 border-b'>
                                    <div className='flex items-center gap-2 text-blue-800 mb-2'>
                                        <span>🚚</span>
                                        <span className='font-medium'>
                                            Add {formatPrice(remainingForFreeShipping)} more for FREE shipping
                                        </span>
                                    </div>
                                    <div className='w-full bg-blue-200 rounded-full h-2'>
                                        <div
                                            className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                                            style={{ width: `${Math.min(100, (totalPrice / freeShippingAmount) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className='p-4 bg-green-50 border-b'>
                                    <div className='flex items-center gap-2 text-green-800'>
                                        <span>✨</span>
                                        <span className='font-medium'>
                                            You have unlocked FREE shipping!
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;