import Image from "next/image";
const PrimaryButton = ({icon, altIcon, text, type, onClick}) => (
    <button
        type={type || "button"}
        className="w-full flex items-center justify-center gap-2 p-2 bg-primary text-white py-2 rounded-md hover:bg-primary-overlay hover:cursor-pointer transition-all duration-300 ease-in-out"
        onClick={onClick}
    >
        {icon && (
            <Image
                src={icon}
                alt={altIcon}
                width={12}
                height={12}
            />
        )}
        <span className="font-raleway font-bold">{text}</span>
    </button>  
    );

export default PrimaryButton;