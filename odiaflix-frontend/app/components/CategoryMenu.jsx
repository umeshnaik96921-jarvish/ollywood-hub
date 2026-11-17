import React, { useState } from "react";

export default function CategoryMenu({ SIDEBAR_ITEMS, selectedCategory, onSelectCategory }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile Menu Toggle Button - Sirf mobile par dikhega */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#141824] text-white font-semibold border border-white/10 cursor-pointer shadow-md"
        >
          <span>{selectedCategory ? `Category: ${selectedCategory}` : "Menu & Categories"}</span>
          <span className="text-sm">{isMenuOpen ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* Categories List: Mobile par tabhi khulega jab click hoga, Desktop (lg) par hamesha dikhega */}
      <nav className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col space-y-2 py-1`}>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                onSelectCategory(item.name);
                setIsMenuOpen(false); // Mobile par click karte hi menu band ho jaye
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-[#E50914] to-[#B80710] text-white shadow-lg shadow-red-900/40"
                  : "bg-[#141824] hover:bg-[#1f2636] text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4 text-[#E50914]" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}