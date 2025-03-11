"use client";
import { formatPrice } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { useCartStore } from '@/stores/cart-store';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { useShallow } from 'zustand/shallow';

type AddToCartButtonProps = {
    product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const { cartId, addItem, open } = useCartStore(
        useShallow((state) => ({
            cartId: state.cartId,
            addItem: state.addItem,
            open: state.open,
        }))
    );

    const [isLoading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        if (!product.title || product.price === undefined || !product.image) {
            return;
        }
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 600));

        addItem({
            id: product._id,
            title: product.title,
            price: product.price,
            image: urlFor(product.image).url(),
            quantity: 1,
        });

        try {
            const anyWindow = window as any;

            if (anyWindow.umami) {
                anyWindow.umami.track('add_to_cart', {
                    cartId: cartId,
                    productId: product._id,
                    productName: product.title,
                    price: product.price,
                    currency: 'USD',
                });
            }
        } catch (e) {}

        setLoading(false);
        open();
    };

    if (!product.price) {
        return null;
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`
                w-full mt-6 bg-gradient-to-r from-gray-800 to-gray-900
                text-white py-4 font-bold text-xl
                hover:from-gray-900 hover:to-gray-800
                transition-all transform
                hover:scale-[1.02] active:scale-[1.02]
                shadow-lg flex items-center justify-center gap-3
                disabled:opacity-80 disabled:cursor-not-allowed
                disabled:hover:scale-100 disabled:active:scale-100
                disabled:hover:from-gray-800 disabled:hover:to-gray-900
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className='w-6 h-6 animate-spin' />
                    <span>Adding to Cart...</span>
                </>
            ) : (
                <>
                    <MdOutlineShoppingCart className='w-6 h-6' />
                    Add to Cart - {formatPrice(product.price)}
                </>
            )}
        </button>
    );
};

export default AddToCartButton;