import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import AddToCartButton from '@/components/product/AddToCartButton';
import { formatPrice } from '@/lib/utils';
import { getProductById } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdChevronRight, MdOutlineHome } from 'react-icons/md';

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product.price) {
        return <div>Product not found</div>;
    }

    const originalPrice = product.price * 5;

    return (
        <div className='bg-gray-50'>
            <SalesCampaignBanner />

            <div className='bg-white border-b border-gray-200'>
                <div className='container mx-auto py-3 px-4'>
                    <div className='flex items-center gap-2 text-sm'>
                        <Link
                            href='/'
                            className='text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1'
                        >
                            <MdOutlineHome className='w-4 h-4' />
                            <span>Home</span>
                        </Link>
                        <MdChevronRight className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-400 truncate'>{product.title}</span>
                    </div>
                </div>
            </div>

            <div className='bg-gradient-to-r from-gray-100 to-gray-200 py-6 px-4'>
                <div className='container mx-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-900 mb-3'>
                        🔥 FLASH SALE - 80% OFF 🔥
                    </h1>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-center text-gray-600 text-sm md:text-base font-semibold animate-pulse'>
                            ⚡️ Only {Math.floor(Math.random() * 10) + 1} items left at this price!
                        </p>
                        <div className='bg-gray-200 text-gray-800 px-3 py-1 text-sm'>
                            ⏰ Offer ends soon!
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white py-4 border-b border-gray-200'>
                <div className='container mx-auto'>
                    <div className='flex flex-wrap items-center justify-center gap-6 text-sm'>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-800 text-xl'>🚚</span>
                            <span className='font-medium'>Free Express Shipping</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-800 text-xl'>✨</span>
                            <span className='font-medium'>Satisfaction Guaranteed</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-800 text-xl'>🔒</span>
                            <span className='font-medium'>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mx-auto p-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {product.image && (
                        <div className='bg-white p-4 shadow-sm border border-gray-200'>
                            <div className='relative aspect-square'>
                                <Image
                                    fill
                                    priority
                                    className='object-contain hover:scale-105 transition-transform duration-300'
                                    alt={product.title ?? 'Product Image'}
                                    src={urlFor(product.image).url()}
                                />
                            </div>
                        </div>
                    )}

                    <div className='flex flex-col gap-4'>
                        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                            {product.title}
                        </h1>
                        <p className='text-gray-600'>{product.description}</p>

                        <div className='flex flex-col gap-2 mt-4'>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-baseline gap-1'>
                                    <span className='text-xs font-bold text-gray-800'>US</span>
                                    <span className='text-5xl font-black text-gray-900 tracking-tight'>
                                        {formatPrice(product.price).replace('$', '')}
                                    </span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-lg text-gray-400 line-through decoration-gray-500/50 decoration-2'>
                                        {formatPrice(originalPrice)}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                        <span className='bg-gray-900 text-white px-2 py-0.5 text-sm font-bold animate-pulse'>
                                            -80%
                                        </span>
                                        <span className='text-gray-900 font-bold text-sm'>
                                            MEGA SAVINGS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-2 bg-gray-100 p-2'>
                                <span className='text-gray-900 font-bold'>💰</span>
                                <span className='text-gray-900 font-medium text-sm'>
                                    You save {formatPrice(originalPrice - product.price)}!
                                </span>
                            </div>

                            <div className='flex items-center gap-2 text-xs text-gray-600'>
                                <span className='inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                <span>{Math.floor(Math.random() * 50) + 20} people bought in the last hour</span>
                            </div>
                        </div>

                        <div className='bg-gray-100 p-4 mt-4'>
                            <div className='flex items-center gap-2 text-gray-900'>
                                <span className='text-xl'>⚡️</span>
                                <span className='font-bold'>Limited Time Offer!</span>
                            </div>
                            <div className='text-sm text-gray-700 mt-1 font-medium'>
                                Order now before price changes!
                            </div>
                        </div>

                        <AddToCartButton product={product}/>

                        <div className='flex flex-col gap-3 mt-6 text-sm bg-white p-4 shadow-sm border border-gray-200'>
                            <div className='flex items-center gap-3 text-gray-700'>
                                <span className='bg-gray-100 p-2'>✅</span>
                                <span className='font-medium'>In stock - Ships within 24 hours</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-700'>
                                <span className='bg-gray-100 p-2'>🔄</span>
                                <span className='font-medium'>30-day money-back guarantee</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-700'>
                                <span className='bg-gray-100 p-2'>🛡️</span>
                                <span className='font-medium'>Secure payment processing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;