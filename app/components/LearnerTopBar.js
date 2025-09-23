"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import defaultProfile from "../../public/Assets/default-profile2.png";
import carIcon from "../../public/Assets/car-icon.svg";
import notifIcon from "../../public/Assets/notif-icon.svg";

export default function LearnerTopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);

      // Get social profile image URL from localStorage
      const socialProfileUrl = localStorage.getItem("socialProfileImageUrl");
      console.log("=== Retrieved from localStorage ===", socialProfileUrl);
      
      if (socialProfileUrl && socialProfileUrl !== "null" && socialProfileUrl !== "") {
        setProfileImageUrl(socialProfileUrl);
        console.log("=== Setting profile image URL ===", socialProfileUrl);
      } else {
        setProfileImageUrl("");
        console.log("=== No social profile URL found, using default ===");
      }
    } else {
      setIsAuthenticated(false);
      setProfileImageUrl("");
    }

    setShowProfileDropdown(false);
    setShowNotifications(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("socialProfileImageUrl");
    router.push("/learner/login");
  };

  // Pages where right side must be hidden
  const hideRightSide = ["/learner/signup", "/learner/login", "/learner/otp"].includes(pathname);

  // Define leftLinks inside the component function but before return
  const leftLinks = ["/learner/signup", "/learner/login", "/learner/otp"].includes(pathname)
    ? [
        { name: "Home", href: "/" },
        { name: "For Learners", href: "/" },
        { name: "For Instructors", href: "/" },
      ]
    : [
        { name: "Dashboard", href: "#" },
        { name: "Find Instructors", href: "#" },
      ];

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <Image src={carIcon} alt="Car Icon" width={32} height={32} />
        <span className="font-bold text-xl text-primary">Project Portico</span>
        <nav className="hidden md:flex space-x-6">
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Side */}
      {!hideRightSide && isAuthenticated && (
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications((prev) => !prev);
                setShowProfileDropdown(false);
              }}
              className="focus:outline-none cursor-pointer"
            >
              <Image src={notifIcon} alt="Notifications" width={20} height={20} />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 text-sm">
                <p className="p-2 text-gray-500">No notifications</p>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown((prev) => !prev);
                setShowNotifications(false);
              }}
              className="focus:outline-none cursor-pointer ml-8"
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                  onError={(e) => {
                    console.error("Failed to load profile image:", profileImageUrl);
                    e.target.src = defaultProfile.src;
                  }}
                />
              ) : (
                <Image
                  src={defaultProfile}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-8 h-8"
                />
              )}
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}