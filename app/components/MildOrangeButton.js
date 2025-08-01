import Image from "next/image";

 const bgColorMap = {
  tonedblack: "bg-tonedblack",
  primary: "bg-primary",
  primaryOverlay: "bg-primary-overlay",
  placeholder: "bg-placeholder",
  footerorange: "bg-footerorange",
  mildorange: "bg-mildorange",
  greyforoutline: "bg-greyforoutline",
  greyforline: "bg-greyforline",
  greyfortext: "bg-greyfortext",
  greydarker: "bg-greydarker",
};

 const textColorMap = {
  tonedblack: "text-tonedblack",
  primary: "text-primary",
  primaryOverlay: "text-primary-overlay",
  placeholder: "text-placeholder",
  footerorange: "text-footerorange",
  mildorange: "text-mildorange",
  greyforoutline: "text-greyforoutline",
  greyforline: "text-greyforline",
  greyfortext: "text-greyfortext",
  greydarker: "text-greydarker",
  white: "text-white",
};

const hoverColorMap = {
  tonedblack: "hover:bg-tonedblack",
  primary: "hover:bg-primary",
  primaryOverlay: "hover:bg-primary-overlay",
  placeholder: "hover:bg-placeholder",
  footerorange: "hover:bg-footerorange",
  mildorange: "hover:bg-mildorange",
  greyforoutline: "hover:bg-greyforoutline",
  greyforline: "hover:bg-greyforline",
  greyfortext: "hover:bg-greyfortext",
  greydarker: "hover:bg-greydarker",
}

const MildOrangeButton = ({
    icon,
    altIcon,
    border,
    text,
    textColor,
    bgColor,
    onClick,
    alignment,
    scale,
    hoverColor
}) => (
    <button
        className={`w-full scale-${scale} flex items-center justify-${alignment ? alignment : 'start'} ${bgColorMap[bgColor] || ''} gap-2 p-2 ${border ? `border-1 border-${border}` : ``} ${hoverColorMap[hoverColor] || ''} rounded-md mt-1 hover:bg- hover:cursor-pointer transition-all duration-300 ease-in-out`}
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
        <span className={`text-sm font-raleway ${textColorMap[textColor] || 'text-tonedblack'} font-semibold`}>{text}</span>
    </button>
);

export default MildOrangeButton;