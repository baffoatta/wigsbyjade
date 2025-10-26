"use client";

import {
  mainNavItems,
  NavItem,
  promoBanner,
  socialIcons,
  utilityNavItems,
} from "@/data/navBar";
import Link from "next/link";
import React, { useState } from "react";

// Social Media Icons Component
const SocialIcon: React.FC<{ icon: string; href: string; name: string }> = ({
  icon,
  href,
  name,
}) => {
  const getIconPath = (iconName: string) => {
    switch (iconName) {
      case "instagram":
        return (
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        );
      case "facebook":
        return (
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        );
      case "youtube":
        return (
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        );
      default:
        return null;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black hover:text-gray-600 transition-colors"
      aria-label={name}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {getIconPath(icon)}
      </svg>
    </a>
  );
};

// Dropdown Menu Component
const DropdownMenu: React.FC<{ items: NavItem[]; isOpen: boolean }> = ({
  items,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="py-1">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
      <div className="px-4 py-2 space-y-1">
        {mainNavItems.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              onClick={onClose}
            >
              {item.label}
            </Link>
            {item.hasDropdown && item.dropdownItems && (
              <div className="pl-6 space-y-1">
                {item.dropdownItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={onClose}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      {/* Promotional Banner */}
      <div className="bg-rose-800 text-white text-center py-2 px-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm font-medium">{promoBanner.text}</span>
          <Link
            href={promoBanner.ctaHref}
            className="text-white underline hover:text-gray-200 transition-colors text-sm font-medium"
          >
            {promoBanner.ctaText}
          </Link>
        </div>
      </div>

      {/* Utility Navigation - Hidden on Mobile */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-6 text-sm">
              {utilityNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {socialIcons.map((social, index) => (
                <SocialIcon
                  key={index}
                  icon={social.icon}
                  href={social.href}
                  name={social.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex flex-col">
                <div className="text-lg font-bold text-black relative">
                  HAIR
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-black transform -translate-y-1/2"></div>
                </div>
                <div className="text-xl font-serif text-black -mt-1">city</div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className="text-black hover:text-gray-600 transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className="ml-1 text-black hover:text-gray-600 transition-colors"
                        aria-label={`Toggle ${item.label} dropdown`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.hasDropdown && (
                    <DropdownMenu
                      items={item.dropdownItems || []}
                      isOpen={openDropdown === item.label}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile & Desktop User Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Search Icon - Always visible */}
              <button
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Mobile Menu Button - Only on mobile */}
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden text-black hover:text-gray-600 transition-colors"
                aria-label="Open mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Cart Icon - Always visible */}
              <Link
                href="/cart"
                className="text-black hover:text-gray-600 transition-colors"
                aria-label="Shopping Cart"
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
              </Link>

              {/* Account Icon - Only on desktop */}
              <Link
                href="/account"
                className="hidden lg:block text-black hover:text-gray-600 transition-colors"
                aria-label="Account"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />

      {/* Click outside to close dropdowns and mobile menu */}
      {(openDropdown || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            handleDropdownClose();
            handleMobileMenuClose();
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
