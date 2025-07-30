'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/app/components/AppContext";
import { Squash as Hamburger } from 'hamburger-react'

import carLogo from "../../public/Assets/car-icon.svg";
import notifIcon from "../../public/Assets/notif-icon.svg";
import PrimaryButton from "./PrimaryButton";

const TopBar = () => {
  const { profile, profileLoading, setProfile } = useAppContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const router = useRouter();
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);

  // Helper function to get user initials
  const getUserInitials = () => {
    if (profile?.user.firstName && profile?.user.lastName) {
      return `${profile.user.firstName.charAt(0)}${profile.user.lastName.charAt(0)}`.toUpperCase();
    } else if (profile?.user.firstName) {
      const nameParts = profile.user.firstName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return profile.user.firstName.charAt(0).toUpperCase();
    }
    return 'U'; // Default fallback
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsProfileDropdownOpen(false);
    closeDrawer();
    setProfile(null); // Clear the profile from context
    router.push('/instructor/login');
    
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close if click is outside BOTH profileRef and dropdownRef
      if (
        isProfileDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <>
      {/* TopBar */}
      <div className="flex justify-between items-center bg-white outline-[1px] outline-greyforoutline px-4 md:px-16 py-4 relative z-50">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <Image
              src={carLogo}
              alt="Logo"
              width={30}
              height={20}
            />
            <span className="font-raleway">Project Portico</span>
          </div>
        
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-4 text-sm">
            <a href="#" className="hover:text-primary font-normal">Home</a>
            <a href="#" className="hover:text-primary font-normal">For Instructors</a>
            <a href="#" className="hover:text-primary font-normal">For Learners</a>
          </div>
        </div>
        
        {/* Desktop Profile/Login - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-4">
          <Image 
            src={notifIcon} 
            alt="Notifications" 
            width={15} 
            height={15} 
            className="cursor-pointer hover:scale-110"
          />
          
          {profileLoading ? (
            <PrimaryButton text={"Login"} onClick={() => {router.push('/instructor/login')}} />
          ) : profile ? (
            <div className="relative" ref={profileRef}>
              <button 
                className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors"
                onClick={toggleProfileDropdown}
              >
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-sm font-semibold">
                    {getUserInitials()}
                  </span>
                )}
              </button>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">
                      {profile.user.firstName && profile.user.lastName 
                        ? `${profile.user.firstName} ${profile.user.lastName}`
                        : profile.user.nickname || 'User'
                      }
                    </div>
                    <div className="text-xs text-gray-500 truncate">{profile.user.email}</div>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Log out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <PrimaryButton text={"Login"} onClick={() => {router.push('/instructor/login')}} />
          )}
        </div>

        {/* Mobile Menu Button - Hamburger */}
        <div className="lg:hidden flex items-center">
          <Hamburger label="Mobile Menu" distance="md" toggle={setIsDrawerOpen} toggled={isDrawerOpen} color="#FF7000" size={20} />
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeDrawer}
        ></div>
      )}

      {/* Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
        isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 font-bold text-lg">
            <Image
              src={carLogo}
              alt="Logo"
              width={24}
              height={16}
            />
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Menu Items */}
        <div className="flex-1 px-6 py-8">
          <nav className="space-y-6">
            <a 
              href="#" 
              className="block text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2"
              onClick={closeDrawer}
            >
              Home
            </a>
            <a 
              href="#" 
              className="block text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2"
              onClick={closeDrawer}
            >
              For Instructors
            </a>
            <a 
              href="#" 
              className="block text-lg font-medium text-gray-700 hover:text-primary transition-colors py-2"
              onClick={closeDrawer}
            >
              For Learners
            </a>
          </nav>
        </div>

        {/* Profile and Notification Section at Bottom */}
        <div className="border-t border-gray-200 p-6">
          {/* Notifications */}
          <div className="flex items-center space-x-3 mb-6">
            <Image 
              src={notifIcon} 
              alt="Notifications" 
              width={18} 
              height={18} 
              className="cursor-pointer hover:scale-110"
            />
            <span className="text-gray-700 font-medium cursor-pointer hover:text-primary">
              Notifications
            </span>
          </div>

          {/* Profile/Login Section */}
          {profileLoading ? (
            <div className="w-full">
              <PrimaryButton 
                text={"Login"} 
                onClick={() => {
                  router.push('/instructor/login');
                  closeDrawer();
                }} 
              />
            </div>
          ) : profile ? (
            <div className="relative">
              <div 
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                  {profile.profileImage ? (
                    <Image
                      src={profile.profileImage}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {getUserInitials()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {profile.user.firstName && profile.user.lastName 
                      ? `${profile.user.firstName} ${profile.user.lastName}`
                      : profile.user.nickname || 'Instructor'
                    }
                  </div>
                  <div className="text-sm text-gray-500">View profile</div>
                </div>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Mobile Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="mt-2 bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileDropdownOpen(false);
                      closeDrawer();
                    }}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsProfileDropdownOpen(false); // Close dropdown before logout
                      closeDrawer();
                      setTimeout(() => handleLogout(), 10); // Delay logout to allow dropdown to close
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full">
              <PrimaryButton 
                text={"Login"} 
                onClick={() => {
                  router.push('/instructor/login');
                  closeDrawer();
                }} 
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;