import Image from "next/image";
import carLogo from "../../public/Assets/car-icon.svg";

const TopBar = () => (
  <div className="bg-white outline-[1px] outline-greyforoutline px-4 md:px-16 py-4 flex items-center space-x-6">
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
        <a href="#" className="hover:text-primary font-normal">For Students</a>
    </div>
  </div>
);

export default TopBar;