import Image from "next/image";
const MildOrangeButton = ({icon, altIcon, border, text, textColor, bgColor, onClick, alignment}) => (
    <button 
        className={`w-full flex items-center justify-${alignment?alignment:'start'} bg-${bgColor} gap-2 p-2 ${border?`border-1 border-${border}`:``} rounded-md mt-1 hover:scale-95 hover:cursor-pointer transition-all duration-300 ease-in-out`}
        onClick={onClick}
        type="button"
    >
    {icon && (
        typeof icon === "string" ? (
            <Image
                src={icon}
                alt={altIcon}
                width={12}
                height={12}
            />
        ) : (typeof icon === "object" && icon.src ? (
            <Image
                src={icon}
                alt={altIcon}
                width={12}
                height={12}
            />
        ) : (
            icon
        ))
    )}
    <span className={`text-sm font-raleway text-${textColor?textColor:'tonedblack'} font-semibold`}>{text}</span>
</button>      
    );

export default MildOrangeButton;