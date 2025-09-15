import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, User } from "lucide-react";

interface NavigationProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export function TopNavigation({ activeMenu, onMenuChange }: NavigationProps) {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const mainMenuItems = [
    { id: "map", label: "Map" },
    { id: "ask", label: "Ask" },
    { id: "search", label: "Search" },
    { id: "formulation", label: "Formulation" },
    { id: "predict", label: "Predict" },
    { id: "favorites", label: "Favorites" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center" style={{ marginLeft: '-50px' }}>
          <img 
            src="/logo.png" 
            alt="SES Logo" 
            className="w-auto"
            style={{ height: '24px' }}
          />
        </div>

        {/* Main Navigation */}
        <div className="flex items-center gap-8">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`relative px-1 py-2 transition-colors ${
                activeMenu === item.id
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              style={{ fontSize: '16px' }}
            >
              {item.label}
              {activeMenu === item.id && (
                <div 
                  className="absolute left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#16a34a', bottom: '-12px' }}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4" style={{ marginRight: '-50px' }}>
          <div className="relative">
            <button
              onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              style={{ fontSize: '16px' }}
            >
              About
              <ChevronDown className="w-4 h-4" />
            </button>
            {showAboutDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-32">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Help
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Documentation
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Contact
                </a>
              </div>
            )}
          </div>
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}