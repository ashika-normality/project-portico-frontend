'use client';

import Image from "next/image";
import { useAppContext } from "@/app/components/AppContext";
import carLogo from "../../public/Assets/car-icon.svg";
import notifIcon from "../../public/Assets/notif-icon.svg";

const TopBar = () => {
  const { profile, profileLoading } = useAppContext();

  // Helper function to get user initials
  const getUserInitials = () => {
    if (profile?.user.firstName && profile?.user.lastName) {
      return `${profile.user.firstName.charAt(0)}${profile.user.lastName.charAt(0)}`.toUpperCase();
    } else if (profile?.user.firstName) {
      const nameParts = profile.user.firstName.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return profile.user.name.charAt(0).toUpperCase();
    }
    return 'U'; // Default fallback
  };

  return (
    <div className="flex justify-between items-center bg-white outline-[1px] outline-greyforoutline px-4 md:px-16 py-4">
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
        
        <div className="flex items-center space-x-4 text-sm">
          <a href="#" className="hover:text-primary font-normal ml-4">Home</a>
          <a href="#" className="hover:text-primary font-normal">For Instructors</a>
          <a href="#" className="hover:text-primary font-normal">For Learners</a>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Image 
          src={notifIcon} 
          alt="Notifications" 
          width={15} 
          height={15} 
          className="cursor-pointer hover:scale-110"
        />
        
        {profileLoading ? (
          null
        ) : profile ? (
          <div className="flex items-center space-x-2">
            {/* Profile Avatar */}
            <button className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors group relative">
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
              
              {/* Tooltip on hover */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {profile.user.firstName && profile.user.lastName 
                  ? `${profile.user.firstName} ${profile.user.lastName}`
                  : profile.user.nickname || 'Instructor'
                }
              </div>
            </button>
          </div>
        ) : (
          <button className="bg-greyforoutline text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
            <span className="text-sm font-semibold">?</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;