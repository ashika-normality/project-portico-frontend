import FooterMenuItems from "./FooterMenuItems";
import SocialMenuFooter from "./SocialMenuFooter";

//Importing Icons for Social Media
import facebookIcon from "../../public/Assets/fb-icon.svg";
import instaIcon from "../../public/Assets/insta-icon.svg";
import linkedinIcon from "../../public/Assets/linkedin-icon.svg";


const Footer = () => (
  <div className="bg-footerorange px-16 py-6 flex items-start justify-between">
    <FooterMenuItems
      title="Project Portico"
      items={[
        { name: "Your trusted platform for driving instruction in Australia.", url: "#" },
      ]}
    />
    <FooterMenuItems
      title="Quick Links"
      items={[
        { name: "About", url: "#" },
        { name: "Find Instructors", url: "#" },
        { name: "Become Instructor", url: "#" },
        { name: "Contact", url: "#" }
      ]}
    />
    <FooterMenuItems
      title="Legal"
      items={[
        { name: "Terms of Service", url: "#" },
        { name: "Privacy Policy", url: "#" },
        { name: "Cookie Policy", url: "#" },
      ]}
    />
    <SocialMenuFooter
      title="Follow Us"
      items={[
        { name: "Facebook", url: "#", icon: facebookIcon},
        { name: "LinkedIn", url: "#", icon: linkedinIcon },
        { name: "Instagram", url: "#", icon: instaIcon },
      ]}
    />
  </div>
);

export default Footer;