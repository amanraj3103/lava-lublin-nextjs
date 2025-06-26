import React from 'react';
import TiltedCard from './TiltedCard';

export type MenuItemType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  bestSeller?: boolean;
  spicy?: boolean;
  popular?: boolean;
  rating?: number;
  reviews?: number;
  preparationTime?: string;
  calories?: number;
  tags?: string[];
};

type MenuSectionProps = {
  title: string;
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType) => void;
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, onAddToCart }) => {
  return (
    <section className="menu-section mb-8">
      <h3 className="text-xl font-semibold text-orange-400 menu-section-title mb-2">{title}</h3>
      <div className="menu-row flex overflow-x-auto gap-4 py-2 relative">
        {items.map(item => (
          <div
            key={item.id}
            className="menu-item bg-gray-800 rounded-xl p-4 flex flex-col min-w-[280px] max-w-[280px] hover:bg-gray-700 transition-all shadow-lg border border-gray-700"
          >
            <div className="relative mb-3">
              <TiltedCard
                imageSrc={item.image}
                altText={item.name}
                captionText={item.name}
                containerHeight="150px"
                containerWidth="100%"
                imageHeight="150px"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={true}
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {item.category}
              </div>
              {item.bestSeller && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  🔥 Best Seller
                </div>
              )}
              {item.spicy && (
                <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  🌶️ Spicy
                </div>
              )}
            </div>
            <h4 className="text-lg font-bold text-white mb-1">{item.name}</h4>
            <p className="text-gray-300 text-sm mb-2 flex-grow">{item.description}</p>
            
            {/* Rating and Reviews */}
            {item.rating && (
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white text-sm">{item.rating}</span>
                  <span className="text-gray-400 text-sm">({item.reviews})</span>
                </div>
                {item.preparationTime && (
                  <span className="text-orange-400 text-xs">{item.preparationTime}</span>
                )}
              </div>
            )}
            
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-yellow-500 font-bold text-lg">{(item.price / 100).toFixed(2)} PLN</span>
              <button
                onClick={() => onAddToCart(item)}
                className="add-to-cart-btn bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        <div className="scroll-hint absolute right-2 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none hidden md:block">
          👉 Scroll
        </div>
      </div>
    </section>
  );
};

export default MenuSection; 