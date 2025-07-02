"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart, X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    color: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface InteractiveCheckoutProps {
    products?: Product[];
}

function InteractiveCheckout({
    products = defaultProducts,
}: InteractiveCheckoutProps) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) => item.id === product.id
            );
            if (existingItem) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== productId)
        );
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart((currentCart) =>
            currentCart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0
                        ? { ...item, quantity: newQuantity }
                        : item;
                }
                return item;
            })
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="flex gap-6">
                {/* Recommendations Section - Left Side */}
                <div className="flex-1 space-y-3">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Recommended Add-ons</h2>
                        <p className="text-gray-400">Complete your order with these delicious extras</p>
                    </div>
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                                "group",
                                "p-4 rounded-xl",
                                "bg-gray-900/50",
                                "border border-gray-700",
                                "hover:border-orange-500/50",
                                "transition-all duration-200"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "relative w-12 h-12 rounded-lg overflow-hidden",
                                            "bg-gray-800",
                                            "transition-colors duration-200",
                                            "group-hover:bg-gray-700"
                                        )}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-medium text-white">
                                                {product.name}
                                            </h3>
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                                                {product.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className="text-green-400 font-semibold">{product.price.toFixed(2)} PLN</span>
                                            <span>•</span>
                                            <span>{product.color}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addToCart(product)}
                                    className="gap-1.5 border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Cart Section - Right Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                        "w-80 flex flex-col",
                        "p-4 rounded-xl",
                        "bg-gray-900/50",
                        "border border-gray-700",
                        "sticky top-4",
                        "max-h-[32rem]"
                    )}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <ShoppingCart className="w-4 h-4 text-orange-400" />
                        <h2 className="text-sm font-medium text-white">
                            Your Cart ({totalItems})
                        </h2>
                    </div>

                    <motion.div
                        className={cn(
                            "flex-1 overflow-y-auto",
                            "min-h-0",
                            "-mx-4 px-4",
                            "space-y-3"
                        )}
                    >
                        <AnimatePresence initial={false} mode="popLayout">
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        layout: { duration: 0.2 },
                                    }}
                                    className={cn(
                                        "flex items-center gap-3",
                                        "p-2 rounded-lg",
                                        "bg-gray-800/50",
                                        "mb-3"
                                    )}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white truncate">
                                                {item.name}
                                            </span>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-red-400"
                                            >
                                                <X className="w-3 h-3" />
                                            </motion.button>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-1">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            -1
                                                        )
                                                    }
                                                    className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-orange-400"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </motion.button>
                                                <motion.span
                                                    layout
                                                    className="text-xs text-gray-300 w-4 text-center"
                                                >
                                                    {item.quantity}
                                                </motion.span>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            1
                                                        )
                                                    }
                                                    className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-orange-400"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </motion.button>
                                            </div>
                                            <motion.span
                                                layout
                                                className="text-xs text-green-400 font-semibold"
                                            >
                                                {(item.price * item.quantity).toFixed(2)} PLN
                                            </motion.span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div
                        layout
                        className={cn(
                            "pt-3 mt-3",
                            "border-t border-gray-700",
                            "bg-gray-900/50"
                        )}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-white">
                                Total
                            </span>
                            <motion.span
                                layout
                                className="text-sm font-semibold text-green-400"
                            >
                                <NumberFlow value={totalPrice} /> PLN
                            </motion.span>
                        </div>
                        <Button 
                            size="sm" 
                            className="w-full gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                        >
                            <CreditCard className="w-4 h-4" />
                            Complete Order
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export { InteractiveCheckout };
export type { Product };

const defaultProducts: Product[] = [
    {
        id: "1",
        name: "Coca Cola",
        price: 2.50,
        category: "Beverage",
        image: "/images/coca_cola.jpg",
        color: "Beverage"
    },
    {
        id: "2",
        name: "French Fries",
        price: 3.99,
        category: "Side",
        image: "/images/french_fries.jpg",
        color: "Side"
    },
    {
        id: "3",
        name: "BBQ Sauce",
        price: 0.99,
        category: "Sauce",
        image: "/images/bbq_sauce.jpg",
        color: "Sauce"
    }
];
