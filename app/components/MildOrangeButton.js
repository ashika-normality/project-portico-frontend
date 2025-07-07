import Image from "next/image";
const MildOrangeButton = ({icon, altIcon, text}) => (
    <button className="w-full flex items-center justify-center bg-mildorange gap-2 p-2 rounded-md mt-1 hover:scale-95 hover:cursor-pointer transition-all duration-300 ease-in-out">
    {icon && (
        <Image
            src={icon}
            alt={altIcon}
            width={12}
            height={12}
        />
    )}
    <span className="text-sm font-raleway font-semibold">{text}</span>
</button>      
    );

export default MildOrangeButton;